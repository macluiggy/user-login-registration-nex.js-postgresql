import { useState } from "react";
import {
  Card,
  Typography,
  TextField,
  CardContent,
  CardActions,
  Button,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Error } from "@mui/icons-material";
import Link from "next/link";
import { UserProps, useStyles } from "../../types/signup";
import { create } from "../../lib/api-user";
import { Container } from "../../components/Container";

export default function Signup() {
  const classes = useStyles();
  const [values, setValues] = useState<UserProps>({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      password: values.password || undefined,
      email: values.email || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };
  return (
    <Container title="Sign Up">
      <Card sx={classes.card}>
        <CardContent>
          <Typography variant="h6" sx={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="name"
            sx={classes.textField}
            label="Name"
            onChange={handleChange("name")}
            value={values.name}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            sx={classes.textField}
            label="Email"
            onChange={handleChange("email")}
            value={values.email}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            sx={classes.textField}
            label="Password"
            onChange={handleChange("password")}
            value={values.password}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" sx={classes.error}>
                <Error />
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={classes.cardActions}>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            sx={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open} /**disableBackdropClick={true} */>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link href={"/signin"}>
            <a>
              <Button color="primary" autoFocus variant="contained">
                Sign In
              </Button>
            </a>
          </Link>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
