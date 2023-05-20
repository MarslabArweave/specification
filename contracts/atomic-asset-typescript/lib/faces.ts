export interface AtomicAssetState {
    name?: string;
    description?: string;
    owner?: string;
    logo?: string; // transaction id. for atomic token only
    collection?: string; //transaction id. for atomic nft only
    symbol: string;
    decimals: number;
    totalSupply: number;
    balances: Record<string, number>;
    allowances: Record<string, Record<string, number>>;
}

export type WriteResult = {
    state: AtomicAssetState
};
