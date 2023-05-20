import fs from 'fs';
import path from 'path';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { getTag } from 'warp-contract-utils';
import { LoggerFactory, Warp, WarpFactory, SMART_WEAVE_TAGS, WARP_TAGS } from 'warp-contracts';
import { AtomicAssetState, AtomicAssetContract } from "atomic-asset-js-bindings";
import { connectAtomicAsset, deployAtomicAsset as rustDeploy } from '../rust-impl';
import { deployAtomicAsset as tsDeploy } from '../ts-impl';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

const deployAtomicAsset = async (warp, initialState, ownerWallet, data) => {
  return await tsDeploy(warp, initialState, ownerWallet, data);
};

(async ()=>{
  let ownerWallet: JWKInterface;
  let owner: string;

  let initialState: AtomicAssetState;

  let warp: Warp;

  let contractTxId: string;

  warp = WarpFactory.forLocal(1984).use(new DeployPlugin());

  ({ jwk: ownerWallet, address: owner } = await warp.generateWallet());

  initialState = {
    description: 'This is the test of Atomic Asset token',
    symbol: 'atomic-asset-test',
    name: 'Sample Atomic Asset token',
    decimals: 2,
    totalSupply: 100,
    balances: {
      [owner]: 100,
    },
    allowances: {},
    owner: owner,
  };

  let deployedContract = await deployAtomicAsset(warp, initialState, ownerWallet, { "Content-Type": "text/html", "body": "<h1>Hello</h1>" });
  contractTxId = deployedContract[1].contractTxId;
  console.log('Deployed contract: ', deployedContract);
  console.log('wallet address: ', owner);
  fs.writeFileSync(path.join(__dirname, 'key-file-for-test.json'), JSON.stringify(ownerWallet));
  fs.writeFileSync(path.join(__dirname, 'contract-tx-id-for-test.json'), JSON.stringify(deployedContract[1]));
})();
