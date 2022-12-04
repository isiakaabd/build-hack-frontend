// import { FormikControl } from "components/validation";
import { Form, Formik } from "formik";
import { Grid, Button } from "@mui/material";
import useAlert from "components/hooks/useAlert";
// import * as Yup from "yup";
import { useEtherum } from "components/hooks/useEtherum";
import { CustomButton } from "components/utilities";

const Withdraw = () => {
  const { displayAlert } = useAlert();
  const buttonType = {
    background: "#3E5EA9",
    hover: "#3E5EA9",
    active: "#3E5EA9",
  };
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
                <Grid item container sx={{ mt: 2 }} justifyContent="center">
                  <CustomButton
                    type={buttonType}
                    title="Withdraw"
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
    </Grid>
  );
};

export default Withdraw;
