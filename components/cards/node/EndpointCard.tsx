import TrafficOutlinedIcon from '@mui/icons-material/TrafficOutlined';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useQuery } from 'react-query';
import styles from './NodeCard.module.css';

export interface IEndpoint {
  type: string;
  url: string;
  name: string;
  env: string;
  chainId: string;
}

const EndpointCard: React.FC<IEndpoint> = ({
  name,
  chainId,
  type,
  url,
  env,
}) => {
  const [open, setOpen] = React.useState(false);

  const getStatus = async () =>
    await (
      await fetch(
        `/api/node_status?env=${env}&chainId=${chainId}&endpointType=${type}&name=${name}`
      )
    ).json();

  const { isLoading, isError, status, error } = useQuery(
    'endpointData',
    getStatus
  );

  if (isLoading) return 'Loading...';

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
        <div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              p: 1,
            }}
          >
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              {type}
            </Typography>
            <TrafficOutlinedIcon color={status ? 'success' : 'error'} />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {url}
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default EndpointCard;
