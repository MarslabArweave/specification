import fs from 'fs';
import path from 'path';
import { addFunds } from '../utils/_helpers';
import {
  WarpFactory,
  LoggerFactory,
} from 'warp-contracts';

const warp = WarpFactory.forLocal(1984);
const arweave = warp.arweave;
LoggerFactory.INST.logLevel('error');

(async () => {
  console.log('running...');

  const walletJwk = await arweave.wallets.generate();
  await addFunds(arweave, walletJwk);
  const walletAddress = await arweave.wallets.jwkToAddress(walletJwk);
  
  // deploy collection contract
  const contractSrc = fs.readFileSync(path.join(__dirname, '../dist/contract.js'), 'utf8');
  const initFromFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../dist/initial-state.json'), 'utf8')
  );
  const contractInit = {
    ...initFromFile,
    owner: walletAddress,
  };

  const contractTxId = (await warp.createContract.deploy({
    wallet: walletJwk,
    initState: JSON.stringify(contractInit),
    src: contractSrc,
  }));
  
  console.log('wallet address: ', walletAddress);
  console.log('collection txid: ', contractTxId.contractTxId);
  console.log('collection srcID: ', contractTxId.srcTxId);
  fs.writeFileSync(path.join(__dirname, 'key-file-for-test.json'), JSON.stringify(walletJwk));
  fs.writeFileSync(path.join(__dirname, 'collection-txid-for-test.json'), JSON.stringify(contractTxId));
})();
