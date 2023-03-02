import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Login from '../pages/Login';
import Jumbotron from './Jumbotron';

function ProtectedRouteUser(props) {
    const [auth, setAuth] = useAuth();

    const [user, setUser] = useState('');

    useEffect(() => {
        findUser();
    }, []);


    async function findUser() {
        let { data } = await axios.get("/user/get-user", {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        if (data.error) {
            setUser(false)
        } else {
            setUser(data)
        }
    }

    return (
        auth ?
        user == false ? <Login />
            : user?.name == auth?.user?.name && (
                <>
                    <Jumbotron />
                    <Outlet />
                </>
            ) : <Login />
    )
}

export default ProtectedRouteUser;