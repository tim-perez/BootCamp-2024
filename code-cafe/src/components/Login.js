import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';
import Alert from './Alert';
import CurrentUserContext from '../contexts/CurrentUserContext';
import './Login.css';

function Login() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    const pb = new PocketBase();
    try {
      const result = await pb.collection('users').authWithPassword(
        username,
        password,
      );
      setCurrentUser(result.record);
      navigate('/');
    } catch (error) {
      console.error(error);
      setApiError(error?.response?.data?.error || 'Unknown Error');
    }
  };

  return (
    <div className="login-component">
      <Alert visible={!!apiError} type="error">
        <p>There was an error logging in.</p>
        <p>{apiError}</p>
        <p>Please try again.</p>
      </Alert>
      <h2>Log In</h2>
      <form onSubmit={login}>
        <div>
          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              value={username}
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
