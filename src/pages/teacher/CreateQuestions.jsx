import React, { useState } from 'react';
import { useEffect } from 'react';
import TeacherMenu from '../../components/menu/TeacherMenu';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';

function CreateQuestions(props) {
    const [auth, setAuth] = useAuth();


    const [massiv, setMassiv] = useState([]);

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [title1, setTitle1] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        let { data } = await axios.get('/category/categories');
        if (data.error) {
            toast.error(data.error)
        } else {
            setCategories(data);
        }
    }


    const [title, setTitle] = useState('');
    const [test1, setTest1] = useState({ qiymat: '', isTrue: false });
    const [test2, setTest2] = useState({ qiymat: '', isTrue: false });
    const [test3, setTest3] = useState({ qiymat: '', isTrue: false });
    const [son, setSon] = useState(1);

    const handleCheck = (callBack, value) => {
        setTest1({ ...test1, isTrue: false });
        setTest2({ ...test2, isTrue: false });
        setTest3({ ...test3, isTrue: false });
        callBack({ ...value, isTrue: !value.isTrue });

    }
    const handleValue = (e, callBack, value) => {
        callBack({ ...value, qiymat: e.target.value });
    }

    function handleSubmitAdd(e) {
        e.preventDefault();
        if (category == '' || title1 == '') {
            toast.error('Savol va Kategoriyani tanlang')
        } else {
            if (!test1.isTrue && !test2.isTrue && !test3.isTrue) {
                toast.error('To`g`ri javobni belgilang');
                return;
            } else {
                if (son == 1) {
                    if (test1.qiymat == '' || test2.qiymat == '' || test3.qiymat == '') {
                        toast.error("Savolni kiriting");
                        return;
                    }
                    if (window.confirm('Matn va kategoriya to`g`rimi?')) {
                        let massiv1 = { cat: category, title, tests: [...massiv, { savol: title1, variantlar: [test1, test2, test3] }] }
                        localStorage.setItem('questions', JSON.stringify(massiv1));
                        let massiv2 = JSON.parse(localStorage.getItem('questions'));
                        setMassiv(massiv2.tests)
                        setTest1({ qiymat: '', isTrue: false })
                        setTest2({ qiymat: '', isTrue: false })
                        setTest3({ qiymat: '', isTrue: false })
                        setTitle1('')
                        setSon(son + 1);
                    }
                } else {
                    if (test1.qiymat == '' || test2.qiymat == '' || test3.qiymat == '') {
                        toast.error("Savolni kiriting");
                        return;
                    }
                    let massiv1 = { cat: category, title, tests: [...massiv, { savol: title1, variantlar: [test1, test2, test3] }] }
                    localStorage.setItem('questions', JSON.stringify(massiv1));
                    let massiv2 = JSON.parse(localStorage.getItem('questions'));
                    setMassiv(massiv2.tests)
                    setTest1({ qiymat: '', isTrue: false })
                    setTest2({ qiymat: '', isTrue: false })
                    setTest3({ qiymat: '', isTrue: false })
                    setTitle1('')
                    setSon(son + 1);
                }
            }
        }


    }

    async function handleSubmit() {
        let massivNew = JSON.parse(localStorage.getItem('questions'));
        let { data } = await axios.post('/question/add-questions', { questions: massivNew });
        if (data.error) {
            toast.error('Xatolik, qaytadan urinib ko`ring')
        } else {
            toast.success(`Muvaffaqiyatli qo'shildi`);
            localStorage.removeItem('questions');
            setTitle('');
            setSon(1);
            setMassiv([]);
        }
    }


    return (
        <div className='row p-3'>
            <TeacherMenu />
            <div className="col-md-9">
                <form onSubmit={handleSubmitAdd}>
                    <div className="form-floating mt-2">
                        <select className="form-select" disabled={son > 1} id="floatingSelect" aria-label="FAN KATEGORIYASI" onChange={(e) => setCategory(e.target.value)}>
                            <option defaultValue={1}>FANNI TANLANG</option>
                            {
                                categories?.map((val, idx) => {
                                    return (
                                        <option value={val._id} key={idx} disabled={auth?.user?.isTeacher !== val.name}>{val.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="floatingSelect">MUTAXASISLIKDAGI FAN</label>
                    </div>
                    <textarea className='form-control mt-2' disabled={son > 1} placeholder='Savol matni' value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                    <textarea className='form-control mt-2' disabled={son == 4} placeholder={`${son} savol`} value={title1} onChange={(e) => setTitle1(e.target.value)}></textarea>

                    <div className='input-group mb-3 mt-3'>
                        <div className='input-group-text'>
                            <input type="radio" checked={test1.isTrue} disabled={son == 4} name="test" value={test1.isTrue} onChange={() => handleCheck(setTest1, test1)} className="form-check-input" />
                        </div>
                        <input type="text" className='form-control' disabled={son == 4} placeholder='Birinchi javob' value={test1.qiymat} onChange={(e) => handleValue(e, setTest1, test1)} />
                    </div>
                    <div className='input-group mb-3 mt-3'>
                        <div className='input-group-text'>
                            <input type="radio" checked={test2.isTrue} disabled={son == 4} name="test" value={test2.isTrue} onChange={() => handleCheck(setTest2, test2)} className="form-check-input" />
                        </div>
                        <input type="text" className='form-control' disabled={son == 4} placeholder='Ikkinchi javob' value={test2.qiymat} onChange={(e) => handleValue(e, setTest2, test2)} />
                    </div>
                    <div className='input-group mb-3 mt-3'>
                        <div className='input-group-text'>
                            <input type="radio" checked={test3.isTrue} disabled={son == 4} name="test" value={test3.isTrue} onChange={() => handleCheck(setTest3, test3)} className="form-check-input" />
                        </div>
                        <input type="text" className='form-control' disabled={son == 4} placeholder='Uchunchi javob' value={test3.qiymat} onChange={(e) => handleValue(e, setTest3, test3)} />
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-outline-danger' onClick={handleSubmitAdd} disabled={son > 3}>KEYINGISI</button>
                    </div>
                </form>
                <button className='btn btn-outline-danger' onClick={handleSubmit} disabled={son < 4 || auth?.user?.isAllowed != true}>QO`SHISH</button>
            </div>
        </div>
    );
}

export default CreateQuestions;