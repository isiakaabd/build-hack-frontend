import { FormikControl } from "components/validation";
import { Form, Formik } from "formik";
import { Grid, Button } from "@mui/material";
import useAlert from "components/hooks/useAlert";
import * as Yup from "yup";
import { useEtherum } from "components/hooks/useEtherum";
const AddInvoice = ({ props }) => {
  const { state: data } = props;
  const { displayAlert } = useAlert();
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
    description: Yup.string("Enter description")
      .trim()
      .required("description  is required"),
    amount: Yup.number("Enter Amount").required("amount  is required"),
  });
  const { contract } = useEtherum();
  const handleSubmit = async (values) => {
    const { level, name, post, description, amount } = values;
    try {
      await contract.fillSalaryInvoice(name, post, level, amount, description);
      displayAlert("success", "invoice filled successfully");
    } catch (err) {
      console.log(err);
      displayAlert("error", err.data.message);
    }
  };

  return (
    <Grid item container xs={8} sx={{ margin: "auto", mt: 3 }}>
      <Formik
        initialValues={{
          level: data?.level || 0,
          name: data?.name || "",
          post: data?.post || "",
          amount: "",
          rate: "",
          description: "",
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
                <Grid item container gap={2}>
                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        disabled
                        label="Name"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        disabled
                        label="Post"
                        id="post"
                        name="post"
                        placeholder="Enter Post"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container flexWrap="nowrap" gap={2}>
                    <Grid item xs={6}>
                      <FormikControl
                        control="input"
                        label=" Amount"
                        id="amount"
                        name="amount"
                        placeholder="Enter Amount"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormikControl
                        control="select"
                        name="level"
                        disabled
                        label="Level"
                        options={[
                          {
                            key: "Junior",
                            value: 0,
                          },
                          {
                            key: "Intermediate",
                            value: 1,
                          },
                          {
                            key: "Senior",
                            value: 2,
                          },
                        ]}
                      />
                    </Grid>
                  </Grid>

                  <Grid item container>
                    <FormikControl
                      control="textarea"
                      name="description"
                      minRows={3}
                      label="Description"
                      placeholder="Enter description"
                    />
                  </Grid>
                </Grid>
                <Grid item container sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ background: "blue", color: "white", width: "100%" }}
                  >
                    Add
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

export default AddInvoice;
