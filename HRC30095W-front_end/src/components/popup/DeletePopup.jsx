import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import ActionContext from "../../context/action/ActionContext";
import axios from "axios";

const DeletePopup = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { actionData, setActionData } = useContext(ActionContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    const dataToPost = {
      sl_no: actionData.delete.deleteId[0].sl_no,
    };
    console.log("posting data", dataToPost);

    axios
      .get(
        `http://localhost:8080/High/delete?sl_no=${actionData.delete.deleteId[0].sl_no}`
      )
      .then((res) => {
        setLoading(false);
        console.log("in then block", res.data);
        setActionData({ ...actionData, refresh: actionData.refresh + 1 });
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
        variant="outlined"
        onClick={handleClickOpen}
        disabled={!actionData.delete.deleteActive}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Records ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            "Are you sure you want to delete these record[s]?"
          </DialogContentText>
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
              <Button disabled={loading} autoFocus onClick={handleSubmit}>
                Delete
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

export default DeletePopup;
