import React, { useContext, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import ActionContext from "../../context/action/ActionContext";
import AdvancedSearchContext from "../../context/advanced-search/AdvancedSearchContext";

const ViewSelect = () => {
  const [fieldValues, setFieldValues] = useState({
    document_id: "",
    invoice_id: "",
    customer_number: "",
    business_year: "",
  });
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { actionData, setActionData } = useContext(ActionContext);
  const { setAdvancedSearchValue } = useContext(AdvancedSearchContext);

  const handleChangeFields = (fieldName, e) => {
    setFieldValues({ ...fieldValues, [fieldName]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("advanced search value fileds to submit", fieldValues);
    setAdvancedSearchValue(fieldValues);
    handleClose();
  };

  const handleRefresh = () => {
    // setAdvancedSearchValue({
    //   document_id: "",
    //   invoice_id: "",
    //   customer_number: "",
    //   business_year: "",
    // });
    setActionData({ ...actionData, refresh: actionData.refresh + 1 });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ToggleButtonGroup
        color="standard"
        value={alignment}
        exclusive
        onChange={handleChange}
        sx={{ color: "#ffffff" }}
      >
        <ToggleButton value="predict">Predict</ToggleButton>
        <ToggleButton value="analytics-view">analytics view</ToggleButton>
        <ToggleButton value="advance-search" onClick={handleClickOpen}>
          advanced search
        </ToggleButton>
        <ToggleButton value="refresh" onClick={handleRefresh}>
          <RefreshIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Advanced Search</DialogTitle>
        <DialogContent>
          <div className="advance-search-popup">
            <Grid container spacing={1}>
              <Grid item md={6}>
                <TextField
                  id="document_id"
                  label="Document Id"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  value={fieldValues.document_id}
                  onChange={(e) => {
                    handleChangeFields("document_id", e);
                  }}
                />
              </Grid>
              <Grid item md={6}>
                {" "}
                <TextField
                  id="invoice_id"
                  label="Invoice ID"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  value={fieldValues.invoice_id}
                  onChange={(e) => {
                    handleChangeFields("invoice_id", e);
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  id="customer_number"
                  label="Customer Number"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  value={fieldValues.customer_number}
                  onChange={(e) => {
                    handleChangeFields("customer_number", e);
                  }}
                />
              </Grid>
              <Grid item md={6}>
                {" "}
                <TextField
                  id="business_year"
                  label="Business Year"
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  value={fieldValues.business_year}
                  onChange={(e) => {
                    handleChangeFields("business_year", e);
                  }}
                />
              </Grid>
            </Grid>
          </div>
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
              <Button onClick={handleSubmit}>Search</Button>
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
    </>
  );
};

export default ViewSelect;
