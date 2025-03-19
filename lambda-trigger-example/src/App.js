import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import './App.css';

Amplify.configure(awsExports);

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        const session = await fetchAuthSession();
        setUser(currentUser);

        const payload = session.tokens?.idToken?.payload || {};
        if (payload['cognito:groups']?.includes('Admin')) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUser();
  }, []);

  return (
    <Authenticator>
      {({ signOut }) => (
        <div className="App">
          <header>
            <h1>Hello World</h1>
            {isAdmin && <p>Welcome, Admin</p>}
          </header>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
