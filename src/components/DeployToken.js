import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

const DeployToken = ({ tokenId }) => {
  const [loading, setLoading] = useState(false);
  const [responseId, setResponseId] = useState(null);
  const [responseAddress, setResponseAddress] = useState(null);
  const [inputId, setInputId] = useState('');
  const [error, setError] = useState(null);

  const API_KEY = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiMzhhNGUyZTUtZTcxZS00YTc5LThkNWMtNmFiZGVlMDljNzQ5Iiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcxOTc2MDEzNn0.uQ33GZ0QSkz5lYpY5-SOx_qgem6TbmXBqn0Z276KT1Jyr3MjeOfmQrNaDRVXBkHIKrIdW-6kUnpFuUET5uXxCsN9cvgAorRCcmGx3BQmOfLjOlchWr-x05XWPfWSltiTFlJ5sGAK8IqA7vHGWUap9E0MIeBjRnbtNwvUfLhhdKTRdMbePKIWQgkiDwYO64YShzw01fiqfmGMB6EoLXbtP5JZX98at94wzYE44Hk4mmEfuAmJfSbmGbkiceIPUWkedieKNi89f33Faj8RqAH202KrHBTh7ouYZk-3FW9vuF_qsnxC_XvGGYwYc9MwUo82hzlZX-n-iLt5ptBI_ANXvBsVA5sDz_8RX8Ee7A1gJPhc8BcSrNS9aM2GlvojM-Ze9O92j_cgmh0LR6MF2ffiqZhEF3iIbEfTH7HRu01o370pvmlc8Gn9wd2Bih6Cr0mzeN1maifJyh7hskSW4wBRH3Tc2KT-uz7kc-YM2xHovep8XfDcjJu_me1kP_zWYOcG_ODr3nPHjtEr-bvKCYeIHeVDHLAnHkbQI-IQdrK5DfOET-j_ThKjivfs_g69ijg_4OTaAQfuD4FHdMX7cJqiK32jWBbaAxi6ZeGcH2LiaupNlLXakAhW1NFn1_ZJ6uzk3RYJyjpGYQ7CUMY-OEpF9AVwEWew4c9P_MxWQhBAhQ8';

  const deployToken = async () => {
    setLoading(true);
    setError(null);
    setResponseId(null);
    setResponseAddress(null);

    const options = {
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({}),
    };

    try {
      await axios(`https://protocol-sandbox.lumx.io/v2/contracts/${tokenId}/deploy`, options);

      const pollInterval = setInterval(async () => {
        try {
          const pollResponse = await axios(`https://protocol-sandbox.lumx.io/v2/contracts/${tokenId}`, {
            headers: {
              Authorization: API_KEY,
              'Content-Type': 'application/json',
            },
          });
          const pollResult = pollResponse.data;
          if (pollResult && pollResult.id && pollResult.address) {
            setResponseId(pollResult.id);
            setResponseAddress(pollResult.address);
            clearInterval(pollInterval);
            setLoading(false);
          }
        } catch (pollError) {
          console.error(pollError);
          setError(pollError.response ? JSON.stringify(pollError.response.data) : 'Unknown error');
          clearInterval(pollInterval);
          setLoading(false);
        }
      }, 5000);
    } catch (error) {
      console.error(error);
      setError(error.response ? JSON.stringify(error.response.data) : 'Unknown error');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h3 className="text-center">Deploy Token</h3>
          <Form>
            <Form.Group controlId="formInputId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                value={inputId}
                onChange={e => setInputId(e.target.value)}
                placeholder="Insira a string de ID"
              />
            </Form.Group>
            <Button variant="primary" onClick={deployToken} disabled={!tokenId || loading || !inputId}>
              {loading ? 'Deploying...' : 'Deploy Token'}
            </Button>
            {responseId && <p className="mt-3">ID: {responseId}</p>}
            {responseAddress && <p className="mt-3">Address: {responseAddress}</p>}
            {error && <p className="mt-3 text-danger">Error: {error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default DeployToken;
