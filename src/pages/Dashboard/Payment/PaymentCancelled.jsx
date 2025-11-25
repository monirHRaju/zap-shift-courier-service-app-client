import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-3xl font-bold text-secondary'>Payment Cancelled</h2>
            <Link to={'/my-parcels'}>Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;