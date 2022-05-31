import TrafficOutlinedIcon from '@mui/icons-material/TrafficOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import styles from './NodeCard.module.css';
import { NodeStatus, NodeType } from './NodeStatus';

export interface INodeCard {
  name: string;
  rpcEndpoint: string;
  lcdEndpoint?: string | null;
  grpcWebEndpoint?: string | null;
  wsEndpoint?: string | null;
  chainId: string;
  authentication?: string | null;
  archive?: boolean;
  price?: string;
  secret?: boolean;
  website: string;
  websiteURL?: string;
  rpcStatus?: boolean;
  lcdStatus?: boolean;
  grpcStatus?: boolean;
  wsStatus?: boolean;
}

const NodeCard: React.FC<INodeCard> = ({
  name,
  rpcEndpoint,
  lcdEndpoint,
  grpcWebEndpoint,
  chainId,
  website,
  websiteURL,
}) => {
  const [open, setOpen] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [rpcStatus, setRpcStatus] = React.useState(false);
  const [lcdStatus, setLcdStatus] = React.useState(false);
  const [grpcWebStatus, setGrpcWebStatus] = React.useState(false);

  function finish(start: number, endpoint: string) {
    const time = Date.now() - start;
    if (time > 1000) {
      console.log(`${endpoint} completed in ${time / 1000}s`);
    }
  }

  useEffect(() => {
    setFetching(true);

    let nodeStatus;

    const fetchData = async () => {
      nodeStatus = new NodeStatus(rpcEndpoint, NodeType.RPC);
      let status = await nodeStatus.checkStatus();
      setRpcStatus(status);

      if (lcdEndpoint) {
        nodeStatus = new NodeStatus(lcdEndpoint, NodeType.LCD);
        status = await nodeStatus.checkStatus();
        setLcdStatus(status);
      }

      if (grpcWebEndpoint) {
        nodeStatus = new NodeStatus(
          grpcWebEndpoint,
          NodeType.GRPC_WEB,
          chainId
        );
        status = await nodeStatus.checkStatus();
        setGrpcWebStatus(status);
      }
    };
    fetchData()
      // todo handle error
      .catch(console.error);
    setFetching(false);
  }, []);

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
            {rpcEndpoint && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  p: 1,
                }}
              >
                <Typography sx={{ mb: 1.5 }} color="text.primary">
                  RPC
                </Typography>
                <TrafficOutlinedIcon color={rpcStatus ? 'success' : 'error'} />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {rpcEndpoint}
                </Typography>
              </Box>
            )}

            {lcdEndpoint && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  p: 1,
                }}
              >
                <Typography sx={{ mb: 1.5 }} color="text.primary">
                  LCD
                </Typography>
                <TrafficOutlinedIcon color={lcdStatus ? 'success' : 'error'} />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {lcdEndpoint}
                </Typography>
              </Box>
            )}

            {grpcWebEndpoint && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  p: 1,
                }}
              >
                <Typography sx={{ mb: 1.5 }} color="text.primary">
                  gRPC
                </Typography>
                <TrafficOutlinedIcon
                  color={grpcWebStatus ? 'success' : 'error'}
                />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {grpcWebEndpoint}
                </Typography>
              </Box>
            )}
            {fetching && <CircularProgress color="secondary" />}
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
