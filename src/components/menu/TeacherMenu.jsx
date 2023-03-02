import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

function TeacherMenu(props) {

    const [auth, setAuth] = useAuth();
    return (
        <div className="col-md-3 bg-light p-3 ">
            <ul>
                <li className='r_link mt-3 p-2'>
                    <Link to={'/teacher/dashboard'}>
                        PROFILE
                    </Link>
                </li>
                <li className='r_link mt-3 p-2'>
                    <Link to={'/teacher/category'}>
                        FAN KATEGORIYASI
                    </Link>
                </li>
                <li className='r_link mt-3 p-2'>
                    <Link to={'/teacher/questions'}>
                        FAN TESTLAR
                    </Link>
                </li>
                {
                    auth?.user?.isAdmin  &&
                    (
                        <li className='r_link mt-3 p-2'>
                            <Link to={'/admin/dashboard'}>
                                UMUMIY BOSHQARUV
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default TeacherMenu;