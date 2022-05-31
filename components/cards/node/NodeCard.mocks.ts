import { INodeCard } from './NodeCard';

const base: INodeCard = {
  name: '',
  rpcEndpoint: '',
  chainId: '',
  website: 'acme.com',
  websiteURL: 'https://acme.com',
};

export const mockNodeCardProps = {
  base,
};
