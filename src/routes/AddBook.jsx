import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Stack, Typography } from '@mui/material';
import bookIcon from '../assets/book-icon-2-flaticons.png';

/* Function to add a new book */
function AddBook() {
  /* using post with useAxios */
  const { alert, post } = useAxios("https://json-server-54mh.onrender.com");
 
  const [book, setBook] = useState({
    author: "",
    name: "",
    genres: [],
    img: bookIcon,
    completed: false,
    start: null,
    end: null,
    stars: null,
  });

  /* Updates the genres field in the book state when the genre selection changes */
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,
    });
  };

  /* Updates the stars when book state changes */
  const rateChangeHandler = (event, newValue) => {
    setBook((prevBook) => ({
      ...prevBook,
      stars: newValue, 
    }));
  };
  
  /* Updates the book state for other form fields. Handles both checkbox and other input types. */
  const addBookHandler = (e) => {
    const { name, value, checked, type } = e.target;
    
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
    const handleDateChange = (name, value) => {
      setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };
  
  /* Submits the form by making a POST request to the books endpoint with the current book state.*/
  function postHandler(e) {
    e.preventDefault(); // Prevent page refresh
  
    // Validate and provide default values
    const finalBook = {
      ...book,
      stars: parseFloat(book.stars) || 0, // Ensure `stars` is a number
    };
   
  
    // Make the POST request
    post("books", finalBook);
  }

  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {alert.show && <Alert severity={alert.type}>{alert.message}</Alert>}
        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        {/* Title textfield */}
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        {/* Author Textfield */}
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        {/* Image Textfield */}
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        {/* Genre Select */}
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {/* Mapping book genres to menu*/}
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        {/* Completed checkbox */}
        <FormControlLabel
          control={
            <Checkbox
            name='completed'
              checked={book.completed}
              onChange={addBookHandler}
            />
          }
          label="Completed"
        />

      {/* Start Date */}
      <TextField
  name="start"
  label="Started"
  type="date"
  InputLabelProps={{ shrink: true }}
  value={book.start || ''}
  onChange={(e) => handleDateChange('start', e.target.value)}
/>
        {/* End Date */}
        <TextField
  name="end"
  label="Finished"
  type="date"
  InputLabelProps={{ shrink: true }}
  value={book.end || ''}
  onChange={(e) => handleDateChange('end', e.target.value)}
  disabled={!book.completed}
/>
          {/* Star ratings */}
          <Stack spacing={1}
          // Fix for the UI issues
          sx={{flexDirection: "row"}}>
          <Rating
            name="rating"
            value={book.stars || 0}
            onChange={rateChangeHandler} 
            size="large"
            precision={0.5}
           
          />
        
        </Stack>
        
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;
