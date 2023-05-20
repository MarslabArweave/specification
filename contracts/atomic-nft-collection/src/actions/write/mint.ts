import * as type from '../../types/types';
import { contractAssert, isAddress } from '../common';

export const mint = async (
  state: type.State,
  action: type.Action,
): Promise<type.ContractResult> => {
  const param: type.mintParam = <type.mintParam>action.input.params;
  const nftAddress: string = param.nftAddress;
  const attributes = param.attributes;

  contractAssert(
    action.caller === state.owner,
    'Permission denied!'
  );
  
  contractAssert(
    isAddress(nftAddress),
    'nftAddress is not valid!'
  );

  // add nft address to collection
  for (const name in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, name)) {
      const value = attributes[name];
      contractAssert(
        (typeof(value) === 'string' && value.length < 32) || typeof(value) === 'number' || typeof(value) === 'boolean',
        'attribute value is invalid!'
      );
    }
  }
  state.nftSet[nftAddress] = attributes;

  return { state };
};
