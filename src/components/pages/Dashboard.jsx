import { useState } from "react";
import Web3Modal from "web3modal";
import useAuth from "components/context/useAuth";
import { shortAccount } from "components/helpers";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormikControl } from "components/validation";
import { Form, Formik } from "formik";
import { Modals } from "components/utilities";
import { ethers } from "ethers";
import { abi } from "abi";
import useAlert from "components/hooks/useAlert";
import { useEffect } from "react";
const Dashboard = () => {
  const { auth } = useAuth();
  const account = localStorage.getItem("account");
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions: {},
  });
  const CONTRACT_ADDRESS = "0x00fb544D2Cd5f60d24BE3B74a10A4803Ce65e836";

  const { ethereum } = window;
  const checkEtherum = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const connectedContract = await new ethers.Contract(
          CONTRACT_ADDRESS,
          abi,
          signer
        );

        return connectedContract;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const register = async () => {
    try {
      if (checkEtherum()) {
        const connectedContract = await checkEtherum();
        console.log(connectedContract);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  const web3Modal = new Web3Modal({
  //     network: "rinkeby",
  //     providerOptions: {},
  //     cacheProvider:true,
  //     disableInjectedProvider: false,
  //   });
  // const location = useLocation();
  const navigate = useNavigate();
  const { displayAlert } = useAlert();
  // const from = location?.state?.from.pathname || "/";
  const logout = async () => {
    web3Modal.clearCachedProvider();
    localStorage.setItem("auth", false);
    localStorage.removeItem("account");
    setTimeout(() => {
      navigate(0);
    }, 5000);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const initialValues = {};

  const onSubmit = () => {};
  const [status, setStatus] = useState("Pending");
  const checkStatus = async () => {
    try {
      const connectedContract = await checkEtherum();
      console.log(connectedContract);
      const data = await connectedContract.showMyRegistrationStatus(account);
      if (data === "you don't have access to this, contact admin")
        setStatus("Declined");
    } catch (error) {
      displayAlert("error", error);
    }
    //50 and rate = 50
  };
  const [state, setState] = useState(undefined);
  const getEmployeeDetails = async () => {
    try {
      const connectedContract = await checkEtherum();
      const data = await connectedContract.getEmployeeDetails(account);
      setState(data);
    } catch (error) {
      displayAlert("error", error);
    }
  };
  useEffect(() => {
    getEmployeeDetails();
    //eslint-disable-next-line
  }, [auth]);

  return (
    <>
      <Grid item container sx={{ p: 2 }}>
        {/* <Button variant="secondary" sx={{ background: "red" }} onClick={logout}>
        Logout
      </Button> */}
        <Grid item container justifyContent="space-between" alignItems="center">
          <h1>
            Welcome {""} {shortAccount(auth.account || account)}
          </h1>
          <Button sx={{ background: "#fff" }} onClick={logout}>
            Logout
          </Button>
          <Button
            sx={{
              background: "#fff",
              fontSize: "2rem",
            }}
          >
            Approval Status {"   "} -{" "}
            <span style={{ color: state?.approved === true ? "green" : "red" }}>
              {state?.approved === true ? "Approved" : "Not Approved"}
            </span>
          </Button>
        </Grid>
        <Grid item container flexDirection="column" gap={2}>
          <Typography variant="h3">Name: {state?.name}</Typography>
          <Typography variant="h3">level:{state?.level}</Typography>
          <Typography variant="h3">Post:{state?.post}</Typography>
          <Typography variant="h3">
            Status:
            {state?.status === 0
              ? "Junior"
              : state?.status === 1
              ? "Intermediate"
              : "Senior"}
          </Typography>
        </Grid>

        <Grid item>
          <Button onClick={() => setOpen(true)}>Add Invoice</Button>
        </Grid>
      </Grid>
      <Modals
        isOpen={open}
        title="Add Partner"
        rowSpacing={5}
        handleClose={handleClose}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          // validationSchema={addNewPartnerValidationSchema}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
        >
          {({
            isSubmitting,
            isValid,
            dirty,
            values,
            errors,
            setFieldValue,
          }) => {
            const { classification, category: cat } = values;
            return (
              <Form style={{ marginTop: "1rem" }}>
                <Grid container direction="column" gap={1.5}>
                  <Grid item container>
                    <Grid item container flexWrap="nowrap" gap={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Name"
                          id="name"
                          name="name"
                          placeholder="Enter Partner name"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Email"
                          id="name"
                          name="email"
                          placeholder="Enter Email"
                        />
                      </Grid>
                    </Grid>
                    <Grid item container flexWrap="nowrap" gap={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label=" Account Number"
                          id="account"
                          name="account"
                          placeholder="Enter Account Number"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Phone Number"
                          id="phone"
                          name="phone"
                          placeholder="Enter Phone Number"
                        />
                      </Grid>
                    </Grid>

                    <Grid item container flexWrap="nowrap" gap={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          name="bank"
                          label="Bank"
                          placeholder="Select Bank"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          name="category"
                          label="Category"
                          placeholder="Category"
                        />
                      </Grid>
                    </Grid>

                    <Grid item container flexWrap="nowrap" gap={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Account Name"
                          id="accName"
                          name="accName"
                          placeholder="Enter Account Name"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="file"
                          name="image"
                          label="Company Logo"
                        />
                      </Grid>
                    </Grid>

                    <Grid item container>
                      <FormikControl
                        control="textarea"
                        name="address"
                        minRows={3}
                        label="Address"
                        placeholder="Enter address"
                      />
                    </Grid>
                  </Grid>
                  <Grid item container sx={{ mt: 1 }}>
                    <Button>Add</Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modals>
    </>
  );
};
export default Dashboard;
