export interface attributeInterface {
  name: string;
  type: 'number' | 'boolean' | 'enum' | 'string';
  enums?: string[]; // valid when type === 'enum'
}

export interface mintParam {
  nftAddress: string;
  attributes: {
    [name: string]: string | number;
  };
}

export interface getNFTSetResult {
  [address: string]: Object; // address->attributes
}

export interface getAttributesResult {
  attributes: attributeInterface[];
}

// common interfaces

export interface Action {
  input: Input;
  caller: string;
}

export interface Input {
  function: Function;
  params: Params;
}

export interface State {
  owner: string;
  name: string;
  description: string;
  nftSet: {
    [address: string]: {
      [name: string]: string | number;
    }; // address->attributes
  };
  attributes: attributeInterface[];
}

export type Function = 'getNFTSet' | 'mint' | 'getAttributes';

export type Params = mintParam;

export type Result = getNFTSetResult | getAttributesResult;
    
export type ContractResult = { state: State } | { result: Result };
