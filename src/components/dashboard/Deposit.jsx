import { FormikControl } from "components/validation";
import { Form, Formik } from "formik";
import { Grid, Button, Paper } from "@mui/material";
import useAlert from "components/hooks/useAlert";
import * as Yup from "yup";
import { useEtherum } from "components/hooks/useEtherum";
import { CustomButton } from "components/utilities";

const Deposit = () => {
  const { displayAlert } = useAlert();
  const validationSchema = Yup.object({
    amount: Yup.number("Enter Amount").required("amount  is required"),
  });
  const buttonType = {
    background: "#3E5EA9",
    hover: "#3E5EA9",
    active: "#3E5EA9",
  };
  const { contract } = useEtherum();
  const handleSubmit = async (values) => {
    const { amount } = values;
    try {
      await contract.deposit(amount);

      displayAlert("success", "Deposit Successful");
    } catch (err) {
      console.log(err);
      displayAlert("error", err.data.message);
    }
  };
  return (
    <Grid item container xs={8} sx={{ margin: "auto", mt: 3 }}>
      <Paper sx={{ p: 5, width: "100%" }}>
        <Formik
          initialValues={{
            amount: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
          enableReinitialize
        >
          {({ isSubmitting }) => {
            return (
              <Form style={{ marginTop: "1rem", width: "100%" }}>
                <Grid container direction="column">
                  <Grid item container>
                    <FormikControl
                      control="input"
                      label="Amount"
                      id="amount"
                      name="amount"
                      placeholder="Enter Amount"
                    />
                  </Grid>
                  <Grid item container sx={{ mt: 4 }} justifyContent="center">
                    <CustomButton
                      type={buttonType}
                      title="Deposit"
                      width="20rem"
                      textColor={"#fff"}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Deposit;
