import React, { useState } from 'react';
import axios from 'axios';
import * as u2fApi from 'u2f-api';

const Login = () => {
    const [username, setUsername] = useState('');

    const handleLogin = async () => {
        try {
            const signRequest = await axios.post('https://yubikeybe.onrender.com/auth/signRequest', { username });
            const signResponse = await u2fApi.sign(signRequest.data);
            const result = await axios.post('https://yubikeybe.onrender.com/auth/signResponse', { username, signResponse });
            alert(result.data);
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
