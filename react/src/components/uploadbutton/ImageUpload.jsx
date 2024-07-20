import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as tf from '@tensorflow/tfjs';
import './ImageUpload.css';
import CloseButton from 'react-bootstrap/CloseButton';
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(null);

  // Load model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('./irismodel-tfjs/model.json');
        setModel(loadedModel);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  const onDrop = (acceptedFiles) => {
    setImage(URL.createObjectURL(acceptedFiles[0]));
    setHasImage(true);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
    setHasImage(true);
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setHasImage(false);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!model || !image) {
      console.error('Model or image not available');
      return;
    }

    // Load image and preprocess it
    const img = new Image();
    img.src = image;
    img.onload = async () => {
      try {
        // Convert image to tensor
        const tensor = tf.browser.fromPixels(img).toFloat();
        const resized = tf.image.resizeBilinear(tensor, [224, 224]); // Resize to expected size
        const normalized = resized.div(255.0); // Normalize to [0, 1] range
        const batched = normalized.expandDims(0); // Add batch dimension

        // Get predictions
        const predictions = await model.predict(batched).data();
        console.log('Predictions:', predictions);
        setResult(predictions[0]);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    };
    img.onerror = (error) => {
      console.error('Error loading image:', error);
    };
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col md={6}>
            <div 
              {...getRootProps()} 
              className={`dropzone ${hasImage ? 'image-loaded' : ''}`}
            >
              <input {...getInputProps()} />
              {!hasImage && (
                <div className="file-input-group">
                  <p>Drag & drop an image here, or click to select one</p>
                  <Form.Group controlId="formFile">
                    <Form.Label>Choose file</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                  </Form.Group>
                </div>
              )}
              {image && (
                <div className="image-preview">
                  <img src={image} alt="Preview" />
                  <button className="remove-button" onClick={handleRemoveImage}>×</button>
                  
                </div>
              )}
            </div>
          </Col>
          <Col md={6} className="text-right">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
        {result && (
          <Row className="mt-3">
            <Col>
              <h4>Model Predictions:</h4>
              <p>{result < 0.5 ? 'Tumor Terdeteksi' : 'Tidak Ada Tumor'}</p>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </Col>
          </Row>
          
        )}
      </Form>
    </Container>
  );
};

export default ImageUpload;
