import React, { useState } from 'react';
import axios from 'axios';
import * as u2fApi from 'u2f-api';

const Register = () => {
    const [username, setUsername] = useState('');

    const handleRegister = async () => {
        if (!window.u2f || !window.u2f.register) {
            alert('U2F not supported in this browser. Please use a compatible browser like Chrome or Firefox.');
            return;
        }

        try {
            const registerRequest = await axios.post('https://yubikeybe.onrender.com/auth/registerRequest', { username });
            console.log('Register Request:', registerRequest.data);

            const registerResponse = await u2fApi.register([registerRequest.data]);
            console.log('Register Response:', registerResponse);

            await axios.post('https://yubikeybe.onrender.com/auth/registerResponse', { username, registerResponse });
            alert('Device registered successfully');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
