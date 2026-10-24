# GitHub Profile Finder

A React app that lets you search for any GitHub user and view their profile details using the GitHub API.

## Features

- Search for a GitHub user by username
- Shows profile picture, name, bio and username
- Shows public repositories, followers and following counts
- Loading message while data is being fetched
- Error message when the user is not found or the input is empty
- Button to visit the user's GitHub profile
- List of the user's latest public repositories
- Search history (last 5 searches)
- Dark and light mode toggle
- Responsive design for desktop and mobile

## Technologies Used

- React (with Vite)
- JavaScript (ES6)
- CSS3
- GitHub REST API

## React Concepts Used

- `useState` to manage user input, fetched data, loading, error, history and theme
- `useEffect` to fetch data from the API when a username is searched
- `fetch()` to make API requests

## API Used

GitHub Users API: `https://api.github.com/users/{username}`

No API key is required. Unauthenticated requests are limited to 60 per hour.

## How to Run

1. Clone the repository:
   ```
   git clone <your-repository-link>
   ```
2. Go into the project folder:
   ```
   cd github-profile-finder
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open the link shown in the terminal (usually http://localhost:5173).

## Project Structure

```
github-profile-finder/
  src/
    App.jsx
    App.css
    main.jsx
  index.html
  package.json
  README.md
```

## Author

Ananya Nayak