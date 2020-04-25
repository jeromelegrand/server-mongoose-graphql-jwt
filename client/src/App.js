import React, {useState} from 'react';

import style from './App.module.scss';
import Login from './component/Login';
import Logged from './component/Logged';

function App() {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState({});

    return (
            <div className={style.app}>
                {logged ?
                    <Logged user={user} setUser={setUser} setLogged={setLogged}/>
                    :
                    <Login setUser={setUser} setLogged={setLogged}/>
                }
            </div>
    );

}

export default App;
