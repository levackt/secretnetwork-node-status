import 'isomorphic-fetch';
import { SecretNetworkClient } from 'secretjs';

export enum NodeType {
  LCD = 'lcd',
  RPC = 'rpc',
  GRPC = 'grpc',
  GRPC_WEB = 'grpc_web',
  WS = 'ws',
}

export class NodeStatus {
  endpoint: string;
  type: NodeType;
  chainId: string;

  constructor(endpoint: string, type: NodeType, chainId: any) {
    this.endpoint = endpoint;
    this.type = type;
    this.chainId = chainId;
  }

  logTiming(start: number, endpoint: string) {
    const time = Date.now() - start;
    if (time > 1000) {
      console.log(`${endpoint} completed in ${time / 1000}s`);
    }
  }

  async checkRpcStatus(): Promise<boolean> {
    const start = Date.now();
    const headers: any = { 'Content-Type': 'application/json' };
    let status = false;
    try {
      const result = await fetch(this.endpoint + 'status', {
        method: 'GET',
        headers,
      });
      if (result.status !== 200) {
        console.log(this.endpoint, 'failed');
        console.log(await result.text());
        return status;
      }
      const json = await result.json();

      this.logTiming(start, this.endpoint);
      status = !!json.result;
    } catch (e: any) {
      console.warn(e.message || e);

      this.logTiming(start, this.endpoint);
      return status;
    }

    console.log(`checkRpcStatus endpoint=${this.endpoint}, status=${status}`);
    return status;
  }

  async checkLcdStatus(): Promise<boolean> {
    const start = Date.now();
    const headers: any = { 'Content-Type': 'application/json' };
    let status = false;
    try {
      const result = await fetch(this.endpoint + 'syncing', {
        method: 'GET',
        headers,
      });
      if (result.status !== 200) {
        console.log(this.endpoint, 'failed');
        console.log(await result.text());
        return status;
      }
      const json = await result.json();

      this.logTiming(start, this.endpoint);
      status = json['syncing'] === false;
    } catch (e: any) {
      console.warn(e.message || e);

      this.logTiming(start, this.endpoint);
      return status;
    }
    return status;
  }

  async checkGrcpWebStatus(): Promise<boolean> {
    if (this.chainId === undefined) {
      throw new Error('chainId required for gRPC web endpoint');
    }
    console.log(`checking grpc web status with url ${this.endpoint}`);

    let status = false;
    const start = Date.now();
    try {
      const secretjs = await SecretNetworkClient.create({
        chainId: this.chainId,
        grpcWebUrl: this.endpoint,
      });

      const result = await secretjs.query.tendermint.getSyncing({});
      this.logTiming(start, this.endpoint);
      status = result['syncing'] === false;
    } catch (e: any) {
      console.warn(e.message || e);

      this.logTiming(start, this.endpoint);
      return status;
    }
    console.log(`checkGrpcStatus endpoint=${this.endpoint}, status=${status}`);
    return status;
  }

  async checkStatus(): Promise<boolean> {
    let status = false;

    switch (this.type) {
      case NodeType.LCD:
        status = await this.checkLcdStatus();
        break;

      case NodeType.RPC:
        status = await this.checkRpcStatus();
        break;

      case NodeType.GRPC_WEB:
        status = await this.checkGrcpWebStatus();
        break;

      case NodeType.GRPC:
        throw new Error('grpc unsupported');

      case NodeType.WS:
        throw new Error('web socket unsupported');
    }

    return status;
  }
}
