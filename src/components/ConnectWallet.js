import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';

const ConnectWallet = ({ onWalletCreated }) => {
  const [walletId, setWalletId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = () => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicHJvamVjdElkIjoiMzhhNGUyZTUtZTcxZS00YTc5LThkNWMtNmFiZGVlMDljNzQ5Iiwic2NvcGVzIjpbIlJFQURfV0FMTEVUUyIsIlJFQURfQ09OVFJBQ1RTIiwiUkVBRF9UT0tFTl9UWVBFUyIsIlJFQURfVFJBTlNBQ1RJT05TIiwiREVQTE9ZX0NPTlRSQUNUUyIsIldSSVRFX0NPTlRSQUNUUyIsIldSSVRFX0NVU1RPTV9UUkFOU0FDVElPTlMiLCJXUklURV9NSU5UUyIsIldSSVRFX01JTlRTIiwiV1JJVEVfVE9LRU5fVFlQRVMiLCJXUklURV9UUkFOU0ZFUlMiLCJXUklURV9XQUxMRVRTIiwiU0lHTl9NRVNTQUdFIl0sImlhdCI6MTcxOTc2MDEzNn0.uQ33GZ0QSkz5lYpY5-SOx_qgem6TbmXBqn0Z276KT1Jyr3MjeOfmQrNaDRVXBkHIKrIdW-6kUnpFuUET5uXxCsN9cvgAorRCcmGx3BQmOfLjOlchWr-x05XWPfWSltiTFlJ5sGAK8IqA7vHGWUap9E0MIeBjRnbtNwvUfLhhdKTRdMbePKIWQgkiDwYO64YShzw01fiqfmGMB6EoLXbtP5JZX98at94wzYE44Hk4mmEfuAmJfSbmGbkiceIPUWkedieKNi89f33Faj8RqAH202KrHBTh7ouYZk-3FW9vuF_qsnxC_XvGGYwYc9MwUo82hzlZX-n-iLt5ptBI_ANXvBsVA5sDz_8RX8Ee7A1gJPhc8BcSrNS9aM2GlvojM-Ze9O92j_cgmh0LR6MF2ffiqZhEF3iIbEfTH7HRu01o370pvmlc8Gn9wd2Bih6Cr0mzeN1maifJyh7hskSW4wBRH3Tc2KT-uz7kc-YM2xHovep8XfDcjJu_me1kP_zWYOcG_ODr3nPHjtEr-bvKCYeIHeVDHLAnHkbQI-IQdrK5DfOET-j_ThKjivfs_g69ijg_4OTaAQfuD4FHdMX7cJqiK32jWBbaAxi6ZeGcH2LiaupNlLXakAhW1NFn1_ZJ6uzk3RYJyjpGYQ7CUMY-OEpF9AVwEWew4c9P_MxWQhBAhQ8',
      },
    };

    axios('https://protocol-sandbox.lumx.io/v2/wallets', options)
      .then(response => {
        setWalletId(response.data.id);
        onWalletCreated(response.data.id);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.response ? err.response.data : 'Unknown error');
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6" className="text-center">
          <h3>Conectar Carteira</h3>
          <Button
            variant="primary"
            onClick={connectWallet}
            disabled={loading}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            {loading ? 'Conectando...' : 'Conectar Carteira'}
          </Button>
          {walletId && <p>Carteira ID: {walletId}</p>}
          {error && <p className="text-danger">Error: {error}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ConnectWallet;
