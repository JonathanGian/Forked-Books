import { useEffect, useMemo, useState } from 'react';
import useAxios from '../services/useAxios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
  
} from '@mui/material';
import { Link } from 'react-router-dom'; 


// Book Page
function Books() {
  const api = 'https://json-server-54mh.onrender.com';
  const { get, data, loading } = useAxios(api);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    if (data.length === 0) {
      fetchBooks();
    }


  }, []);

  const fetchBooks = async () => {
    try {
      await get('books');
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const filteredBooks = useMemo(() => {
    if (searchTerm === '') {
      return data;
    }
    return data.filter((book) => {
      const matchesTitle = book.name.toLowerCase().includes(searchTerm)
      const matchesAuthor = book.author.toLowerCase().includes(searchTerm)
      const matchesGenre = book.genres.some((genre) => genre.toLowerCase().includes(searchTerm))
      return matchesTitle || matchesAuthor || matchesGenre;
    });

  }, [data, searchTerm]);

  // Handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);


  };

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      {/* Search Field */}
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
      />

      {/* Loading Indicator */}
      {loading && <CircularProgress />}

      {/* Render books */}
      {!loading && (
        <Stack
          sx={{ justifyContent: 'space-around' }}
          spacing={{ xs: 1 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >

          {filteredBooks?.map((book) => (
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '15%',
                minWidth: 200,
              }}
              key={book.name}
            >
              {/* Book Cover */}
              <CardMedia
                sx={{ height: 250, backgroundSize: 'contain' }}
                image={book.img || '/assets/book-icon-2-flaticons.png'}
                title={book.name}
              />
              {/* Genre */}
              <Box sx={{ pt: 2, pl: 2 }}>
                {book.genres.map((genre, i) => (
                  <Chip
                    key={i}
                    label={genre}
                    variant="outlined"
                    size="small"
                  />
                ))}
                {/* Book name */}
                <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                  {book.name}
                </Typography>
                {/* Author */}
                <Typography variant="subtitle1" gutterBottom>
                  {book.author}
                </Typography>
              </Box>
              {/* Card Actions */}
              <CardActions
                sx={{
                  justifyContent: 'space-between',
                  mt: 'auto',
                  pl: 2,
                }}
              >
                {/* Rating */}
                <Rating
                  name="read-only"
                  value={book.stars || 0} // Show 0 stars if no rating is present
                  readOnly
                  precision={0.5}
                />
                {/* Learn More */}
               
                  <Button
                    size="small"
                    component={Link}
                    to={`/books/${book.id}`}
                  >
                    Learn More
                  </Button>
               
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default Books;
