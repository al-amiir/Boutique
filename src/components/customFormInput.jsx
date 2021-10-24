import React from "react";

import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        required={required}
        error={isError}
        render={({ field }) => <TextField fullWidth label={label} required />}
      />
    </div>
  );
}

export default FormInput;
