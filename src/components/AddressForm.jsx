import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
// import FormInput from "./customFormInput";

import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { commerce } from "../library/commerce";

const AddressForm = ({ token, submitData }) => {
  const { register, handleSubmit } = useForm();

  // Recive Token From Checkout Component
  // By this token we fetching countires in your commerce then pass value to shippingCountries
  // and we pass one value to shippingCountriey

  // then we focus on subdevision countries in shippingCountriey
  // So Fetching subdevisions
  // set all subdevisions fetched in  shippingSubdivisions
  // and we pass the first value to shippingSubdivision

  // In form we loop to display all countries
  // when select change country , shippingCountriey will change so subdevisions will also change

  // Fetching shipping options
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  // Fetching All Countries
  async function fetchAllCountries(passMeToken, submitData) {
    let { countries } = await commerce.services.localeListShippingCountries(
      passMeToken
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  // Fetching Subdevisions
  async function fetchAllSubdevisions(passMeToken, country) {
    let { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        passMeToken,
        country
      );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  async function fetchAllOptions(
    passMeToken,
    shippingCountry,
    shippingSubdivision
  ) {
    let options = await commerce.checkout.getShippingOptions(passMeToken, {
      country: shippingCountry,
      region: shippingSubdivision,
    });
    setShippingOptions(options);
    setShippingOption(options[0].id);
  }

  // Use Effect for all countries
  useEffect(() => {
    fetchAllCountries(token.id);
  }, [token]);

  // Use effect for fir subdevision of first country
  useEffect(() => {
    if (shippingCountry) fetchAllSubdevisions(token.id, shippingCountry);
  }, [shippingCountry]);

  // Use effect for fir subdevision of first subdivision
  useEffect(() => {
    if (shippingSubdivision) {
      fetchAllOptions(token.id, shippingCountry, shippingSubdivision);
    }
  }, [shippingSubdivision]);

  return (
    <>
      <p>Shipping address</p>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data) => {
            submitData({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            });
          })}
        >
          <Grid>
            <TextField
              {...register("firstName", { required: true })}
              name="firstName"
              label="First name"
            />
            <TextField
              {...register("lastName", { required: true })}
              name="lastName"
              label="Last name"
            />
            <TextField
              {...register("address1", { required: true })}
              name="address1"
              label="Address line 1"
            />
            <TextField
              {...register("city", { required: true })}
              name="city"
              label="City"
            />

            <TextField
              {...register("email", { required: true })}
              name="email"
              label="Email"
            />
            <TextField
              {...register("zip", { required: true })}
              name="zip"
              label="Zip / Postal code"
            />
          </Grid>
          <div>
            <Grid item xs={12} sm={6}>
              <p>Shipping Country</p>
              <Select
                fullWidth
                value={shippingCountry}
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries).map(([id, country]) => (
                  <MenuItem key={id} value={id}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <p>Shipping Subdevisions</p>
              <Select
                fullWidth
                value={shippingSubdivision}
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {Object.entries(shippingSubdivisions).map(([key, country]) => (
                  <MenuItem key={key} value={key}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <p>Shipping Options</p>
              <Select
                fullWidth
                value={shippingOption}
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions.map((op) => (
                  <MenuItem key={op.id} value={op.id}>
                    {op.description}
                    {op.price.formatted_with_symbol}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
