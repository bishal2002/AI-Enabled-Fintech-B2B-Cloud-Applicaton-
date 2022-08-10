import React, { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Grid from "@mui/material/Grid";
import ActionContext from "../../context/action/ActionContext";
import axios from "axios";

const AddPopup = () => {
  const [value, setValue] = React.useState({
    business_code: "U001",
    cust_number: 200769623,
    clear_date: "2019-03-06",
    buisness_year: "2019",
    doc_id: "1930022122",
    posting_date: "2019-03-06",
    document_create_date: "2019-01-06",
    due_in_date: "2019-03-06",
    invoice_currency: "CAD",
    document_type: "RV",
    posting_id: 1,
    total_open_amount: 19581,
    cust_payment_terms: "SOM4",
    baseline_create_date: "2019-03-06",
    invoice_id: 1930788296,
  });

  const { actionData, setActionData } = useContext(ActionContext);

  const handleChange = (fieldName, e) => {
    setValue({ ...value, [fieldName]: e.target.value });
  };

  const handleSubmit = () => {
    // console.log(value);
    // console.log(
    //   `http://localhost:8080/InvoiceCRUD/add?business_code=${value.business_code}&cust_number=${value.cust_number}&clear_date=${value.clear_date}&buisness_year=${value.buisness_year}&doc_id=${value.doc_id}&posting_date=${value.posting_date}&document_create_date=${value.document_create_date}&due_in_date=${value.due_in_date}&invoice_currency=${value.invoice_currency}&document_type=${value.document_type}&posting_id=${value.posting_id}&total_open_amount=${value.total_open_amount}&baseline_create_date=${value.baseline_create_date}&cust_payment_terms=${value.cust_payment_terms}&invoice_id=${value.invoice_id}`
    // );
    axios
      .get(
        `http://localhost:8080/High/add?business_code=${value.business_code}&cust_number=${value.cust_number}&clear_date=${value.clear_date}&buisness_year=${value.buisness_year}&doc_id=${value.doc_id}&posting_date=${value.posting_date}&document_create_date=${value.document_create_date}&due_in_date=${value.due_in_date}&invoice_currency=${value.invoice_currency}&document_type=${value.document_type}&posting_id=${value.posting_id}&total_open_amount=${value.total_open_amount}&baseline_create_date=${value.baseline_create_date}&cust_payment_terms=${value.cust_payment_terms}&invoice_id=${value.invoice_id}`
      )
      .then((res) => {
        console.log("in then block", res);
        setActionData({ ...actionData, refresh: actionData.refresh + 1 });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>ADD</DialogTitle>
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
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <TextField
                    id="business-code"
                    label="Business Code"
                    variant="filled"
                    value={value.business_code}
                    onChange={(e) => handleChange("business_code", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="cust-number"
                    label="Customer Number"
                    variant="filled"
                    value={value.cust_number}
                    onChange={(e) => handleChange("cust_number", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Clear Date"
                      value={value.clear_date}
                      onChange={(newValue) => {
                        setValue({ clear_date: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="business-year"
                    label="Business Year"
                    variant="filled"
                    value={value.buisness_year}
                    onChange={(e) => handleChange("buisness_year", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="document-id"
                    label="Document Id"
                    variant="filled"
                    value={value.doc_id}
                    onChange={(e) => handleChange("doc_id", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Posting Date"
                      value={value.posting_date}
                      onChange={(newValue) => {
                        setValue({ posting_date: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Document Create Date"
                      value={value.document_create_date}
                      onChange={(newValue) => {
                        setValue({ document_create_date: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Due Date"
                      value={value.due_in_date}
                      onChange={(newValue) => {
                        setValue({ due_in_date: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="invoice-currency"
                    label="Invoice Currency"
                    variant="filled"
                    value={value.invoice_currency}
                    onChange={(e) => handleChange("invoice_currency", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="document-type"
                    label="Document Type"
                    variant="filled"
                    value={value.document_type}
                    onChange={(e) => handleChange("document_type", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="posting-id"
                    label="Posting Id"
                    variant="filled"
                    value={value.posting_id}
                    onChange={(e) => handleChange("posting_id", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="filled-basic"
                    label="Total Open Amount"
                    variant="filled"
                    value={value.total_open_amount}
                    onChange={(e) => handleChange("total_open_amount", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Baseline Create Date"
                      value={value.baseline_create_date}
                      onChange={(newValue) => {
                        setValue({ baseline_create_date: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="customer-payment-terms"
                    label="Custoemr Payment Terms"
                    variant="filled"
                    value={value.cust_payment_terms}
                    onChange={(e) => handleChange("cust_payment_terms", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="invoice-id"
                    label="Invoice Id"
                    variant="filled"
                    value={value.invoice_id}
                    onChange={(e) => handleChange("invoice_id", e)}
                    InputProps={{ disableUnderline: true }}
                  />
                </Grid>
              </Grid>
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
              <Button onClick={handleSubmit}>ADD</Button>
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

export default AddPopup;
