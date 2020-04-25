import React, {useState} from 'react';

const Login = ({setUser, setLogged}) => {
    const [email, setEmail] = useState('jerome@projet.io');
    const [password, setPassword] = useState('secret');

    const logIn = async e => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const {payload, token, refresh} = await response.json();

                setUser(payload);

                localStorage.token = token;
                localStorage.refresh = refresh;

                setLogged(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form onSubmit={logIn}>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type="submit">LogIn</button>
        </form>
    );
};

export default Login;
