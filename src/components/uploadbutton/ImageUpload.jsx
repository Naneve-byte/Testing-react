import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Button, Form, Card, ProgressBar, OverlayTrigger, Tooltip, Spinner,
} from 'react-bootstrap';

import * as tf from '@tensorflow/tfjs';
import './ImageUpload.css';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [result, setResult] = useState(null);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load model on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/tfjs_modelvgg16/model.json');
        setModel(loadedModel);
        setLoading(false);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
        setLoading(false);
      }
    };
    loadModel();

    // Add document event listeners for drag and drop
    const handleDrop = (e) => {
      e.preventDefault();
      const { files } = e.dataTransfer;
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
    <Container className="mt-4">
      <h1 className="text-center mb-2">Image Upload and Prediction</h1>
      <p className="text-center mb-4">Upload an image to get predictions from the model.</p>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" className="mb-3" />
          <p>Loading model...</p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="form-container p-4">
          <Row className="">
            <Col className="text-center">
              <OverlayTrigger overlay={<Tooltip id="tooltip-predict">Click to predict</Tooltip>}>
                <Button className="btn-three btn-lg" type="submit" disabled={!image}>
                  Predict
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
          <Row className="align-items-center">
            {/* Input Image Section */}
            <Col md={6} className="text-center">
              <h2>Input Image</h2>
              <div className={`dropzone ${hasImage ? 'image-loaded' : ''} mt-3`}>
                <input type="file" aria-label="Large" onChange={handleFileChange} />
                {!hasImage && (
                  <div className="file-input-group mt-3">
                    <p>Drag & drop an image or click to select one</p>
                  </div>
                )}
                {image && (
                  <div className="image-preview mt-3 position-relative">
                    <img src={image} alt="Preview" className="img-thumbnail" />
                    <button type="button" className="remove-button btn btn-danger btn-sm position-absolute" onClick={handleRemoveImage} style={{ top: '10px', right: '10px' }}>×</button>
                  </div>
                )}
              </div>
            </Col>

            {/* Result Section */}
            <Col md={6} className="d-flex justify-content-center align-items-center custom-container">
              <Card className="p-5 shadow-lg custom-card">
                <h2 className="text-center">Result</h2>
                {result !== null ? (
                  <div className="result-container mt-4">
                    <h4>Model Predictions:</h4>
                    <p className={`prediction-text ${result < 0.5 ? 'text-danger' : 'text-success'}`}>
                      {result < 0.5 ? 'Tumor Detected' : 'No Tumor Detected'}
                    </p>
                  </div>
                ) : (
                  <p className="mt-4 text-center">No results yet</p>
                )}
              </Card>
            </Col>

          </Row>

        </Form>
      )}
    </Container>
  );
}

export default ImageUpload;
