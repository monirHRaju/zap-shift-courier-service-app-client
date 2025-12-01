import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AssignRider = () => {
    const axiosSecure = useAxiosSecure()

    const {refetch, data: parcels = []} = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')

            return res.data
        }
    })
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
            { parcels.map((parcel, index) => <tr>
              <th>{index + 1}</th>
              <td>{parcel.parcelName}</td>
              <td>{parcel.parcelType}</td>
              <td>{parcel.cost}</td>
              <td>{parcel.senderDistrict}</td>
              <td>{parcel.createdAt}</td>
              <td>
                <button className="btn btn-sm btn-primary text-black">Assign Rider</button>
              </td>
            </tr>)}
            
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRider;
