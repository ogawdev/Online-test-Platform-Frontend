import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import axios from 'axios';
function TeacherProfile(props) {
    const [auth, setAuth] = useAuth()

    const [name, setName] = useState("Bahodirjon")
    const [login, setLogin] = useState("admin")
    const [password, setPassword] = useState();
    const [number, setNumber] = useState("number")
    const [status, setStatus] = useState("status")

    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        let { data } = await axios.get(`/user/get-teacher`, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        if (data.error) {
            toast.error(data.error)
        } else {
            setLogin(data.login);
            setName(data.name);
            setNumber(data.phoneNumber);
            setStatus(data.status);
        }
    }

    const editProfile = async (e) => {
        e.preventDefault();
        let { data } = await axios.put(`/user/edit-user`, { name, password, number, });
        if (data.error) {
            console.log(data.error);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.setItem('user', JSON.stringify(data.userEdited));
            localStorage.setItem('token', JSON.stringify(data.access_token));
        }
    }

    return (
        <div className="col-md-8">
            <div className="row text-white">
                <form>
                    <div className="col-md-12">
                        <input type="text" value={name} disabled={auth?.user?.isAllowed !== true} onChange={(e) => setName(e.target.value)} className='form-control mt-2 mb-2' />
                    </div>
                    <div className="col-md-12">
                        <input type="text" value={login} disabled={auth?.user?.isAdmin !== true} onChange={(e) => setLogin(e.target.value)} className='form-control mt-2 mb-2' />
                    </div>
                    <div className="col-md-12">
                        <input type="password" value={password} disabled={auth?.user?.isAllowed !== true} onChange={(e) => setPassword(e.target.value)} className='form-control mt-2 mb-2' placeholder='Password' />
                    </div>
                    <div className="col-md-12">
                        <input type="text" value={number} disabled={auth?.user?.isAllowed !== true} onChange={(e) => setNumber(e.target.value)} className='form-control mt-2 mb-2' />
                    </div>
                    <div className="col-md-12">
                        <input type="text" value={status} disabled={auth?.user?.isAdmin !== true} onChange={(e) => setStatus(e.target.value)} className='form-control mt-2 mb-2' />
                    </div>
                    <div className=''>
                        <button className='btn btn-outline-warning' disabled={auth?.user?.isAllowed !== true} onClick={editProfile}>EDIT</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TeacherProfile;