import React, { useState } from 'react';
// Importar o Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ConnectWallet from './components/ConnectWallet';
import CreateToken from './components/CreateToken';
import SetSupply from './components/SetSupply';
import DeployToken from './components/DeployToken';
import MintToken from './components/MintToken';

const App = () => {
  const [walletId, setWalletId] = useState(null);
  const [tokenId, setTokenId] = useState(null);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8" className="text-center">
          <h1 className="my-4">Aplicação de Carteira e Tokens</h1>
          <ConnectWallet onWalletCreated={setWalletId} />
          <CreateToken walletId={walletId} onTokenCreated={setTokenId} />
          <SetSupply tokenId={tokenId} />
          <DeployToken tokenId={tokenId} />
          <MintToken walletId={walletId} tokenId={tokenId} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
