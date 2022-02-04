import { useState } from "react";
import { signin } from "../../lib/api-auth";
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
import { iUserSignIn } from "../../lib/types";
import { UseStylesProps, useStyles } from "../../types/signin";
import auth from "../../lib/auth-helper";
import Redirect from "../../components/Redirect";
import { Container } from "../../components/Container";
// import Router from "next/router";

export default function Signin() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });
  // const router = useRouter;

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      // console.log(data, "from signin");

      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) return <Redirect path="/" />;

  return (
    <Container title="Sign In">
      <Card sx={classes.card}>
        <CardContent>
          <Typography variant="h6" sx={classes.title}>
            Sign In
          </Typography>
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
    </Container>
  );
}
