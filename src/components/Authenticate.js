import React, { useState } from 'react';
import axios from 'axios';
import base64url from 'base64url';

function Authenticate() {
  const [email, setEmail] = useState('');

  const authenticate = async () => {
    try {
      const { data: options } = await axios.post('https://yubikeybe.onrender.com/authenticate', { email });
      options.challenge = base64url.toBuffer(options.challenge);

      options.allowCredentials.forEach((cred) => {
        cred.id = base64url.toBuffer(cred.id);
      });

      const assertion = await navigator.credentials.get({
        publicKey: options,
      });

      const authData = {
        id: assertion.id,
        rawId: base64url.encode(assertion.rawId),
        response: {
          authenticatorData: base64url.encode(assertion.response.authenticatorData),
          clientDataJSON: base64url.encode(assertion.response.clientDataJSON),
          signature: base64url.encode(assertion.response.signature),
          userHandle: base64url.encode(assertion.response.userHandle),
        },
        type: assertion.type,
      };

      const response = await axios.post('https://yubikeybe.onrender.com/authenticate/verify', { email, assertion: authData });
      if (response.status === 200) {
        alert('Authentication successful');
      } else {
        alert('Authentication failed: ' + response.data.error);
      }
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
