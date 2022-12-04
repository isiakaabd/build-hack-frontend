import { FormikControl } from "components/validation";
import { Form, Formik } from "formik";
import { Grid, Button } from "@mui/material";
import useAlert from "components/hooks/useAlert";
import * as Yup from "yup";
import { useEtherum } from "components/hooks/useEtherum";

const Deposit = () => {
  const { displayAlert } = useAlert();
  const validationSchema = Yup.object({
    amount: Yup.number("Enter Amount").required("amount  is required"),
  });
  const { contract } = useEtherum();
  const handleSubmit = async (values) => {
    const { amount } = values;
    try {
      const data = await contract.deposit(amount);
      console.log(data);
    } catch (err) {
      console.log(err);
      displayAlert("error", err.data.message);
    }
  };
  return (
    <Grid item container xs={6} sx={{ margin: "auto", mt: 3 }}>
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
                <Grid item container sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ background: "blue", color: "white", width: "100%" }}
                  >
                    Deposit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default Deposit;
