import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, Chip, CardMedia, Paper, Grid, Rating } from '@mui/material';
import useAxios from '../services/useAxios';

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { get,data,loading} = useAxios('http://localhost:3000');
    const navigate = useNavigate();
  useEffect(() => {
      if(data.length === 0){
        fetchBook();
      }
      
    }, [data]);
    console.log("ID from URL:", id);
    console.log("Book Name:", data.name);
    const fetchBook = async () => {
        try {
          await get(`books/${id}`);
          setBook(data);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };


  if (loading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <Typography>No book details available.</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: 800, p: 4, width: '100%' }}>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Back
        </Button>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          {/* Book Cover */}
          <CardMedia
            sx={{
              height: 300,
              width: { xs: '100%', sm: 200 },
              backgroundSize: 'contain',
              borderRadius: 2,
              mb: { xs: 2, sm: 0 },
              mr: { sm: 4 },
            }}
            image={data.img}
            title={data.name}
          />

          {/* Book Details */}
          <Box>
            <Typography variant="h4" gutterBottom>
              {data.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Author: {data.author}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ mt: 2, fontStyle: 'italic' }}
            >
              {data.description}
            </Typography>

            {/* Genres */}
            {data.genres && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Genres:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {data.genres.map((genre, index) => (
                    <Chip key={index} label={genre} variant="outlined" />
                  ))}
                </Box>
              </Box>
            )}

            {/* Rating */}
            {data.stars && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Rating:</Typography>
                
                 <Rating
                  name="read-only"
                  value={data.stars || 0} // Show 0 stars if no rating is present
                  readOnly
                  precision={0.5}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Book;

