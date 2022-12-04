import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import one from "images/one.jpg";
import { Formik, Form } from "formik";
import { FormikControl } from "components/validation";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import useAlert from "components/hooks/useAlert";
import { useEtherum } from "components/hooks/useEtherum";
const LoginPage = () => {
  const initialValues = {
    email: "",
  };
  const { displayAlert } = useAlert();
  const { account } = useEtherum();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from.pathname || "/dashboard";

  const validationSchema = Yup.object({
    email: Yup.string("Enter Employee's Email address")
      .email("Enter a valid email")
      .trim()
      .required("Email is required"),
  });
  const handleSubmit = (values, onSubmitProps) => {
    const { email } = values;
    //eslint-disable-next-line
    return registers?.map((item) => {
      if (item.account === account && item.email === email) {
        displayAlert("success", "Login successful");
        return setTimeout(() => {
          navigate(from, { replace: true });
        }, 5000);
      }
    });
  };
  return (
    <Grid
      item
      container
      flexWrap="nowrap"
      sx={{ height: "100vh", overflow: "hidden" }}
    >
      <Grid item xs={6}>
        <img
          src={one}
          alt=""
          width="100%"
          height="100%"
          style={{ objectFit: "cover" }}
        />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        xs={6}
        sx={{ mt: 3, px: 8, py: 3 }}
      >
        <Grid
          container
          sx={{ flexDirection: "column", justifyContent: "center" }}
        >
          <Typography textAlign="center">Login</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnMount={false}
            onSubmit={handleSubmit}
            validateOnBlur={true}
          >
            {({ isSubmitting }) => {
              return (
                <Form style={{ marginTop: "1rem" }}>
                  <Grid container direction="column" gap={2}>
                    <Grid item container>
                      <FormikControl
                        control="input"
                        label="Employee Email"
                        id="email"
                        name="email"
                        placeholder="Enter Employee Email"
                      />
                    </Grid>

                    <Grid item container>
                      <Button
                        type="submit"
                        sx={{ background: "white", width: "100%" }}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Typography textAlign="center">
                      Dont have an account click{" "}
                      <Typography component={Link} to="/register">
                        here
                      </Typography>
                    </Typography>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
