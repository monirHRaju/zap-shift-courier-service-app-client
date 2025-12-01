import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [searchText, setSearchText] = useState()
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchText}`);

      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    //TODO: must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    //TODO: must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} removed from Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-5xl font-semibold">
        Users Management: {users.length}
      </h1>
      <div>
        <div className="my-5">
          <p>Search Text: {searchText}</p>
          <label className="input">
            
            <input type="search" onChange={(e) => {setSearchText(e.target.value)}} className="grow" placeholder="Search users" />
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>User Info</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* user data */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.displayName}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user.role}
                    </span>
                  </td>
                  <td>{user.createdAt}</td>
                  <th>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-error text-white btn-xs"
                      >
                        <FiShieldOff></FiShieldOff>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-info text-white btn-xs"
                      >
                        <FaUserShield></FaUserShield>
                      </button>
                    )}
                    {/* 
                    <button className="btn btn-error text-white btn-xs">
                      <FaTrash></FaTrash>
                    </button> */}
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
