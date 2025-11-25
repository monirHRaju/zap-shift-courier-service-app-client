import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading/Loading';

const Payment = () => {
    const axiosSecure = useAxiosSecure()
    const {parcelId} = useParams()
    
    //get parcel data using UseQuery
    const {isLoading, data:parcel} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            // console.log(r es.data)
            return res.data
        }
        
    })


    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel?.cost,
            parcelId: parcel?._id,
            senderEmail: parcel?.senderEmail,
            parcelName: parcel?.parcelName
        }
        console.log(paymentInfo.cost);
        
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        console.log(res.data.url);
        
        window.location.href = res.data.url
        
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <h2>Pay Your Bill $. {parcel.cost} for {parcel.parcelName}</h2>
            <p> info: { parcel._id}</p>
            <p> info: { parcel.senderEmail}</p>
            <p> info: { parcel.parcelName}</p>
            <p> info: { parcel.cost}</p>
            <button onClick={() => handlePayment(parcel)} className="btn btn-sm btn-primary text-black">Pay</button>

        </div>
    );
};

export default Payment;