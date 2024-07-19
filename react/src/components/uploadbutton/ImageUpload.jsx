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
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col md={6}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Col>
          <Col md={6} className="text-right">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
        {image && (
          <Row className="mt-3">
            <Col>
              <img src={image} alt="Preview" style={{ width: '100%' }} />
            </Col>
          </Row>
        )}
      </Form>
    </Container>
  );
}

export default ImageUpload;
