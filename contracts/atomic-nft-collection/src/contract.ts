import { getAttributes } from './actions/read/getAttributes';
import { getNFTSet } from './actions/read/getNFTSet';
import { mint } from './actions/write/mint';
import * as type from './types/types';

declare const ContractError;

export async function handle(state: type.State, action: type.Action): Promise<type.ContractResult> {
  const func = action.input.function;

  switch (func) {
    case 'getNFTSet':
      return await getNFTSet(state, action);
    case 'getAttributes':
      return await getAttributes(state, action);
    case 'mint':
      return await mint(state, action);
    default:
      throw new ContractError(`No function supplied or function not recognised: "${func}"`);
  }
}
