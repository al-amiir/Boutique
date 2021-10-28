import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { commerce } from "../library/commerce";

// So here we use react hook form to easily get data from our form
// What is logic here ?
// - we have form with some inputs, client should fill those inputs
// - then in commerce.js we decide some countries to available shipping to, each country has subdevisions so options in shipping will different

// - countries > US   Subdevisions  > california   shiping options
//                                  > NYC

//             > Egypt Subdevisions > Alexandria   shiping options
//                                  > Cairo
// When client choose us subdevision change then options change
// When client choose Egypt subdevision change then options change

//------------------------------------------------------------------------------------------
// 1)
// We recive token from checkout component
// By this token we fetching countires in your commerce.js then pass value to shippingCountries
// and we pass one value to shippingCountriey

// 2)
// then we focus on subdevision countries in shippingCountriey
// So Fetching subdevisions
// set all subdevisions fetched in  shippingSubdivisions
// and we pass the first value to shippingSubdivision

// 3)
// Fetching shipping options

// 4)
// in react-hook-form we use onSubmit method to recieve all data from form, search in docs
// We use register to send data to data argument in onSubmit
// So now send data through submitData to Checkout Component
//------------------------------------------------------------------------------------------

const AddressForm = ({ token, submitData }) => {
  const { register, handleSubmit } = useForm();
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  /////////////////////////////////////////////////////////////////////////////////////////
  // 1)
  // Fetching All Countries
  async function fetchAllCountries(passMeToken) {
    let { countries } = await commerce.services.localeListShippingCountries(passMeToken);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }
  // Use Effect for all countries, on render and when token updates
  useEffect(() => {
    fetchAllCountries(token.id);
  }, [token]);
  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////
  // 2)
  // Fetching Subdevisions
  async function fetchAllSubdevisions(passMeToken, country) {
    let { subdivisions } = await commerce.services.localeListShippingSubdivisions(passMeToken, country);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }
  // Use effect for subdevision of first country, on render and when shippingCountry updates
  useEffect(() => {
    if (shippingCountry) fetchAllSubdevisions(token.id, shippingCountry);
  }, [shippingCountry]);
  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////
  // 3)
  // Fetching Options
  async function fetchAllOptions(passMeToken, shippingCountry, shippingSubdivision) {
    let options = await commerce.checkout.getShippingOptions(passMeToken, {
      country: shippingCountry,
      region: shippingSubdivision,
    });
    setShippingOptions(options);
    setShippingOption(options[0].id);
  }
  // Use effect for option of first subdivision
  useEffect(() => {
    if (shippingSubdivision) {
      fetchAllOptions(token.id, shippingCountry, shippingSubdivision);
    }
  }, [shippingSubdivision]);
  /////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* <p className="form_header">Shipping address</p> */}
      <FormProvider {...methods}>
        <form
          className="form_address"
          // 4)
          onSubmit={handleSubmit((data) => {
            submitData({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            });
          })}
        >
          {/* inputs filled by client  */}
          <div className="form_inputs">
            <TextField {...register("firstName", { required: true })} name="firstName" label="First name" />
            <TextField {...register("lastName", { required: true })} name="lastName" label="Last name" />
            <TextField {...register("address1", { required: true })} name="address1" label="Address line 1" />
            <TextField {...register("city", { required: true })} name="city" label="City" />
            <TextField {...register("email", { required: true })} name="email" label="Email" />
            <TextField {...register("zip", { required: true })} name="zip" label="Zip / Postal code" />
          </div>
          {/*  */}

          <div>
            {/* 1 */}
            <Grid>
              <p className="form_select-header">Shipping Country</p>
              <Select className="form_select" value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}>
                {Object.entries(shippingCountries).map(([id, country]) => (
                  <MenuItem key={id} value={id}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*  */}

            {/* 2 */}
            <Grid>
              <p className="form_select-header">Shipping Subdevisions</p>
              <Select className="form_select" value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)}>
                {Object.entries(shippingSubdivisions).map(([key, country]) => (
                  <MenuItem key={key} value={key}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*  */}

            {/* 3 */}
            <Grid>
              <p className="form_select-header">Shipping Options</p>
              <Select className="form_select" value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${option.description}  `}
                    {option.price.formatted_with_symbol}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*  */}
          </div>
          <br />
          <button className="form_submit" type="submit">
            Submit
          </button>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
