import React, { useState } from 'react';
import TeacherMenu from '../../components/menu/TeacherMenu';
import Modal from '../../components/Modal';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../../context/auth';

function Category(props) {
    const [auth, setAuth] = useAuth();


    const [modal, setModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [detail, setDetail] = useState('');


    useEffect(() => {

        loadCategory();
    }, [])

    const loadCategory = async () => {
        let { data } = await axios.get('/category/categories');
        if (!data.error) {
            setCategories(data)
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        let { data } = await axios.post('/category/new-category', { name: category }, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        if (!data.error) {
            loadCategory();
            setCategory('')
        }
    }

    function handleModal(obj) {
        setDetail(obj);
        setModal(!modal);
    }




    return (
        <div className='row p-3'>
            <TeacherMenu />
            <div className="col-md-8">
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className='form-control'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder='NAME OF SUBJECT'
                        />
                        <div className='text-center'>
                            <button onClick={handleSubmit} className="btn btn-outline-warning m-3" disabled={auth?.user?.isAllowed != true}>FAN QO`SHISH</button>
                        </div>
                    </form>
                </div>
                <div className='categories'>
                    <div className="row p-3">

                        {
                            categories.map((value, idx) => {
                                return (
                                    <div className="col-md-3 text-center  text-dark" key={idx}>
                                        <button className='mt-2 w-100 btn btn-outline-warning' onClick={() => handleModal(value)}>
                                            {value.name}
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* modal */}
                {
                    modal &&
                    <Modal callBack={setModal} value={modal} detail={detail} setDetail={setDetail} load={loadCategory} />
                }
            </div>
        </div>
    );
}

export default Category;