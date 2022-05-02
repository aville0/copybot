import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CopyBot-xyz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us"],
  },
  {
    title: "Features",
    description: ["How it works", "Future development"],
  },
  {
    title: "Connect with Us",
    description: ["Facebook", "Twitter", "Instagram", "Github"],
  },
];

function PricingContent() {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />

      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 2,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}

// import React from "react";
// import "./Footer.scss";

// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="column-left">
//         <h3>Company</h3>
//         <p>About Us</p>
//       </div>
//       <div className="column-center">
//         <h3>Contact Us</h3>
//         <a href="9058065587">(905) 806-5587</a> <br></br>
//         <a href="mailto:info@copybot.xyz">info@copybot.xyz</a>
//       </div>
//       <div className="column-right">
//         <h3>Connect on Social</h3>
//         <p>Facebook</p>
//         <p>Instagram</p>
//         <p>Twitter</p>
//       </div>
//     </div>
//   );
// };

// export default Footer;
