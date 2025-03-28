import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { FaSpinner, FaCopy, FaLink } from 'react-icons/fa';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortened, setShortened] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return setError('Please enter a valid URL');
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://apis.davidcyriltech.my.id/tinyurl?url=${encodeURIComponent(url)}`
      );
      setShortened(response.data);
      setError('');
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortened?.shortened_url);
  };

  return (
    <div className="gradient-bg">
      <Container className="glass-container fade-in">
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <div className="logo-glow">
              <FaLink className="logo-spin" />
            </div>
            <h1 className="neon-text mt-3">SwiftLink</h1>
            <p className="quote-text">"Shorten your links, expand your reach"</p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="url"
                  placeholder="Enter URL to shorten"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="glowing-input"
                />
              </Form.Group>
              
              <div className="text-center mt-4">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                  className="gradient-btn"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="spin" /> Shortening...
                    </>
                  ) : (
                    'Make it Swift!'
                  )}
                </Button>
              </div>
            </Form>

            {error && <Alert variant="danger" className="shake mt-3">{error}</Alert>}

            {shortened && (
              <div className="result-box fade-in mt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="original-url">{shortened.original_url}</p>
                    <a 
                      href={shortened.shortened_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="shortened-url"
                    >
                      {shortened.shortened_url}
                    </a>
                  </div>
                  <Button 
                    variant="outline-light" 
                    onClick={copyToClipboard}
                    className="copy-btn"
                  >
                    <FaCopy />
                  </Button>
                </div>
                <p className="creator-text mt-2">Powered by {shortened.creator}</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
