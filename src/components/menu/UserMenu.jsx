import React from 'react';
import { Link } from 'react-router-dom';

function UserMenu(props) {
    return (
        <div className="col-md-4 bg-light p-3 ">
            <ul>
                <li className='r_link mt-3 p-2'>
                    <Link to={'/user/profile'}>
                        PROFILE
                    </Link>
                </li>
                <li className='r_link mt-3 p-2'>
                    <Link to={'/user/rating'}>
                        MENING NATIJALARIM
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default UserMenu;