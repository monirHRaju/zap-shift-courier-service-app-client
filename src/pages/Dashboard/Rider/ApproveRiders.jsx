import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");

      return res.data;
    },
  });

  const updateRiderStatus = (rider, applicationStatus, workStatus) => {
    const updateInfo = { applicationStatus: applicationStatus, email: rider.email, workStatus:workStatus };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status set to: ${applicationStatus} `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleApproveRider = (rider) => {
    updateRiderStatus(rider, "approved", "available");
  };
  const handleRejectionRider = (rider) => {
    updateRiderStatus(rider, "rejected", "unavailable")
  }
  return (
    <div>
      <h1 className="text-5xl">Riders Pending For Approval: {riders.length}</h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Region-District</th>
                <th>Application Status</th>
                <th>Work Status</th>
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
                    {rider.region} - {rider.district}
                  </td>
                  <td>
                    {
                        rider.status === "pending"
                        ? <span className="bg-warning p-2">Pending</span>
                        : rider.status === "approved"
                        ? <span className="bg-success p-2">Approved</span>
                        : <span className="bg-error p-2">{rider.status}</span>
                    }
                  </td>
                  <td>{rider.workStatus}</td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                    >
                      <FaEye />
                    </button>
                    
                    <button
                      onClick={() => handleApproveRider(rider)}
                      className="btn btn-success btn-sm"
                    >
                      <FaUserCheck />
                    </button>

                    <button 
                        onClick={() => handleRejectionRider(rider)}
                        className="btn btn-error btn-sm">
                      <IoPersonRemoveSharp></IoPersonRemoveSharp>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveRiders;
