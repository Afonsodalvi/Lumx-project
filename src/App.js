import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import CreateToken from './components/CreateToken';
import SetSupply from './components/SetSupply';
import DeployToken from './components/DeployToken';
import MintToken from './components/MintToken';

const App = () => {
  const [walletId, setWalletId] = useState(null);
  const [tokenId, setTokenId] = useState(null);

  return (
    <div>
      <h1>Aplicação de Carteira e Tokens</h1>
      <ConnectWallet onWalletCreated={setWalletId} />
      <CreateToken walletId={walletId} onTokenCreated={setTokenId} />
      <SetSupply tokenId={tokenId} />
      <DeployToken tokenId={tokenId} />
      <MintToken walletId={walletId} tokenId={tokenId} />
    </div>
  );
};

export default App;
