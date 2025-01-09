import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, Chip, CardMedia, Paper, Grid, Rating,Checkbox} from '@mui/material';
import useAxios from '../services/useAxios';

function Book() {
const { id } = useParams();
const api = "https://json-server-54mh.onrender.com"
const { get,data} = useAxios(api);
const [isloading, setisloading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
  if(data.length === 0){
    fetchBook();
  }else{
    setisloading(false);
    }
 }, [data]);

const fetchBook = async () => {
    try {
      await get(`books/${id}`);
    } catch (error) {
    console.error("Error fetching books:", error);
    }
};


if (isloading) {
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
            image={data.img|| "/assets/book-icon-2-flaticons.png"}
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
              {data.description || 'No description available.'}
            </Typography>

            {/* Genres */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Genres:</Typography>
              {data.genres && data.genres.length > 0 ? (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {data.genres.map((genre, index) => (
                    <Chip key={index} label={genre} variant="outlined" />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No genres available
                </Typography>
              )}
            </Box>
            {/* Start and End Dates */}
            {data.start && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
           Started: {data.start ? new Date(data.start).toLocaleDateString() : 'Not yet'}
            </Typography>
            )}                
            {data.completed && data.end && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Completed: {data.end ? new Date(data.end).toLocaleDateString() : 'Not yet'}
            
            </Typography>
            
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

