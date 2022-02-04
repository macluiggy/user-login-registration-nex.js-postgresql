import { useState } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import auth from "../../lib/auth-helper";
import { remove } from "../../lib/api-user";
import Redirect from "../Redirect";
import { Container } from "../Container";

export default function DeleteUser({ userId }) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const jwt = auth.isAuthenticated();
  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = () => {
    remove({ userId }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Redirect path="/" />;
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteAccount} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
