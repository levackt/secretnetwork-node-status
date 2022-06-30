import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import EndpointCard from './EndpointCard';
import styles from './NodeCard.module.css';

export interface IEndpoint {
  type: string;
  url: string;
  status?: boolean;
}

export interface INodeCard {
  name: string;
  chainId: string;
  authentication?: string | null;
  archive?: boolean;
  price?: string;
  secret?: boolean;
  website: string;
  endpoints: IEndpoint[];
  env: string;
}

const NodeCard: React.FC<INodeCard> = ({
  name,
  endpoints,
  chainId,
  website,
  env,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.nodeCard}>
        <div className={styles.card__header}></div>
        <Card sx={{ minWidth: 275 }} className={styles.card}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.primary"
              gutterBottom
              variant="body2"
            >
              {name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              ChainId: {chainId}
            </Typography>

            {endpoints.map((item: any, index: any) => {
              return (
                <EndpointCard
                  name={name}
                  type={item.type}
                  url={item.url}
                  chainId={chainId}
                  env={env}
                  key={index}
                />
              );
            })}
          </CardContent>
          <CardActions>
            <Button
              style={{ textTransform: 'lowercase' }}
              size="small"
              href={website}
            >
              {website}
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default NodeCard;
