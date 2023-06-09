import * as type from '../../types/types';

export const getNFTSet = async (
  state: type.State,
  action: type.Action,
): Promise<type.ContractResult> => {
  const result: type.getNFTSetResult = state.nftSet;

  return { result };
};
