import TrafficOutlinedIcon from '@mui/icons-material/TrafficOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useQuery } from 'react-query';
import styles from './NodeCard.module.css';

export interface IEndpoint {
  name: string;
  chainId: string;
  type: string;
  url: string;
  env: string;
}

const EndpointCard: React.FC<IEndpoint> = ({
  name,
  chainId,
  type,
  url,
  env,
}) => {
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

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.card__header}></div>
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

            {isLoading && <TrafficOutlinedIcon color={'warning'} />}
            {!isLoading && (
              <TrafficOutlinedIcon color={status ? 'success' : 'error'} />
            )}
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
