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
        <h1 className={styles.title}>Secret Network Nodes</h1>

        <div>
          <h5 className={styles.environment}>Mainnet</h5>
        </div>
        <div className={styles.grid}>
          {mainnetNodes.map((item: any, index: any) => {
            return (
              <NodeCard
                name={item.name}
                endpoints={item.endpoints}
                chainId={item.chainId}
                env="mainnet"
                website={item.website}
                key={index}
              />
            );
          })}
        </div>

        <div>
          <h5 className={styles.environment}>Testnet</h5>
        </div>
        <div className={styles.grid}>
          {testnetNodes.map((item: any, index: any) => {
            return (
              <NodeCard
                name={item.name}
                endpoints={item.endpoints}
                chainId={item.chainId}
                env="testnet"
                website={item.website}
                key={index}
              />
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        {/* todo footer */}
        <a
          href="https://scrt.network/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/Secret.svg" alt="Secret Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
