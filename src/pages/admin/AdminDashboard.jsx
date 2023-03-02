import React from 'react';
import TeacherMenu from '../../components/menu/TeacherMenu';
import { useState } from 'react';
import UsersTable from './UsersTable';

function AdminDashboard(props) {

    const [isTurn,setIsTurn] = useState('users')

    return (
        <div className='row p-3'>
            <TeacherMenu />
            {
                isTurn == 'users' &&
                <UsersTable/> 
            }
        </div>
    );
}

export default AdminDashboard;