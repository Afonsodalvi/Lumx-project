import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const MintToken = ({ walletId: initialWalletId, tokenId: initialTokenId }) => {
  const [walletId, setWalletId] = useState(initialWalletId);
  const [quantity, setQuantity] = useState(1);
  const [uriNumber, setUriNumber] = useState(0);
  const [contractId, setContractId] = useState(initialTokenId);
  const [mintResponse, setMintResponse] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiMzhhNGUyZTUtZTcxZS00YTc5LThkNWMtNmFiZGVlMDljNzQ5Iiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcxOTc2MDEzNn0.uQ33GZ0QSkz5lYpY5-SOx_qgem6TbmXBqn0Z276KT1Jyr3MjeOfmQrNaDRVXBkHIKrIdW-6kUnpFuUET5uXxCsN9cvgAorRCcmGx3BQmOfLjOlchWr-x05XWPfWSltiTFlJ5sGAK8IqA7vHGWUap9E0MIeBjRnbtNwvUfLhhdKTRdMbePKIWQgkiDwYO64YShzw01fiqfmGMB6EoLXbtP5JZX98at94wzYE44Hk4mmEfuAmJfSbmGbkiceIPUWkedieKNi89f33Faj8RqAH202KrHBTh7ouYZk-3FW9vuF_qsnxC_XvGGYwYc9MwUo82hzlZX-n-iLt5ptBI_ANXvBsVA5sDz_8RX8Ee7A1gJPhc8BcSrNS9aM2GlvojM-Ze9O92j_cgmh0LR6MF2ffiqZhEF3iIbEfTH7HRu01o370pvmlc8Gn9wd2Bih6Cr0mzeN1maifJyh7hskSW4wBRH3Tc2KT-uz7kc-YM2xHovep8XfDcjJu_me1kP_zWYOcG_ODr3nPHjtEr-bvKCYeIHeVDHLAnHkbQI-IQdrK5DfOET-j_ThKjivfs_g69ijg_4OTaAQfuD4FHdMX7cJqiK32jWBbaAxi6ZeGcH2LiaupNlLXakAhW1NFn1_ZJ6uzk3RYJyjpGYQ7CUMY-OEpF9AVwEWew4c9P_MxWQhBAhQ8';

  const mintToken = async () => {
    setLoading(true);
    setError(null);
    setMintResponse(null);
    setTransactionId(null);
    setTransactionHash(null);

    if (quantity <= 0 || isNaN(quantity)) {
      setError('Quantity must be a positive number.');
      setLoading(false);
      return;
    }
    if (isNaN(uriNumber)) {
      setError('URI Number must be a valid number.');
      setLoading(false);
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        walletId,
        quantity,
        uriNumber,
        contractId,
      }),
    };

    try {
      const response = await axios('https://protocol-sandbox.lumx.io/v2/transactions/mints', options);
      const result = response.data;
      setTransactionId(result.id);

      const pollInterval = setInterval(async () => {
        try {
          const pollResponse = await axios(`https://protocol-sandbox.lumx.io/v2/transactions/${result.id}`, {
            headers: {
              Authorization: API_KEY,
              'Content-Type': 'application/json',
            },
          });
          const pollResult = pollResponse.data;
          if (pollResult && pollResult.transactionHash) {
            setTransactionHash(pollResult.transactionHash);
            setMintResponse(pollResult);
            clearInterval(pollInterval);
            setLoading(false);
          }
        } catch (pollError) {
          console.error(pollError);
          setError(pollError.response ? JSON.stringify(pollError.response.data) : 'Unknown error');
          clearInterval(pollInterval);
          setLoading(false);
        }
      }, 5000); // Poll every 5 seconds
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
          <h3 className="text-center">Mint Token</h3>
          <Form>
            <Form.Group controlId="formWalletId">
              <Form.Label>Wallet ID</Form.Label>
              <Form.Control
                type="text"
                value={walletId}
                onChange={e => setWalletId(e.target.value)}
                placeholder="Insira o Wallet ID"
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value, 10))}
                placeholder="Insira a Quantidade"
              />
            </Form.Group>
            <Form.Group controlId="formUriNumber">
              <Form.Label>URI Number</Form.Label>
              <Form.Control
                type="number"
                value={uriNumber}
                onChange={e => setUriNumber(parseInt(e.target.value, 10))}
                placeholder="Insira o URI Number"
              />
            </Form.Group>
            <Form.Group controlId="formContractId">
              <Form.Label>Contract ID</Form.Label>
              <Form.Control
                type="text"
                value={contractId}
                onChange={e => setContractId(e.target.value)}
                placeholder="Insira o Contract ID"
              />
            </Form.Group>
            <Button variant="primary" onClick={mintToken} disabled={!walletId || !contractId || loading}>
              {loading ? 'Minting...' : 'Mint Token'}
            </Button>
            {transactionId && <p className="mt-3">Transaction ID: {transactionId}</p>}
            {transactionHash && <p className="mt-3">Transaction Hash: {transactionHash}</p>}
            {mintResponse && <p className="mt-3">Mint Response: {JSON.stringify(mintResponse)}</p>}
            {error && <p className="mt-3 text-danger">Error: {error}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MintToken;
