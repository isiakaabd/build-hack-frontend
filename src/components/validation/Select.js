import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Field, ErrorMessage } from "formik";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  FormControl,
  Typography,
  FormLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

import { TextError } from "components/utilities";

const useStyles = makeStyles((theme) => ({
  FormLabel: {
    "&.MuiFormLabel-root": {
      ...theme.typography.FormLabel,
      color: "#fff",
    },
  },
  select: {
    "&.MuiOutlinedInput-root": {
      fontWeight: "200 !important",
      color: "#000 !important",
      backgroundColor: "#fff",
      height: ({ height }) => `${height}`,
      fontSize: "14px !important",
      borderRadius: "8px",
      border: "1px solid #E0E0E0 !important",

      "&:disabled": {
        backgroundColor: "#E0E0E0 !important",
      },

      "&>fieldset": {
        border: 0,
      },
    },

    "&.MuiTypography-root": {
      fontWeight: "200 !important",
      color: `${theme.palette.common.grey} !important`,
      minHeight: 50,
      fontSize: "14px !important",
      borderRadius: "12px",
    },
  },
}));

export const Formiks = ({
  value,
  name,
  onChange,
  onBlur,
  children,
  variant = "small",
}) => {
  const height = variant === "small" ? "40px" : "50px";
  const props = {
    height: height,
  };
  const classes = useStyles(props);
  return (
    <FormControl fullWidth>
      <Select
        name={name}
        displayEmpty
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        className={classes.select}
        IconComponent={() => (
          <KeyboardArrowDownIcon
            fontSize="large"
            sx={{ marginRight: "1rem" }}
          />
        )}
      >
        {children}
      </Select>
    </FormControl>
  );
};

Formiks.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  variant: PropTypes.oneOf(["small", "medium"]),
};

export const FromikSelect = ({
  value,
  name,
  onChange,
  onBlur,
  children,
  variant = "medium",
}) => {
  const height = variant === "small" ? "40px" : "50px";
  const props = {
    height: height,
  };
  const classes = useStyles(props);
  return (
    <FormControl fullWidth>
      <Select
        name={name}
        displayEmpty
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        className={classes.select}
        IconComponent={() => (
          <KeyboardArrowDownIcon
            fontSize="large"
            sx={{ marginRight: "1rem" }}
          />
        )}
      >
        {children}
      </Select>
    </FormControl>
  );
};

FromikSelect.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  variant: PropTypes.oneOf(["small", "medium"]),
};

const Selects = (props) => {
  const { name, label, options, ...rest } = props;
  const classes = useStyles();
  return (
    <Grid container direction="column" gap={1}>
      <FormLabel className={classes.FormLabel}>{label}</FormLabel>
      <Field name={name} as={FromikSelect} label={label} {...rest}>
        {options.map((option) => (
          <MenuItem
            key={option.key}
            value={option.value}
            style={{ fontSize: "1.4rem", fontWeight: "400" }}
          >
            {option.key}
          </MenuItem>
        ))}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </Grid>
  );
};

Selects.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export const CustomSelect = (props) => {
  const {
    value,
    options,
    name,
    onChange,
    onBlur,
    placeholder,
    label,
    onClickClearBtn,
    hasClearBtn,
    disabled = false,
    defaultValue,
    variant = "small",
    ...rest
  } = props;

  const height = variant === "small" ? "48px" : "60px";
  const styleProps = {
    height: height,
  };
  const classes = useStyles(styleProps);
  return (
    <Grid container direction="column">
      {label && <FormLabel className={classes.FormLabel}>{label}</FormLabel>}
      <Grid item container direction="column" sx={{ position: "relative" }}>
        <FormControl fullWidth>
          <Select
            name={name}
            displayEmpty
            onBlur={onBlur}
            disabled={disabled}
            value={value}
            onChange={onChange}
            className={classes.select}
            defaultValue={defaultValue}
            {...rest}
          >
            <MenuItem value="">
              <Typography>{placeholder}</Typography>
            </MenuItem>
            {options.map((option) => (
              <MenuItem
                key={option.key}
                value={option.value}
                style={{ fontSize: "1.4rem", fontWeight: "400" }}
              >
                {option.key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};
CustomSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.func,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClickClearBtn: PropTypes.func,
  hasClearBtn: PropTypes.bool,
  variant: PropTypes.oneOf(["small", "medium"]),
};

export default Selects;
