import React, { useState } from 'react';
import axios from 'axios';
import base64url from 'base64url';

function Register() {
  const [email, setEmail] = useState('');

  const register = async () => {
    try {
      const { data: options } = await axios.post('https://yubikeybe.onrender.com/register', { email });
      options.challenge = base64url.toBuffer(options.challenge);
      options.user.id = base64url.toBuffer(options.user.id);

      const credential = await navigator.credentials.create({
        publicKey: options,
      });

      const attestation = {
        id: credential.id,
        rawId: base64url.encode(credential.rawId),
        response: {
          attestationObject: base64url.encode(credential.response.attestationObject),
          clientDataJSON: base64url.encode(credential.response.clientDataJSON),
        },
        type: credential.type,
      };

      const response = await axios.post('https://yubikeybe.onrender.com/register/verify', { email, attestation });
      if (response.status === 200) {
        alert('Registration successful');
      } else {
        alert('Registration failed: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error during registration', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
