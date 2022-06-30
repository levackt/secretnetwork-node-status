import TrafficOutlinedIcon from '@mui/icons-material/TrafficOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useQuery } from 'react-query';
import styles from './EndpointCard.module.css';

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

  const { isLoading, isError, data, error } = useQuery(
    `endpointData_${env}_${chainId}_${type}_${name}`,
    getStatus
  );

  if (error !== null) {
    console.log(`error=${JSON.stringify(error)}`);
  }

  if (isLoading) {
    return <div>Loading</div>;
  }
  console.log(`data=${JSON.stringify(data)}`);
  let status;
  if (!isError && data !== undefined) {
    status = data.endpointStatus;
  }

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
            <Typography
              sx={{ mb: 1.5 }}
              color="text.primary"
              className={styles.endpointType}
            >
              {type}
            </Typography>

            {isLoading && (
              <TrafficOutlinedIcon
                color={'warning'}
                className={styles.endpointStatus}
              />
            )}
            {!isLoading && (
              <TrafficOutlinedIcon
                color={status ? 'success' : 'error'}
                className={styles.endpointStatus}
              />
            )}
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              className={styles.endpointUrl}
            >
              {url}
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default EndpointCard;
