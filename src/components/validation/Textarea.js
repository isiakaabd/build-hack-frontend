import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/utilities";

import { makeStyles } from "@mui/styles";
import { FormLabel, TextField, Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  input: {
    ...theme.typography.input,
  },
  formInput: {
    width: "100%",
    height: "100%",
    fontSize: "1.5rem",
    // padding: ".5rem 1rem",
    border: "none",
    color: theme.palette.common.grey,
    "&:focus": {
      outline: "none",
    },
  },
  textArea: {
    border: "1px solid rgba(0, 0, 0, 0.03)",
    resize: "none",
    height: "100%",
    borderRadius: "0.5rem",
    background: "#fff",
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
    },
  },
}));

const EmptyTextarea = (props) => {
  const { name, value, minRows, onChange, placeholder, onBlur } = props;
  const classes = useStyles();
  return (
    <Grid container>
      <TextField
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        multiline
        minRows={minRows ? minRows : 5}
        placeholder={placeholder}
        style={{ height: "100%" }}
        className={`${classes.formInput} ${classes.textArea}`}
      />

      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

const Textarea = ({ label, name, fLabel, placeholder, ...rest }) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        gap={1}
        sx={{ height: "100% !important" }}
      >
        {!fLabel ? (
          <FormLabel component="legend" className={classes.FormLabel}>
            {label}
          </FormLabel>
        ) : null}
        <Field
          id={name}
          name={name}
          as={EmptyTextarea}
          placeholder={placeholder}
          {...rest}
        />
      </Grid>
    </>
  );
};

export default Textarea;
