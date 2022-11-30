import React from "react";
import { Field, ErrorMessage } from "formik";
import { TextError } from "components/utilities";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { FormLabel, Grid, TextField } from "@mui/material";

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
    // color: theme.palette.common.grey,
    "&:focus": {
      outline: "none",
    },
  },
  textArea: {
    border: "1px solid rgba(0, 0, 0, 0.03)",
    resize: "none",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255)",
    borderRadius: "0.5rem",
  },
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
      color: "#fff",
    },
  },
}));

const EmptyTextarea = (props) => {
  const { name, value, minRows, onChange, placeholder, onBlur } = props;
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <TextField
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          multiline
          minRows={minRows ? minRows : 5}
          placeholder={placeholder}
          style={{ height: "100%", width: "100%" }}
          className={`${classes.formInput} ${classes.textArea}`}
        />
      </Grid>
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};
EmptyTextarea.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  minRows: PropTypes.number,
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
Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  fLabel: PropTypes.bool,
};

export default Textarea;
