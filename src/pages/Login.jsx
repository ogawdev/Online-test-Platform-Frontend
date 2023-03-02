import React, { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

function Login(props) {
    // hooks
    const [auth, setAuth] = useAuth();

    // states

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        let { data } = await axios.post("/login", { login, password, status });
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success('SignIn')
            localStorage.setItem('user', JSON.stringify(data.userLoggedIn));
            localStorage.setItem('token', JSON.stringify(data.access_token));
            setAuth({
                user: data.userLoggedIn,
                token: data.access_token
            })
            navigate('/')
        }

    }
    return (
        <div className='row p-4' style={{ marginTop: "10%" }}>
            <div className="col-md-12 col-12 mt-4 ">
                <form className='p-3' onSubmit={handleSubmit}>
                    <input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="form-control form-control-lg mt-2" type="text" placeholder="LOGIN" aria-label="ISM" />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control form-control-lg mt-2" type="password"
                        placeholder="PAROL"
                        aria-label="ISM" />
                    {/* <div className='w-50 m-auto'> */}
                    <button type='submit' className='btn btn-outline-success mt-2 w-100' onClick={handleSubmit}>KIRISH</button>
                    {/* </div> */}
                </form>
            </div>
        </div>
    );
}
export default Login;