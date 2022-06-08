const data = require('./nodes.json');

export interface Node {
  name: string;
  rpcEndpoint: string | null;
  lcdEndpoint?: string | null;
  grpcEndpoint?: string | null;
  wsEndpoint?: string | null;
  chainId: string;
  authentication?: string | null;
  archive?: boolean;
  price?: string;
  secret?: boolean;
  website: string;
  websiteURL?: string;
  rpcStatus: boolean;
  lcdStatus?: boolean;
  grpcStatus?: boolean;
  wsStatus?: boolean;
}

export const mainnetNodes: Node[] = data['mainnet'];
export const testnetNodes: Node[] = data['testnet'];

module.exports = { mainnetNodes, testnetNodes };
