import { Grid, Typography } from "@mui/material";

const Home = ({ props: { state } }) => {
  return (
    <Grid item container sx={{ py: 2 }}>
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
    </Grid>
  );
};

export default Home;
