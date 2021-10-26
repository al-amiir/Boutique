import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// Here if we had error, back to home
// else, if we get order.customer, meaning that order is loaded display Done
// else display Loading untill it loads

let Confirmation = ({ errorMessage, order, finished }) => {
  return <div>{order.customer ? "Done" : finished ? "Thanks" : <CircularProgress />}</div>;
};

export default Confirmation;
