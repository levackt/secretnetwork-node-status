import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Snackbar from '@mui/material/Snackbar';
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
  websiteURL?: string;
  endpoints: IEndpoint[];
  env: string;
}

const NodeCard: React.FC<INodeCard> = ({
  name,
  endpoints,
  chainId,
  website,
  websiteURL,
  env,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (event: React.SyntheticEvent | Event, reason?: string) => {
    console.log('opening');
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.card__header}>
          <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            message="URL copied"
          />
        </div>
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
              href={websiteURL || website}
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
