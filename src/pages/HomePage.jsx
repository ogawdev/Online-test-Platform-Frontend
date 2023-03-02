import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';

const HomePage = () => {

    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        loadCategories();
    },[])


    async function loadCategories(){
        let {data} = await axios.get('/category/categories');
        if(data.error){
            toast.error(data.error)
        }else{
            setCategories(data);
        }
    }

    return (
        <div className='row mt-4  p-3 text-center' >
            <div className="col-md-12">
                <div className="row mb-4" style={{ height: '80vh', overflowY: "scroll" }}>
                    {
                        categories.length ? categories?.map((val, idx) => {
                            return (
                                <div className="col-md-6   p-4 mt-2 rounded boxes" key={idx}>
                                    <div className='subjects p-2 rounded w-100'>
                                        <Link className='unstyled' to={'/user/test/' + val._id}>
                                            <button className='btn btn-light w-100'>
                                                {val.name.toUpperCase()}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                        : 
                        <div className='text-center'>
                            <h5>FANLAR HALI KIRITILMAGAN</h5>
                        </div>
                    }
                </div>

            </div>

        </div>
    );
};

export default HomePage;