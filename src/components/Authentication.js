import React from 'react';
import axios from 'axios';

function Authentication() {
  const authenticate = async () => {
    try {
      const { data: authRequest } = await axios.post('https://yubikeybe.onrender.com/authentication-challenge', {}, { withCredentials: true });
      window.u2f.sign(authRequest.appId, authRequest.challenge, authRequest.registeredKeys, async (authResponse) => {
        const response = await axios.post('https://yubikeybe.onrender.com/authentication-verify', { authResponse }, { withCredentials: true });
        if (response.status === 200) {
          alert('Authentication successful');
        } else {
          alert('Authentication failed: ' + response.data.errorMessage);
        }
      });
    } catch (error) {
      console.error('Error during authentication', error);
    }
  };

  return (
    <div>
      <h2>Authenticate</h2>
      <button onClick={authenticate}>Authenticate</button>
    </div>
  );
}

export default Authentication;
