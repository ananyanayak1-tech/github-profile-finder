import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");        // what the user types
  const [username, setUsername] = useState("");  // what we actually search
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch data whenever "username" changes
  useEffect(() => {
    if (!username) return;
    let ignore = false;

    const fetchUser = async () => {
      setLoading(true);
      setError("");
      setUser(null);
      setRepos([]);

      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.status === 404) throw new Error(`User "${username}" was not found.`);
        if (res.status === 403) throw new Error("API rate limit reached. Try again in a few minutes.");
        if (!res.ok) throw new Error("Something went wrong. Please try again.");
        const data = await res.json();

        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );
        const repoData = repoRes.ok ? await repoRes.json() : [];

        if (ignore) return;
        setUser(data);
        setRepos(repoData);
        setHistory((prev) =>
          [data.login, ...prev.filter((n) => n.toLowerCase() !== data.login.toLowerCase())].slice(0, 5)
        );
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchUser();
    return () => { ignore = true; };
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = input.trim();
    if (!name) {
      setUser(null);
      setError("Please enter a GitHub username.");
      return;
    }
    setUsername(name);
  };

  const searchFromHistory = (name) => {
    setInput(name);
    setUsername(name);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <header className="header">
          <h1>GitHub Profile Finder</h1>
          <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </header>

        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a GitHub username"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {history.length > 0 && (
          <div className="history">
            <span>Recent:</span>
            {history.map((name) => (
              <button key={name} className="chip" onClick={() => searchFromHistory(name)}>
                {name}
              </button>
            ))}
          </div>
        )}

        {loading && <p className="message">Loading...</p>}
        {error && <p className="message error">{error}</p>}

        {user && (
          <div className="card">
            <img src={user.avatar_url} alt={user.login} className="avatar" />
            <h2>{user.name || user.login}</h2>
            <p className="login">@{user.login}</p>
            <p className="bio">{user.bio || "This user has no bio."}</p>

            <div className="stats">
              <div><strong>{user.public_repos}</strong><span>Repos</span></div>
              <div><strong>{user.followers}</strong><span>Followers</span></div>
              <div><strong>{user.following}</strong><span>Following</span></div>
            </div>

            <a className="visit" href={user.html_url} target="_blank" rel="noreferrer">
              Visit GitHub profile
            </a>

            {repos.length > 0 && (
              <div className="repos">
                <h3>Latest repositories</h3>
                <ul>
                  {repos.map((repo) => (
                    <li key={repo.id}>
                      <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                      <span>{repo.stargazers_count} stars</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;