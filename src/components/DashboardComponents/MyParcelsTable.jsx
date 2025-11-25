import React from 'react';


const MyParcelsTable = ({parcel}) => {


    return (
        <tr key={parcel._id}>
                <th>{1}</th>
                <td>{parcel.parcelName}</td>
                <td>{"25"}</td>
                <td>{parcel.deliveryDistrict}</td>
                <td>data</td>
                <td>
                  <button className="btn btn-square">Delete</button>
                </td>
            </tr>
    );
};

export default MyParcelsTable;