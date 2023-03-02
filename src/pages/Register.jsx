import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuth } from '../context/auth';

function Register(props) {
    // hooks
    const [auth, setAuth] = useAuth();
    // state
    const [last_name, setLastName] = useState('')
    const [name, setName] = useState('')
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [isTeacher,setIsTeacher] = useState('false')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!status) {
            toast.error('Statusingini belgilang !!!');
            return;
        } else {
            let { data } = await axios.post("/register", { name, lastName: last_name, login, password, status, isTeacher });
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success("Sign Up");
                localStorage.setItem('user', JSON.stringify(data.userCreated));
                localStorage.setItem('token', JSON.stringify(data.access_token));
                setAuth({
                    user: data.userCreated,
                    token: data.access_token
                })
                navigate('/')
            }
        }

    }
    return (
        <div className='row p-4'>
            <div className="col-md-12 col-12 mt-4 ">
                <form className='p-3' onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control form-control-lg mt-2"
                        type="text" placeholder="ISM"
                        aria-label="ISM"
                    />
                    <input
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-control form-control-lg mt-2"
                        type="text" placeholder="FAMILIYA"
                        aria-label="FAMILIYA"
                    />
                    <input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="form-control form-control-lg mt-2"
                        type="text" placeholder="LOGIN"
                        aria-label="LOGIN"
                    />
                    {
                        status == 'teacher' &&
                    <input
                        value={isTeacher}
                        onChange={(e) => setIsTeacher(e.target.value)}
                        className="form-control form-control-lg mt-2"
                        type="text" placeholder="FAN NOMI"
                        aria-label="LOGIN"
                    />
                    }
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control form-control-lg mt-2" type="password"
                        placeholder="PAROL"
                        aria-label="ISM" />
                    <label htmlFor="teacher" className='mt-2'>O'QITUVCHI</label>
                    {" "}
                    <input type="radio"
                        onChange={(e) => setStatus(e.target.value)}
                        name='status'
                        id='teacher'
                        className="mt-2"
                        value={'teacher'}
                    />
                    {' '}
                    <label htmlFor="student" className='mt-2'>TALABA</label>
                    {" "}
                    <input type="radio"
                        onChange={(e) => setStatus(e.target.value)}
                        name='status'
                        id='student'
                        className="mt-2"
                        value={'student'}
                    />
                    {/* <div className='w-50 m-auto'> */}
                    <button type='submit' className='btn btn-outline-success mt-2 w-100' onClick={handleSubmit}>KIRISH</button>
                    {/* </div> */}
                </form>
            </div>
        </div>
    );
}

export default Register;