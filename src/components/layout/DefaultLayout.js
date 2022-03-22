import { Container, Grid } from "@mui/material";

export const DefaultLayout = ({ children }) => (
  <Container disableGutters maxWidth={false} className="cpnt_contents"> {/* style={{ marginLeft: "240px" }} */}
    <Grid container justify={`center`} alignItems={`flex-start`}>
      {children}
    </Grid>
  </Container>
);
