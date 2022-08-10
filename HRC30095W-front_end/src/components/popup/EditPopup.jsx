import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ActionContext from "../../context/action/ActionContext";
import axios from "axios";

const EditPopup = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const { actionData } = useContext(ActionContext);
  // console.log("edit data from context in edit popup", actionData);

  const [fields, setFields] = useState(null);

  useEffect(() => {
    if (actionData.edit.editData !== null) {
      setFields({
        invoice_currency: actionData.edit.editData[0].invoice_currency,
        cust_payment_terms: actionData.edit.editData[0].cust_payment_terms,
      });
    }
  }, [actionData.edit]);

  const handleChange = (fieldName, e) => {
    setFields({ ...fields, [fieldName]: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    const dataToPost = {
      sl_no: actionData.edit.editData[0].sl_no,
      invoice_currency: fields.invoice_currency,
      cust_payment_terms: fields.cust_payment_terms,
    };
    // console.log("posting data", dataToPost);

    axios
      .get(
        `http://localhost:8080/HRC_Backend/edit?sl_no=${actionData.edit.editData[0].sl_no}&invoice_currency=${fields.invoice_currency}&cust_payment_terms=${fields.cust_payment_terms}`
      )
      .then((res) => {
        setLoading(false);
        // console.log("in then block", res.data);
        handleClose();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        disabled={!actionData.edit.editActive}
        variant="outlined"
        onClick={handleClickOpen}
      >
        EDIT
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EDIT</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="filled-basic"
                label="Invoice Currency"
                variant="filled"
                InputProps={{ disableUnderline: true }}
                value={fields && fields.invoice_currency}
                onChange={(e) => handleChange("invoice_currency", e)}
              />
              <TextField
                id="filled-basic"
                label="Customer Payment Terms"
                variant="filled"
                InputProps={{ disableUnderline: true }}
                value={fields && fields.cust_payment_terms}
                onChange={(e) => handleChange("cust_payment_terms", e)}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid
              item
              md={6}
              sx={{
                textAlign: "center",
                border: "1px solid white",
                borderRadius: "5px",
                padding: "0 !important",
              }}
            >
              <Button disabled={loading} onClick={handleSubmit}>
                Edit
              </Button>
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                textAlign: "center",
                border: "1px solid white",
                borderRadius: "5px",
                padding: "0 !important",
              }}
            >
              <Button onClick={handleClose}>Cancel</Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPopup;
