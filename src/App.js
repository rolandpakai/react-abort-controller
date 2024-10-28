import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const id = useLocation().pathname.split('/')[2];
  const [error, setError] = useState(null);

  useEffect(() => {
    let didCancel = false;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {signal})
        const data = await response.json();
        if (!didCancel) setUser(data);
      } catch (e) {
        if (!didCancel) setError(e.message);
      }
    }

    if (id) fetchData();

    return () => {
      didCancel = true;
      controller.abort();
    };
  }, [id]);

  return (
    <div className="App">
      <div>
        <p>Name: {user.name}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p><Link to="/users/1">Fetch User 1</Link></p>
        <p><Link to="/users/2">Fetch User 2</Link></p>
        <p><Link to="/users/3">Fetch User 3</Link></p>
        <p>Error: {error}</p>
      </div>
    </div>
  );
}

export default App;
