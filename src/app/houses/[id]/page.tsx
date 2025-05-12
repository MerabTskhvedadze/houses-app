'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Snackbar,
  SnackbarCloseReason,
  Typography,
} from '@mui/material';
import { House } from '@/app/types';
import { useEffect, useState } from 'react';
import { fetchHouseById } from '@/services/houseServices';
import Loading from '@/components/Loading';

export default function HouseDetails() {
  const params = useParams();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    const loadHouse = async () => {
      try {
        const foundHouse = await fetchHouseById(Number(params.id));
        setHouse(foundHouse || null);
      } catch (error) {
        console.error('Error loading house:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHouse();
  }, [params.id]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  if (loading) return <Loading />;
  if (!house) return <div>House not found</div>;

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardMedia
          component='img'
          height='400'
          image={'https://i.redd.it/dm1ajryp0lv81.jpg'}
          alt={house.name}
        />
        <CardContent>
          <Typography variant='h3' component='h1' sx={{ mb: 2 }}>
            {house.name}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Box>
              <Typography variant='h5' color='primary' sx={{ mb: 1 }}>
                €{house.price.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={`${house.bedrooms} Bedrooms`} />
                <Chip label={house.type} />
                <Chip label={house.area} />
              </Box>
              <Typography variant='body1' paragraph>
                {house.description}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                bgcolor: 'grey.50',
                borderRadius: 1,
                height: '100%',
              }}
            >
              <Typography variant='h6' sx={{ mb: 2 }}>
                Property Details
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2,
                }}
              >
                <Typography>Size:</Typography>
                <Typography>{house.size} m²</Typography>
                <Typography>Bathrooms:</Typography>
                <Typography>Type:</Typography>
                <Typography>{house.type}</Typography>
                <Typography>Location:</Typography>
                <Typography>{house.area}</Typography>
              </Box>
            </Box>
          </Grid>

          <Box sx={{ mb: 2 }}>
            <Button
              variant='contained'
              size='large'
              fullWidth
              onClick={() => setOpenAlert(true)}
            >
              Contact Agent
            </Button>
            <Link href={`/houses`}>
              <Button variant='outlined' size='large' sx={{ mt: 2 }} fullWidth>
                Back to Listings
              </Button>
            </Link>
          </Box>
        </CardContent>

        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message='Contacting agent...'
        />
      </Card>
    </Container>
  );
}
