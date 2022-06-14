// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const { mainnetNodes, testnetNodes } = require('../../data/Nodes');

type ResponseData = {
  nodes: [
    {
      name: boolean;
      price: string;
      chainId: string;
      website?: string;
      endpoints: [
        {
          type: string;
          url: string;
        }
      ];
    }
  ];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    query: { env },
  } = req;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=119'
  );

  let nodes;

  if (env === 'mainnet') {
    nodes = mainnetNodes;
  } else if (env === 'testnet') {
    nodes = testnetNodes;
  } else {
    res.status(400).end('Invalid env, only mainnet and testnet supported');
    return;
  }

  res.status(200).json({ nodes: nodes });
}
