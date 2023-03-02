import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Modal({ callBack, value, load, detail, setDetail}) {
    const [auth, setAuth] = useAuth();

    const [category1, setCategory1] = useState('');

    async function handleEdit(e) {
        e.preventDefault();
        let { data } = await axios.put('/category/edit-category', { name: detail.name, id: detail._id }, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        if (data.error) {
            toast.error(data.error);
        } else {
            load();
            callBack(!value)
        }

    }
    async function handleDelete(e) {
        e.preventDefault();
       
        let { data } = await axios.post(`/category/delete-category/`,{id:detail?._id}, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        if (data.error) {
            toast.error(data.error);
        } else {
            load();
            callBack(!value)
        }

    }

    return (
        <div className='modal_window' onClick={() => callBack(!value)}>
            <div className="modal_view" onClick={(e) => e.stopPropagation()}>
                <div>
                    <input type="text" value={detail.name} onChange={(e) => setDetail({...detail,name:e.target.value})} className="form-control" />
                    <div className='d-flex justify-content-between mt-2 mb-2 w-100'>
                        <button className='btn btn-outline-danger' disabled={auth?.user?.isAllowed !== true} onClick={handleDelete}>DELETE</button>
                        <button className='btn btn-outline-warning' disabled={auth?.user?.isAllowed !== true} onClick={handleEdit}>EDIT</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;