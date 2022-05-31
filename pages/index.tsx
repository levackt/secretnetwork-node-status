import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import NodeCard from '../components/cards/node/NodeCard';
import { mainnetNodes } from '../components/cards/node/Nodes';
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

        <div className={styles.grid}>
          {mainnetNodes.map((item: any, index: any) => {
            return (
              <NodeCard
                name={item.name}
                rpcEndpoint={item.rpcEndpoint}
                lcdEndpoint={item.lcdEndpoint}
                grpcWebEndpoint={item.grpcWebEndpoint}
                chainId={item.chainId}
                website={item.website}
                websiteURL={item.websiteURL}
                key={index}
              />
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        {/* todo footer */}
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
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
