import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as tf from '@tensorflow/tfjs';
import './ImageUpload.css';

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

    // Add document event listeners for drag and drop
    const handleDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        setImage(URL.createObjectURL(file));
        setHasImage(true);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', handleDragOver);

    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', handleDragOver);
    };
  }, []);

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

  return (
    <Container className="mt-6">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col><h2>Input Image</h2></Col>
          <Col><h2>Hasil</h2></Col>
        </Row>
        <hr />
        <Row className="align-items-center">
          <Col md={4}>
            <div className={`dropzone ${hasImage ? 'image-loaded' : ''}`}>
              <input type="file" onChange={handleFileChange} />
              {!hasImage && (
                <div className="file-input-group">
                  <p>Drag & drop an image anywhere on the page, or click to select one</p>
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
          <Col md={4} className="text-center">
            <Button variant="primary" type="submit">
              Prediksi
            </Button>
          </Col>
          <Col md={4} className="text-center">
            {result !== null && (
              <div>
                <h4>Model Predictions:</h4>
                <p>{result < 0.5 ? 'Tumor Terdeteksi' : 'Tidak Ada Tumor'}</p>
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ImageUpload;
