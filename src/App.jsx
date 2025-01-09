import { 
createBrowserRouter,
RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Root from './routes/Root';
import Books from './routes/Books';
import Book from './routes/Book';
import AddBook from './routes/AddBook';

// Creating a theme for Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40',
    },
    secondary: {
      main: '#ffab40',
    },
  },
});
// App component that renders the RouterProvider component
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Books /> },
        { path: '/addnew', element: <AddBook /> },
        { path: '/books', element: <AddBook /> },
        { path: '/books/:id', element: <Book /> },
      ],
    },
  ]);

  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
  );
}

export default App;
