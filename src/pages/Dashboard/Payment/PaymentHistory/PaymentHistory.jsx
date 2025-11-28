import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

const PaymentHistory = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    
    const {data: payments = []} = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/payments?customerEmail=${user.email}`)

            return res.data
        }
    })
    console.log('user info: ', user)
    return (
    <div>
      <h2 className="text-5xl">All of my payments : {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.parcelName}</td>
                <td>{payment.cost}</td>
                <td>
                  {payment.paymentStatus === "paid" ? (
                    <span className="text-green-400">Paid</span>
                  ) : (
                    // <button onClick={() => handleCheckout(parcel)} className="btn btn-sm btn-primary text-black">Pay</button>

                    <Link
                      to={`/dashboard/payment/${payment._id}`}
                      className="btn btn-sm btn-primary text-black"
                    >
                      Pay
                    </Link>
                  )}
                </td>
                <td>{payment.deliveryStatus}</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square hover:bg-primary mx-2">
                    <FiEdit></FiEdit>
                  </button>
                  <button
                    
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
