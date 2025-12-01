import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Parcel = () => {
  const serviceCenters = useLoaderData()
  const regionsDuplicate = serviceCenters.map(c => c.region)
  // remove repeated region name
  // set is used to remove duplicate names from an object

  // const regions = new Set(regionsDuplicate)  //returns object / set
  const regions = [...new Set(regionsDuplicate)]  // returns array
  
  console.log(regions)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  // import user info
  const {user} = useAuth()

  //import axios secure 
  const axiosSecure = useAxiosSecure()



  const senderRegion = watch('senderRegion')
  // const receiverRegion = watch('receiverRegion')
  const receiverRegion =useWatch({control, name: 'receiverRegion'})
  // const senderDistrict = watch('senderDistrict')
 

  const districtsByRegion = region => {
    const regionDistricts = serviceCenters.filter( c => c.region === region )

    const districts = regionDistricts.map(d => d.district)

    return districts
  }
  const handleParcel = (data) => {
    console.log("from parcel", data);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict
    const isDocument = data.parcelType === "document"
    const parcelWeight = parseFloat(data.parcelWeight)

    let cost = 0;
    
    if(isDocument){
      cost = isSameDistrict ? 60 : 80 
    } else {
      if(parcelWeight <= 3){
        cost = isSameDistrict ? 110 : 150
      } else {
        const minCharge = isSameDistrict ? 110 : 150
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40

        cost = minCharge + extraCharge 
      }
    }

    // add cost to data to store in database
    data.cost = cost;
    data.paymentStatus = 'unpaid';


Swal.fire({
  title: `Are you agree with the Cost $ ${cost}?`,
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, I agree!"
}).then((result) => {
  if (result.isConfirmed) {

      //save the parcel info to the database
      axiosSecure.post('/parcels', data)
      .then( res => {
        console.log('after saving parcel', res)
        Swal.fire({
        title: "Parcel Added!",
        text: "Your Parcel has been placed.",
        icon: "success"
      });
      })
      .catch( e => {
        console.log('data save error', e)
      })

      
  }
});

    console.log(cost);
    
  };

  return (
    <div className="my-20">
      <h1 className="text-4xl font-bold text-secondary">Send A Parcel</h1>
      <p className="text-2xl font-semibold text-base-300 my-8">Enter your parcel details</p>

      {/* document section */}
      <form onSubmit={handleSubmit(handleParcel)}>
        <div className="border border-gray-300 w-[500px] p-5">
          {/* doc section */}
          <fieldset className="fieldset flex gap-12">
            <legend className="fieldset-legend">Parcel Type</legend>
            {/* document */}
            <label className="label">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="radio"
                defaultChecked
              />
              Document
            </label>

            {/* non-document */}
            <label className="label">
              <input
                type="radio"
                {...register("parcelType")}
                value="non-document"
                className="radio"
                defaultChecked
              />
              Non-Document
            </label>
            {/* Parcel Name and Weight */}
          </fieldset>

          {/* parcel info sec */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Parcel Information</legend>
            <div className="flex gap-8">
              <div>
                {/* parcel name */}
                <label className="label">Parcel Name</label>
                <input
                  type="text"
                  {...register("parcelName", { required: true })}
                  className="input"
                  placeholder="Parcel Name"
                />
                {errors.parcelName?.type === "required" && (
                  <p className="text-red-500">Parcel Name is required</p>
                )}
              </div>

              <div>
                {/* Weight */}
                <label className="label">Weight</label>
                <input
                  type="number"
                  {...register("parcelWeight", { required: true })}
                  className="input"
                  placeholder="Parcel Weight"
                />
                {errors.parcelWeight?.type === "required" && (
                  <p className="text-red-500">Weight is required</p>
                )}
              </div>
            </div>
          </fieldset>
        </div>

        {/* Form Section */}
        <div className="flex gap-20 my-15">
          {/* Sender Details */}
          <div className="border border-gray-300 w-[500px] p-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Sender Information</legend>
              {/* Sender name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                {...register("senderName", { required: true })}
                className="input"
                placeholder="Sender Name"
              />
              {errors.senderName?.type === "required" && (
                <p className="text-red-500">Sender Name is required</p>
              )}
              
              {/* Sender email*/}
              <label className="label">Sender Email</label>
              <input
                type="text"
                {...register("senderEmail", { required: true })}
                defaultValue={user?.email}
                className="input"
                placeholder="Sender Email"
              />
              {errors.senderEmail?.type === "required" && (
                <p className="text-red-500">Sender Email is required</p>
              )}


              {/* Sender address */}
              <label className="label">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress", { required: true })}
                className="input"
                placeholder="Sender Address"
              />
              {errors.senderAddress?.type === "required" && (
                <p className="text-red-500">Sender Address is required</p>
              )}

              {/* Sender phone */}
              <label className="label">Sender Phone</label>
              <input
                type="text"
                {...register("senderPhone", { required: true })}
                className="input"
                placeholder="Sender Phone"
              />
              {errors.senderPhone?.type === "required" && (
                <p className="text-red-500">Sender Phone is required</p>
              )}

              {/* Sender region */}
              <label className="label">Sender Region</label>
              <select
                defaultValue="Pick a region"
                {...register("senderRegion", { required: true })}
                className="select"
              >
                <option disabled={true} >Pick a region</option>
                {
                  regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                }
              </select>
              
              {errors.senderRegion?.type === "required" && (
                <p className="text-red-500">Region is required</p>
              )}
              
              {/* Sender District */}
              <label className="label">Sender District</label>
              <select
                defaultValue="Pick a District"
                {...register("senderDistrict", { required: true })}
                className="select"
              >
                <option disabled={true} >Pick a District</option>
                {
                  districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                }
              </select>
              
              {errors.senderDistrict?.type === "required" && (
                <p className="text-red-500">District is required</p>
              )}
              

              
              {/* Sender Pickup Instruction*/}
              <label className="label">Pickup Instruction</label>
              
              <textarea
              {...register("senderPickupInstruction")}
              className="textarea" placeholder="Pickup Instruction"></textarea>

            </fieldset>
          </div>

          {/* Receiver Details */}
          <div className="border border-gray-300 w-[500px] p-5">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Receiver Information</legend>
              {/* receiver name */}
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName", { required: true })}
                className="input"
                placeholder="receiver Name"
              />
              {errors.receiverName?.type === "required" && (
                <p className="text-red-500">receiver Name is required</p>
              )}

              {/* receiver address */}
              <label className="label">receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress", { required: true })}
                className="input"
                placeholder="Receiver Address"
              />
              {errors.receiverAddress?.type === "required" && (
                <p className="text-red-500">receiver Address is required</p>
              )}

              {/* receiver phone */}
              <label className="label">Receiver Phone</label>
              <input
                type="text"
                {...register("receiverPhone", { required: true })}
                className="input"
                placeholder="receiver Phone"
              />
              {errors.receiverPhone?.type === "required" && (
                <p className="text-red-500">Receiver Phone is required</p>
              )}

              {/* receiver Region*/}
              <label className="label">Region</label>
              <select
                defaultValue="Pick a Region"
                {...register("receiverRegion", { required: true })}
                className="select"
              >
                <option disabled={true} defaultValue="selected">Select Region</option>
                {
                  regions.map((r, i) => <option key={i}>{r}</option>)
                }
                

              </select>

              
              {errors.receiverDistrict?.type === "required" && (
                <p className="text-red-500">District is required</p>
              )}
              
              {/* receiver District*/}
              <label className="label">District</label>
              <select
                defaultValue="Pick a District"
                {...register("receiverDistrict", { required: true })}
                className="select"
              >
                <option disabled={true} selected>Select District</option>
                {
                  districtsByRegion(receiverRegion).map((r, i) => <option key={i}>{r}</option>)
                }
                

              </select>

              
              {errors.receiverDistrict?.type === "required" && (
                <p className="text-red-500">District is required</p>
              )}
              
              
              {/* receiver delivery Instruction*/}
              <label className="label">Delivery Instruction</label>
              
              <textarea
              {...register("receiverDeliveryInstruction")}
              className="textarea" placeholder="Delivery Instruction"></textarea>

            </fieldset>
          </div>



        </div>
          <button className="btn btn-secondary">Add Parcel</button>
      </form>
    </div>
  );
};

export default Parcel;
