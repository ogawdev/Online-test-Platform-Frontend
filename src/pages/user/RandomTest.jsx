import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';

function RandomTest(props) {
    const [auth, setAuth] = useAuth();

    // states

    const [rating, setRating] = useState({ parentId: '', ratings: [] });
    const [rating1, setRating1] = useState([]);
    const [test12, setTest12] = useState([]);

    const [ratingStorage, setRatingStorage] = useState([]);

    const [tests1, setTests1] = useState([]);
    const [order, setOrder] = useState(0)
    const [isOpen, setIsOpen] = useState(false)


    // hooks
    const { categoryId } = useParams();

    useEffect(() => {
        loadQuestions();
    }, [])



    async function loadQuestions() {
        let { data } = await axios.get(`/question/get-question/${categoryId}`);
        if (data.error) {
            toast.error(data.error)
        } else {
            setTests1(data)
        }
    }

    const navigate = useNavigate();
    // hard code


    // function
    // unordered array
    const handleNext = () => {
        let checkRate = rating.ratings.filter(s => s.rate == 'true');

        if (checkRate.length == 3) {
            localStorage.setItem('ratings', JSON.stringify({ ratings: [...ratingStorage, { parentId: rating.parentId, rate: 5 }] }));
            setOrder(order + 1);
            setRating({ parentId: '', ratings: [] });
            setRatingStorage(JSON.parse(localStorage.getItem('ratings')).ratings);

        } else if (checkRate.length == 2) {
            localStorage.setItem('ratings', JSON.stringify({ ratings: [...ratingStorage, { parentId: rating.parentId, rate: 4 }] }));
            setOrder(order + 1);
            setRating({ parentId: '', ratings: [] });
            setRatingStorage(JSON.parse(localStorage.getItem('ratings')).ratings);
        } else if (checkRate.length == 1) {
            localStorage.setItem('ratings', JSON.stringify({ ratings: [...ratingStorage, { parentId: rating.parentId, rate: 3 }] }));
            setOrder(order + 1);
            setRating({ parentId: '', ratings: [] });
            setRatingStorage(JSON.parse(localStorage.getItem('ratings')).ratings);
        } else {
            localStorage.setItem('ratings', JSON.stringify({ ratings: [...ratingStorage, { parentId: rating.parentId, rate: 0 }] }));
            setOrder(order + 1);
            setRating({ parentId: '', ratings: [] });
            setRatingStorage(JSON.parse(localStorage.getItem('ratings')).ratings);
        }
        setRating1([]);


    }
    // get Rate
    function result() {
        let { ratings } = JSON.parse(localStorage.getItem('ratings'));
        let box = 0;
        ratings.map((val, idx) => {
            box += parseInt(val.rate)
        })
        let persantege = 10 * 5;
        let result = 100 / (persantege / box)
        setRatingStorage({ rate: result });
        setIsOpen(!isOpen);

    }
    // confirmRate
    async function confirmRate() {
        let rating = 0;
        console.log(ratingStorage.rate);
        if (ratingStorage.rate >= 56 && ratingStorage.rate <= 70) {
            rating = 3
        } else if (ratingStorage.rate >= 71 && ratingStorage.rate <= 85) {
            rating = 4
        } else if (ratingStorage.rate >= 86 && ratingStorage.rate <= 100) {
            rating = 5
        }
        let { data } = await axios.post('/user/confirm-rate', { rate: rating, subjectId: categoryId, number: auth?.user?.number }, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success('Muvaffaqiyatli tasdiqlandi');
        }
        localStorage.removeItem('ratings');
        window.location.reload();
    } 

    return (
        <>
        {
            tests1.length >= 10 ? 
            <div className='row'>
                {
                    auth?.user?.number != 'number' ? order < 10 && order < tests1.length ?
                        tests1.map((val, idx) => {
                            if (idx == order) {
                                return (
                                    <div className="col-md-12" key={idx}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <textarea className='form-control' disabled={true} value={val?.matn}></textarea>
                                            </div>
                                            {
                                                val?.tests?.map((value, indx) => {
                                                    return (
                                                        <div className="col-md-4" key={indx}>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <textarea className='form-control mt-2' disabled={true} value={value.savol}></textarea>
                                                                </div>
                                                                <ul className="list-group mt-2">
                                                                    {
                                                                        value?.variantlar?.map((test, index) => {
                                                                            let abc = ['A', 'B', 'C']
                                                                            return (
                                                                                <li className="list-group-item" key={index}>
                                                                                    {abc[index]} {' '}
                                                                                    <input className="form-check-input me-1" type="radio" disabled={rating1.includes(value._id)} name={value?.savol} value={test?.isTrue} id="firstCheckbox"
                                                                                        onChange={(e) => {
                                                                                            setRating1([...rating1, value._id]);
                                                                                            setTest12([...test12, val?.matn]);
                                                                                            setRating({ parentId: val._id, ratings: [...rating.ratings, { id: value._id, rate: e.target.value }] })
                                                                                        }}
                                                                                    />
                                                                                    <textarea className='form-control form-check-label mt-2' disabled={true} value={test.qiymat} htmlFor="firstCheckbox"></textarea>
                                                                                    {/* <label className="form-control form-check-label" htmlFor="firstChe  ckbox" value={test?.qiymat}></label> */}
                                                                                </li>

                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>

                                )
                            }

                        })
                        :
                        <>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h3 className='text-center'>{!tests1.length ? 'Savollar mavjud emas' : 'Savollar yakunlandi'}</h3>
                                    <button onClick={result} disabled={!tests1.length} className="btn btn-outline-primary">Umumiy natija </button>
                                </div>
                            </div>
                            {
                                isOpen &&
                                <div>
                                    <p>Umumiy natija {ratingStorage.rate} %</p>
                                    <button className='btn btn-outline-danger' onClick={confirmRate}>Tasdiqlash</button>
                                </div>

                            }
                        </>
                        : <>
                            <h3 className='text-center text-black'>Avval telefon nomeringizni kiriting!</h3>
                            <div className='text-center'>
                                <button className='btn btn-outline-danger' onClick={() => navigate('/user/profile')}>KIRITISH</button>
                            </div>
                        </>
                }

                {/* tartib raqamini hisoblab borish */}
                {
                    (order < 10 && auth?.user?.number != 'number') &&
                    <div className="col-md-12 p-3 mb-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className=' p-4 d-flex justify-content-center'>
                                   <p> savol tartibi: {order + 1}/10</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='text-center'>
                                    <button className='btn btn-outline-primary mt-2' onClick={handleNext} disabled={rating?.ratings?.length < 3}>Keyingisi</button>
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>
            :
            <h3 className='text-center'>Savollar to'liq emas</h3>
    }
        </>

    );
}

export default RandomTest;