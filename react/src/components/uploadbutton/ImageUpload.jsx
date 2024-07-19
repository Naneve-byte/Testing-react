import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './ImageUpload.css';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    // Replace with your actual prediction logic
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setPrediction(result.prediction);
    } catch (error) {
      console.error('Error during prediction:', error);
      setPrediction("Error occurred during prediction.");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="custom-upload">
              <Form.Label htmlFor="upload-button">Upload Image</Form.Label>
              <Form.Control
                id="upload-button"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
            {imagePreviewUrl && (
              <div className="image-preview">
                <img src={imagePreviewUrl} alt="Image Preview" />
              </div>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          {prediction && (
            <div className="prediction-result">
              <h3>Prediction Result:</h3>
              <p>{prediction}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ImageUpload;
