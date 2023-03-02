import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import UserMenu from '../../components/menu/UserMenu';
function MyRating(props) {
    const [auth, setAuth] = useAuth()

    const [name, setName] = useState([]);


    useEffect(() => {
        loadRating();
    }, []);


    const loadRating = async () => {
        let { data } = await axios.get(`/user/get-user/rating`, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        if (data.error) {
            toast.error(data.error)
        } else {
            console.log(data);
            setName(data);
        }
    }



    return (
        <div className="row p-3">
            <UserMenu />
            <div className="col-md-8">
                <div className="row text-black table_scroll  mx-2">
                    {
                     name.length ?  name?.map((val,idx)=>{
                            return(
                                <div className="col-md-12 d-flex mt-2 justify-content-around bg-light p-3 rounded" key={idx}>
                                    <span>{val?.candidat?.name}</span>
                                    <span>{val?.categoryId?.name}</span>
                                    <span>{val?.rating}</span>
                                    <span>{val?.number}</span>
                                    <span>{new Date(val?.createdAt).toDateString()}</span>
                                </div>
                            )
                        })
                        : 
                        "Natija mavjud emas"
                    }
                </div>
            </div>
        </div>

    );
}

export default MyRating;