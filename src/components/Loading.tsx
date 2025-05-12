import { Box, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height='100vh'
    >
      <Typography variant='h4'>Loading...</Typography>
    </Box>
  );
}
