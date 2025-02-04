import React from 'react'
import { useState, useEffect } from 'react';
import Card from './components/Card';
export default function OnlineDelivery() {




    const [data, setdata] = useState([]);





    const fetchrestuarant = async () => {
        const response = await fetch("/data/restaurantChains.json");
        const apidata = await response.json();
        setdata(apidata)
    }


    useEffect(() => {
        fetchrestuarant();
    })

    return (
        <div className='max-w-[1200px] mx-auto mb-[100px]'>
            <div className='flex my-5 items-center justify-between'>
                <div className='text-[25px] font-bold '>
                    Restaurants with online food delivery in Srinagar
                </div>

            </div>
            <div className=' grid grid-cols-2 md:grid-cols-4 gap-3'>
                {
                    data.map((d, i) => {
                        return(
                        <Card  {...d} key={i} />
                        )

                    })
                }

            </div>
        </div>
    )
}
