import React, { useState } from 'react';
import axios from 'axios';

function Authenticate() {
  const [email, setEmail] = useState('');

  const authenticate = async () => {
    try {
      const { data: authRequest } = await axios.post('https://yubikeybe.onrender.com/authenticate', { email });
      window.u2f.sign(authRequest.appId, authRequest.challenge, authRequest.registeredKeys, async (authResponse) => {
        const response = await axios.post('https://yubikeybe.onrender.com/authenticate/verify', { email, authResponse });
        if (response.status === 200) {
          alert('Authentication successful');
        } else {
          alert('Authentication failed: ' + response.data.error);
        }
      });
    } catch (error) {
      console.error('Error during authentication', error);
    }
  };

  return (
    <div>
      <h2>Authenticate</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={authenticate}>Authenticate</button>
    </div>
  );
}

export default Authenticate;
