import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

const FULL_USER = gql`
    {
        users {
            id,
            lastName,
            firstName,
            email,
            password
        }
    }
`;

const Logged = ({user, setUser, setLogged}) => {
    const [fullUser, setFullUser] = useState({});
    const [getFullUser, {loading, called, data, refetch}] = useLazyQuery(FULL_USER);

    const logout = () => {
        delete localStorage.token;
        delete localStorage.refresh;
        setUser({});
        setFullUser({});
        setLogged(false);
    };

    const loadUser = async () => {
        if (!called) {
            getFullUser()
        } else {
            const response = await refetch();
            setFullUser(response.data.users[0]);
        }
    };

    // first loadUser
    useEffect(() => {
        if (called && !loading){
            setFullUser(data.users[0]);
        }
    }, [called, loading, data])

    return (
        <div>
            <div>
                <h1>User: {user.firstName} - {user.lastName}</h1>
                <button onClick={logout}>Logout</button>
            </div>
            <div>
                <button onClick={loadUser}>Show users</button>
                <p style={{maxWidth: '80vw', overflow: 'auto'}}>{JSON.stringify(fullUser)}</p>
            </div>
        </div>
    );
};

export default Logged;
