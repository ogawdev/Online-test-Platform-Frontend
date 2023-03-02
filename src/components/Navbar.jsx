import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';

function Navbar(props) {
    const [auth, setAuth] = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid p-3">
                <a className="navbar-brand" href="/">ONLINE TEST</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <span>
                        <ul className="navbar-nav me-auto mb-2 w-100 mb-lg-0 d-flex justify-content-around " >
                            <li className='nav-item'>
                                <NavLink className='nav-link' to={'/'}>
                                    ASOSIY
                                </NavLink>
                            </li>
                            {
                                !auth.user ?
                                    <>
                                        <li className='nav-item'>
                                            <NavLink className='nav-link' to={'/register'}>
                                                REGISTER
                                            </NavLink>
                                        </li>
                                        <li className='nav-item'>
                                            <NavLink className='nav-link' to={'/login'}>
                                                LOGIN
                                            </NavLink>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className="nav-item dropdown navbar-nav">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {
                                                    auth?.user?.name
                                                }
                                            </a>
                                            <ul className="dr_down dropdown-menu" >

                                                <Link to={auth?.user?.status != "student" ? '/teacher/dashboard' : '/user/profile'}>
                                                    <li className="dropdown-item" style={{ cursor: "pointer" }}>
                                                        DASHBOARD
                                                    </li>
                                                </Link>
                                                
                                                <li className="dropdown-item" onClick={() => {
                                                    setAuth('');
                                                    localStorage.removeItem('user');
                                                    localStorage.removeItem('token');
                                                }} style={{ cursor: "pointer" }}>LOGOUT</li>
                                            </ul>
                                        </li>
                                    </>
                            }
                        </ul>
                    </span>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;