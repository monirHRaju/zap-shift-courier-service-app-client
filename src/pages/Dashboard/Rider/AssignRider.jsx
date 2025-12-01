import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignRider = () => {
    const [selectedParcel, setSelectedParcel] = useState(null)
    const axiosSecure = useAxiosSecure()
    const riderModalRef = useRef()
    



   
    const {data: parcels = []} = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')

            return res.data
        }
    })

    const {data : riders = []} = useQuery({
        queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
        enabled: !!selectedParcel,
        queryFn: async() => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`)
            return res.data
        } 
    })
    
    const openRiderAssignModal = parcel => {
        setSelectedParcel(parcel)
        
        riderModalRef.current.showModal()
    }
    
  return (
    <div>
      <h1 className="text text-4xl">Assign Riders: {parcels.length}</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Pickup District</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { parcels.map((parcel, index) => <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td>{parcel.parcelName}</td>
              <td>{parcel.parcelType}</td>
              <td>{parcel.cost}</td>
              <td>{parcel.senderDistrict}</td>
              <td>{parcel.createdAt}</td>
              <td>
                <button onClick={()=> openRiderAssignModal(parcel)} className="btn btn-sm btn-primary text-black">Assign Rider</button>
              </td>
            </tr>)}
            
            
          </tbody>
        </table>
      </div>

      
      {/* Open the modal using document.getElementById('ID').showModal() method */}
        {/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
        <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Available Riders: {riders.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riders.map((rider, index) => (
                      <tr key={rider._id}>
                        <th>{index + 1}</th>
                        <td>{rider.name}</td>
                        <td>{rider.email}</td>
                        <td>
                          <button
                            
                            className="btn btn-sm btn-primary text-black"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  );
};

export default AssignRider;
