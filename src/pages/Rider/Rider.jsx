import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);

  const regions = [...new Set(regionsDuplicate)];
  // explore useMemo useCallback
  const region = useWatch({ control, name: "region" });
  const districtsByRegion = (region) => {
        const regionDistricts =  serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }



  const handleRiderApplication = (data) => {
    console.log("from parcel", data);
    axiosSecure.post('/riders', data)
    .then(res => {
        if(res.data.insertedId){
            Swal.fire({
                title: "Rider Added Succe!",
                text: "Your Application has been submitted.",
                icon: "success",
                timer: 2500,
                showCancelButton: false,
    });
        }
    })
  }


  return (
    <div>
      <h1 className="text-4xl text-secondary">Be a Rider</h1>
      <form
        onSubmit={handleSubmit(handleRiderApplication)}
        className="mt-12 p-4 text-black"
      >
       

      
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* rider Details */}

          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Rider Details</h4>
            {/* rider name */}
            <label className="label">Rider Name</label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input w-full"
              placeholder="Rider Name"
            />

            {/* rider email */}
            <label className="label">Email</label>
            <input
              type="text"
              {...register("email")}
              defaultValue={user?.email}
              className="input w-full"
              placeholder="rider Email"
            />

            {/* rider region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Region</legend>
              <select
                {...register("region")}
                defaultValue="Pick a region"
                className="select"
              >
                <option>Rider Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* rider districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Districts</legend>
              <select
                {...register("district")}
                defaultValue="Pick a district"
                className="select"
              >
                <option>District</option>
                {districtsByRegion(region).map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* rider address */}
            <label className="label mt-4">Your Address</label>
            <input
              type="text"
              {...register("address")}
              className="input w-full"
              placeholder="Address"
            />
          </fieldset>


          {/* more Details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">More Info</h4>
            {/* Rider name */}
            <label className="label">license</label>
            <input
              type="text"
              {...register("license")}
              className="input w-full"
              placeholder="License No#"
            />

            {/* Rider email */}
            <label className="label">Bike</label>
            <input
              type="text"
              {...register("bike")}
              className="input w-full"
              placeholder="Bike"
            />

           
            {/* Rider address */}
            <label className="label mt-4">NID</label>
            <input
              type="text"
              {...register("nid")}
              className="input w-full"
              placeholder="NID"
            />
          </fieldset>
        </div>
        <input
          type="submit"
          className="btn btn-primary mt-8 text-black"
          value="Send Parcel"
        />
      </form>
    </div>
  );
};

export default Rider;
