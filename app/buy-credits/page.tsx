'use client'
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { PayPalButtons } from '@paypal/react-paypal-js';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function BuyCredits() {

    const Options = [
        {
            id: 1,
            price: 1.99,
            credits: 10
        },
        {
            id: 2,
            price: 4.99,
            credits: 50
        },
        {
            id: 3,
            price: 9.99,
            credits: 100
        },
        {
            id: 4,
            price: 19.99,
            credits: 200
        }
    ]

    const [selectedOption, setSelectedOption] = useState<number>(0);
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router  = useRouter();
    const notify = ( msg:string ) => toast(msg);
    const notifyError = ( msg:string ) => toast.error(msg);
    
    useEffect(()=>{
        if(selectedOption!=0){
            const price = Options[selectedOption-1].price
            console.log(price);
            setSelectedPrice(price);
        }
    },[selectedOption])

    const onPaymentSuccess = async() => {

        const result = await db.update(Users).set({
            credit: Options[selectedOption].credits + userDetail.credits
        }).where(eq(Users.userEmail, userDetail.userEmail));

        if(result){
            notify('Credit is Added')
            setUserDetail((prev:any) => ({
                ...prev,
                ['credit']:Options[selectedOption].credits + userDetail.credits
            }))
            router.replace('/dashboard');
        }else{
            notifyError('Server Error')
        }

    }

  return (

    <div className='min-h-screen text-center p-10 md:px-20 lg:px-40'>

        <h2 className='text-4xl font-bold text-primary'>
            Add More Credits
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center'>

            <div>

                {
                    Options.map((option, index) => (

                        <div 
                            className={`p-5 mt-10 my-5 border text-center rounded-lg shadow-md bg-primary/40 hover:scale-110 transition-all hover:border-red-500 ${selectedOption==option.id && 'bg-primary/70 border-green-600'}`} 
                            onClick={() => setSelectedOption(option.id)}>

                                <h3 className='text-2xl font-bold'>{option.price} USD</h3>
                                <p className='text-gray-600'>{option.credits} Credits</p>
                                <button className='py-3 px-8 text-white bg-primary rounded-md hover:bg-primary-dark'>Buy Now</button>

                        </div>
                    ))
                }
            </div>

            <div>

                {
                    selectedPrice>0 && <PayPalButtons 
                        style={{ layout: "vertical" }} 
                        disabled={!selectedOption || selectedOption==0} 
                        // @ts-ignore
                        onApprove={() => onPaymentSuccess()}
                        onCancel={() => notifyError('Payment Canceled')}
                        createOrder={(data, action) => {
                            // @ts-ignore
                            return action.order.create({
                                purchase_units:[
                                    {
                                        amount:{
                                            value: selectedPrice.toFixed(2),
                                            currency_code: 'USD'
                                        }
                                    }
                                ]
                            })
                        }}
                    />
                }

            </div>

        </div>

    </div>

  )

}

export default BuyCredits;
