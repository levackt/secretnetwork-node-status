const data = require('./nodes.json');
export interface IEndpoint {
  type: string;
  url: string;
  status?: boolean;
}
export interface Node {
  name: string;
  chainId: string;
  authentication?: string | null;
  archive?: boolean;
  price?: string;
  secret?: boolean;
  website: string;
  websiteURL?: string;
  endpoints: IEndpoint[];
  env: string;
}

export const mainnetNodes: Node[] = data['mainnet'];
export const testnetNodes: Node[] = data['testnet'];

module.exports = { mainnetNodes, testnetNodes };
