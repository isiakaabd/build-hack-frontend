// import { FormikControl } from "components/validation";
import { Form, Formik } from "formik";
import { Grid, Button } from "@mui/material";
import useAlert from "components/hooks/useAlert";
// import * as Yup from "yup";
import { useEtherum } from "components/hooks/useEtherum";

const Withdraw = () => {
  const { displayAlert } = useAlert();

  const { contract, account } = useEtherum();
  const handleSubmit = async (values, onSubmitProps) => {
    try {
      await contract.withdraw(account);
      displayAlert("success", "withdraw successful");
    } catch (err) {
      console.log(err);
      displayAlert("error", err.data.message);
    }
    onSubmitProps.resetForm();
  };
  return (
    <Grid item container xs={6} sx={{ margin: "auto", mt: 3 }}>
      <Formik
        initialValues={{
          amount: "",
        }}
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        validateOnChange={false}
        validateOnMount={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {({ isSubmitting }) => {
          return (
            <Form style={{ marginTop: "1rem", width: "100%" }}>
              <Grid container direction="column">
                <Grid item container sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ background: "blue", color: "white", width: "100%" }}
                  >
                    Withdraw
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

export default Withdraw;
