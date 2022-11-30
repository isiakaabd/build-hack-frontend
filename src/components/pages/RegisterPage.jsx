import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import one from "images/one.jpg";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FormikControl } from "components/validation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import useAlert from "components/hooks/useAlert";

const RegisterPage = () => {
  const account = localStorage.getItem("account");
  const register = JSON.parse(localStorage.getItem("registers"));
  const [registers, setRegisters] = useState(register || []);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from.pathname || "/login";

  const { displayAlert } = useAlert();
  const initialValues = {
    name: "",
    email: "",
    post: "",
    level: "",
    address: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string("Enter Employee's name")
      .trim()
      .required("Name is required"),
    post: Yup.string("Enter Employee's post")
      .trim()
      .required("post is required"),
    level: Yup.string("Enter Employee's level")
      .trim()
      .required("Level  is required"),
    address: Yup.string("Enter Employee's Address")
      .trim()
      .required("Address  is required"),
    email: Yup.string("Enter Employee's Email address")
      .email("Enter a valid email")
      .trim()
      .required("Email is required"),
  });
  const handleSubmit = (values, onSubmitProps) => {
    try {
      const { name, post, email, level, address } = values;
      const newAcc = {
        name,
        post,
        email,
        level,
        address,
        account,
      };
      setRegisters([...registers, newAcc]);
      onSubmitProps.resetForm();
      displayAlert("success", "Registration successful");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 5000);
    } catch (err) {
      displayAlert("error", err.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("registers", JSON.stringify(registers));
  }, [registers]);
  return (
    <Grid item container flexWrap="nowrap" sx={{ minHeight: "100vh" }}>
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
        <Grid container sx={{ flexDirection: "column" }}>
          <Typography>Register</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnMount={false}
            onSubmit={handleSubmit}
            validateOnBlur={true}
          >
            {({ isSubmitting, errors }) => {
              return (
                <Form style={{ marginTop: "1rem" }}>
                  <Grid container direction="column" gap={2}>
                    <Grid item container>
                      <FormikControl
                        control="input"
                        label="Employee Name"
                        id="name"
                        name="name"
                        placeholder="Enter Employee Name"
                      />
                    </Grid>
                    <Grid item container>
                      <FormikControl
                        control="input"
                        label="Employee Email"
                        id="email"
                        name="email"
                        placeholder="Enter Employee Email"
                      />
                    </Grid>
                    <Grid item container flexWrap="nowrap" gap={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Employee Post"
                          id="post"
                          name="post"
                          placeholder="Enter Employee Post"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Employee Level"
                          id="level"
                          name="level"
                          placeholder="Enter Employee Level"
                        />
                      </Grid>
                    </Grid>
                    <Grid item container>
                      <FormikControl
                        control="textarea"
                        label="Employee Address"
                        id="address"
                        name="address"
                        placeholder="Enter Employee Address"
                      />
                    </Grid>
                    <Grid item container>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        sx={{ background: "white", width: "100%" }}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Typography>
                      Already have an account click{" "}
                      <Typography component={Link} to="/login">
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

export default RegisterPage;