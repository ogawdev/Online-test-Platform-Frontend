import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import UserMenu from '../../components/menu/UserMenu';
function UserProfile(props) {
    const [auth, setAuth] = useAuth()

    const [name, setName] = useState("Bahodirjon")
    const [lastName, setLastName] = useState("Qurbonov")
    const [login, setLogin] = useState("admin")
    const [password, setPassword] = useState();
    const [number, setNumber] = useState("number")
    const [address, setAddress] = useState("adress")
    const [isTeacher, setIsTeacher] = useState("false")
    const [isAllowed, setIsAllowed] = useState("false")
    const [status, setStatus] = useState("status")

    useEffect(() => {
        loadUser();
    }, []);


    const loadUser = async () => {
        let { data } = await axios.get(`/user/get-user`, {
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
            setLastName(data.lastName);
            setIsAllowed(data.isAllowed);
            setIsTeacher(data.isTeacher);
            setAddress(data.address);
        }
    }

    const editUser = async (e) => {
        e.preventDefault();
        let { data } = await axios.put('/user/edit-user', { name, lastName, number, address, password });
        if (data.error) {
            toast.error(data.error);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.setItem('user', JSON.stringify(data.userEdited));
            localStorage.setItem('token', JSON.stringify(data.access_token));
            loadUser();
            window.location.reload();
            toast.success('Muvaffaqiyatli o`zgartirildi');

        }
    }

    return (
        <div className="row p-3">
            <UserMenu />
            <div className="col-md-8">
                <div className="row text-white">
                    <form>
                        <div className="col-md-12">
                            <input type="text" value={name} disabled={auth?.user?.isTeacher == 'true'} onChange={(e) => setName(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={lastName} disabled={auth?.user?.isTeacher == 'true'} onChange={(e) => setLastName(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={login} disabled={auth?.user?.isAllowed !== true} onChange={(e) => setLogin(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={password} disabled={auth?.user?.isTeacher == 'true'} onChange={(e) => setPassword(e.target.value)} className='form-control mt-2 mb-2' placeholder='Password' />
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={number} disabled={auth?.user?.isTeacher == 'true'} onChange={(e) => setNumber(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={status} disabled={auth?.user?.isAllowed !== true} onChange={(e) => setStatus(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={address} disabled={auth?.user?.isTeacher == 'true'} onChange={(e) => setAddress(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={isTeacher == 'false' && "Talaba sifatida royhatdan o`tilgan"} disabled={auth?.user?.isAllowed !== true} onChange={(e) => setIsTeacher(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div className="col-md-12">
                            <input type="text" value={isAllowed ? 'Ruxsat etilgan' : 'Ruxsat etilmagan'} disabled={auth?.user?.isAllowed !== true} onChange={(e) => setIsAllowed(e.target.value)} className='form-control mt-2 mb-2' />
                        </div>
                        <div className=''>
                            <button className='btn btn-outline-warning' disabled={auth?.user?.isTeacher == true} onClick={editUser}>EDIT</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default UserProfile;