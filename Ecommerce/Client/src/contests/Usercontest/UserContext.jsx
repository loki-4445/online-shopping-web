import { sample } from './Users';
import { useEffect, useState } from 'react';

export function UserContext({ children }) {
  const [cred, setCred] = useState(null);
  const [currUser, setCurrUser] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve the token and user credentials from sessionStorage on mount
    const token = sessionStorage.getItem('token');
    const storedCred = sessionStorage.getItem('cred');

    if (token && storedCred) {
      setCred(storedCred);
      setCurrUser(true);
    }
  }, []);

  async function login(userCred) {
    try {
      const res = await fetch('http://localhost:4000/user-api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCred),
      });

      const result = await res.json();
      console.log(result); // Debug: see what you get from the API

      if (result.message === 'Login success') {
        setCred(result.user.username);
        setCurrUser(true);
        setError('');
        sessionStorage.setItem('token', result.token);
        sessionStorage.setItem('cred', result.user.username);
        console.log("Login success");
      } else if (result.message === 'Incorrect username') {
        setError("Incorrect username");
        setCred(null);
        setCurrUser(false);
      } else if (result.message === 'Incorrect password') {
        setError("Incorrect password");
        setCred(null);
        setCurrUser(false);
      }
    } catch (error) {
      console.error("Error during login", error);
      setError("Login failed");
      setCred(null);
      setCurrUser(false);
    }
  }

  function logout() {
    setCred(null);
    setCurrUser(false);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('cred');
  }

  useEffect(() => {
    console.log("Cred updated:", cred);
  }, [cred]);

  return (
    <sample.Provider value={{ cred, currUser, login, logout, error }}>
      {children}
    </sample.Provider>
  );
}
