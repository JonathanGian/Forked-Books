# Books MVP
**⚠ Warning:** The API server is spun down after a period of inactivity, so you might have to wait up to 50 seconds for the server to spin up on first launch.
## Project Overview

The **Books MVP Project** is a React-based web application designed to manage a list of books. The app includes features such as searching, viewing book details, adding new books, and displaying book ratings. This project focuses on improving the user experience and maintainability through incremental updates.

## Getting Started

### Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** or **yarn**

### Installation

1. Clone the forked repository:
   ```bash
   git clone https://github.com/<your-username>/Books-MVP.git
   ````
2. Navigate to the project directory:
```bash
cd Books-MVP
```
3. Install dependencies:
```bash
npm install
```
or
```bash
yarn install
```
4. Start development server:
```bash
npm run dev
```
5. Check terminal for url of the app:
(default:  http://localhost:5173/)
```bash
 VITE v5.0.9  ready in 316 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```

### 1. **Ticket #101 - Enhance code documentation**

- **User Story**:  
  As a developer, I want detailed comments for each function to better understand the codebase and maintain it efficiently.  
- **Task**:  
  Add descriptive comments to all functions across the codebase to improve readability and facilitate easier maintenance.

### 2. **Ticket #102 - Refactor `Books.jsx` to use a custom hook**

- **User Story**:  
  As a developer, I want to use the `useAxios` custom hook in `Books.jsx` to streamline HTTP requests and ensure consistency in data fetching.  
- **Task**:  
  Replace the current `axios.get` calls in `Books.jsx` with the `useAxios` custom hook without changing the existing functionality.

### 3. **Ticket #103 - Add search functionality to `Books.jsx`**

- **User Story**:  
  As a user, I want to search for books by title, author, or genre, so I can easily find specific books.  
- **Task**:  
  Add a search feature to `Books.jsx` that filters books based on the user's input.

### 4. **Ticket #104 - Fix `Rating` component mouseover in `AddBook.jsx`**

- **User Story**:  
  As a user, I want to see the rating value clearly when hovering over stars to understand the selected value.  
- **Task**:  
  Update the `Rating` component in `AddBook.jsx` to ensure the mouseover behavior works correctly and displays the rating value clearly.

### 5. **Ticket #105 - Adjust message display timing in `AddBook.jsx`**

- **User Story**:  
  As a user, I want success or error messages to display long enough for me to understand the outcome of my actions.  
- **Task**:  
  Modify `AddBook.jsx` to ensure that success or error messages are displayed for the full 5000 milliseconds as specified in the `useAxios` hook.

### 6. **Ticket #106 - Fix post method in `AddBook.jsx`**

- **User Story**:  
  As a user, I want to add new books and see them listed.  
- **Task**:  
  Update `AddBook.jsx` to ensure books are successfully posted and appear in the book list.

### 7. **Ticket #107 - Implement an image URL fallback**

- **User Story**:  
  As a user, I want a default image to display for books without an image URL, keeping the interface consistent and visually appealing.  
- **Task**:  
  Add a fallback mechanism in `AddBook.jsx` to display a default image when no image URL is provided.

### 8. **Ticket #108 - Develop `SinglePage` Component**

- **8.1. Route and Navigation Links**  
  - **User Story**:  
    As a user, I want to navigate to a detailed page for each book to view more information.  
  - **Task**:  
    Set up a new route and navigation links for the `SinglePage` component.  

- **8.2. Consistent Styling**  
  - **User Story**:  
    As a user, I want the `SinglePage` component to match the style of the rest of the application for a seamless experience.  
  - **Task**:  
    Use Material-UI to style the `SinglePage` component, ensuring it aligns with the application's existing design.
#
### Link to live site: 
- Live [page](https://books-mvp.netlify.app/)

## Sources 

- [GitHub Guides - masterin markdown](https://guides.github.com/features/mastering-markdown/)
- [Make a README](https://www.makeareadme.com/)

## Authors and acknowledgment

<span class="highlight2">Margit Tennosaar</span>
- [GitHub](https://github.com/margittennosaar)
- [LinkedIn](https://www.linkedin.com/in/margittennosaar/)

Special thanks to my school and instructors for guiding me through this project.

## Sources and References
-	React Documentation
-	JSON Server Guide
-	Vite Documentation
