import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NodeCard from '../components/cards/node/NodeCard';
import { mainnetNodes, testnetNodes } from '../data/Nodes';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [environment, setEnvironment] = React.useState('Mainnet');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newEnvironment: string
  ) => {
    setEnvironment(newEnvironment);
  };

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
        <Link href="https://github.com/scrtlabs/api-registry">
          Please add your endpoints to Secret Network API Registry
        </Link>
        <p>
          <WarningAmberIcon color="warning" />
          Public APIs. Do not use in production apps! These endpoints are
          offered to the community for free, please be mindful and don&apos;t
          spam them.
          <WarningAmberIcon color="warning" />
        </p>

        <ToggleButtonGroup
          color="primary"
          value={environment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="Mainnet">Mainnet</ToggleButton>
          <ToggleButton value="Testnet">Testnet</ToggleButton>
        </ToggleButtonGroup>

        {environment === 'Mainnet' && (
          <Card>
            <CardContent>
              <Typography className={styles.environment}>Mainnet</Typography>
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
            </CardContent>
          </Card>
        )}

        {environment === 'Testnet' && (
          <Card>
            <CardContent>
              <Typography className={styles.environment}>Testnet</Typography>
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
            </CardContent>
          </Card>
        )}
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
