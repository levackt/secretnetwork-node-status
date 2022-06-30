import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NodeCard from '../components/cards/node/NodeCard';
import { mainnetNodes, testnetNodes } from '../data/Nodes';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Secret Network Nodes</title>
        <meta
          name="description"
          content="Endpoint Status of Secret Network Nodes"
        />
        <link rel="icon" href="/secret-favicon.png" />
      </Head>

      <main className={styles.main}>
        <Link href="https://github.com/scrtlabs/api-registry">
          Please add your endpoints to Secret Network API Registry
        </Link>

        <h1 className={styles.title}>Secret Network Nodes</h1>

        <div>
          <h5 className={styles.environment}>Mainnet</h5>
        </div>

        <Grid container spacing={1} justifyContent="center">
          {mainnetNodes.map((item: any, index: any) => {
            return (
              <Grid key={index}>
                <NodeCard
                  name={item.name}
                  endpoints={item.endpoints}
                  chainId={item.chainId}
                  env="mainnet"
                  website={item.website}
                />
              </Grid>
            );
          })}
        </Grid>

        <div>
          <h5 className={styles.environment}>Testnet</h5>
        </div>
        <Grid container spacing={1} justifyContent="center">
          {testnetNodes.map((item: any, index: any) => {
            return (
              <Grid key={index}>
                <NodeCard
                  name={item.name}
                  endpoints={item.endpoints}
                  chainId={item.chainId}
                  env="testnet"
                  website={item.website}
                />
              </Grid>
            );
          })}
        </Grid>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://scrt.network/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image
              src="/Secret.svg"
              alt="Secret Logo"
              width={100}
              height={50}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
