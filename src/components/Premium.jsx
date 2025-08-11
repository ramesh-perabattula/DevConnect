import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Premium = () => {

  const [isPremiumUser,setIsPremiumuser]=useState(false);
  const verifyPremiumUser=async(){
    const res=await axios.get(BASE_URL+"/user/premimum/verify",{withCredentials:true});
    if(res.data.isPremium){
        setIsPremiumuser(true);
    }else{
      setIsPremiumuser(false);
    }
  }

  useEffect(()=>{
    isPremiumUser()
  },[])

  const handleBuyPlan=async(type)=>{
    try{
    const order=await axios.post({BASE_URL + "/user/payment/create"},{
      membershipType:type,
    },{},{withCredentials:true})

    const {amount,keyId,orderId}

    const options = {
        key: order.KeyId, // Replace with your Razorpay key_id
        amount:amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'DevConnect',
        description: 'meet the devlelopers',
        order_id:order.id, // This is the order_id created in the backend
        prefill: {
          name: order.notes.firstName+" "+order.notes.lastName,
          email: order.notes.email,
        },
        theme: {
          color: '#F37254'
        },
        handler:verifyPremiumUser,
      };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }catch(err){
    console.log(err.message);
  }
  }



  return (
    isPremium ? "you are alraedy a premium user":<div className='m-10'>
        <div className="flex w-full flex-col lg:flex-row">
  <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
    <button className='border btn btn-primary pointer cursor'onClick={handleBuyPlan('silver')}>silver account</button>
  </div>
  <div className="divider lg:divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-32 grow place-items-center">
    <button className='border btn btn-secondary' onClick={handleBuyPlan('gold')}>gold account</button>
  </div>
</div>
    </div>
 )

export default Premium