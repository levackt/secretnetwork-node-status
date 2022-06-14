// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { NodeStatus, NodeType } from '../../components/cards/node/NodeStatus';
const { mainnetNodes, testnetNodes } = require('../../data/Nodes');

type ResponseData = {
  endpointStatus?: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let {
    query: { chainId, name, endpointType, env },
  } = req;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=59'
  );

  console.log(
    `node_status handler chainId=${chainId}, name=${name}, endpointType=${endpointType}, env=${env}`
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

  let type;
  if (endpointType === undefined) {
    res.status(400).end('endpointType expected');
    return;
  } else {
    switch (endpointType) {
      case 'RPC':
        type = NodeType.RPC;
        break;
      case 'LCD':
        type = NodeType.LCD;
        break;
      case 'GRPC_WEB':
        type = NodeType.GRPC_WEB;
        break;
      default:
        res.status(400).end(`Unsupported endpoint type=${endpointType}`);
        return;
    }
  }

  let node;
  let nodeEndpointUrl;
  for (var i in nodes) {
    node = nodes[i];
    const nodeChainId = node.chainId;
    const nodeName = node.name;

    if (nodeChainId === chainId && nodeName === name) {
      for (var j in node.endpoints) {
        const endpoint = node.endpoints[j];
        if (endpoint.type === endpointType) {
          nodeEndpointUrl = endpoint.url;
          break;
        }
      }
    }
  }

  if (nodeEndpointUrl === undefined) {
    res
      .status(400)
      .end(
        `endpoint not defined for env=${env}, name=${name}, chainId=${chainId}, endpointType=${endpointType}`
      );
    return;
  }

  const nodeStatus = new NodeStatus(nodeEndpointUrl, type, chainId);
  const status = await nodeStatus.checkStatus();
  console.log(
    `node_status result name=${name}, chainId=${chainId}, node_status=${status}, \n url=${nodeEndpointUrl}`
  );

  res.status(200).json({ endpointStatus: status });
}
