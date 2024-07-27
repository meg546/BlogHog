import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, confPassword }), // ensure field names match server
            });

            if (response.ok) {
                setMessage('User registered successfully!');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfPassword('');
            } else {
                const text = await response.text();
                setMessage(text);
            }
        } catch (error) {
            setMessage('Error registering user.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confPassword"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            {<p>{message}</p>}
        </div>
    );
};

export default Register;
