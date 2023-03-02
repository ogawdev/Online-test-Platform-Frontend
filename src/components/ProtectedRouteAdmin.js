import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Login from '../pages/Login';
import Jumbotron from './Jumbotron';

function ProtectedRouteAdmin(props) {
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
        (user?.name == auth?.user?.name && user?.isAllowed == true && user?.isAdmin == true ) ? (
            <>
                <Jumbotron />
                <Outlet />
            </>
        ) : <Login />
    )
}

export default ProtectedRouteAdmin;