import React from "react";
// import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddPopup from "../popup/AddPopup";
import EditPopup from "../popup/EditPopup";
import DeletePopup from "../popup/DeletePopup";

const ActionButton = () => {
  return (
    <Stack direction="row" spacing={2} className="actionbuttongroup">
      <AddPopup />
      <EditPopup />
      <DeletePopup />
    </Stack>
  );
};

export default ActionButton;
