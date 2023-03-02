import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

function UsersTable(props) {

    const [isAllowed, setIsAllowed] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        try {
            let { data } = await axios.get("/user/admin/get-users");
            if (data.error) {
                toast.error(data.error);
            } else {
                setUsers(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {
        if (window.confirm('Are you sure to delete?')) {
            let { data } = await axios.delete(`/user/admin/user-delete/${id}`);
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success('Muvaffaqiyatli bajarildi')
                loadUsers();
            }
        }

    }
    const editItem = async (id, isAllowed) => {
        if (window.confirm('Are you sure to edit?')) {
            let { data } = await axios.put(`/user/admin/user-edit/${id}`, { isAllowed });
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success('Muvaffaqiyatli bajarildi');
                console.log(data);
                loadUsers();
            }
        }

    }


    return (
        <div className='col-md-8 table_srcoll'>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ISM</th>
                        <th scope="col">FAMILIYA</th>
                        <th scope="col">TELEFON</th>
                        <th scope="col">FAN</th>
                        <th scope="col">RUXSAT</th>
                        <th scope="col">SOZLASH</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((val, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{idx + 1}</th>
                                    <td>{val?.name}</td>
                                    <td>{val?.lastName}</td>
                                    <td>{val?.number}</td>
                                    <td>
                                        {val?.isTeacher == 'false' ? 'talaba' : val?.isTeacher}
                                        </td>
                                    <td>
                                        {val.isAllowed ? 'Ruxsat etilgan' : 'Man etilgan'}
                                    </td>
                                    <td className=''>
                                        {val.isAllowed ?
                                            <button className='btn btn-outline-warning mx-2' onClick={() => editItem(val._id, false)}>Ruxsatni olish</button>
                                            :
                                            <button className='btn btn-outline-warning mx-2' onClick={() => editItem(val._id,true)}>Ruxsatni berish</button> 

                                   }

                                        <button className='btn btn-outline-danger ' onClick={() => deleteItem(val._id)}>O`CHIRISH</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div >
    );
}

export default UsersTable;