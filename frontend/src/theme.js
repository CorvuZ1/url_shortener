import { createTheme } from "@mui/material";

const general = {
  color: "rgb(38, 38, 38)",
  fontWeight: 400
}

const theme = createTheme({
  typography: {
    fontFamily: "Rubik, sans-serif",
    h1: {
      ...general,
      fontSize: "40px",
      marginBottom: "32px"
    },
    h2: {
      ...general,
      fontSize: "26px",
      marginBottom: "18px"
    },
    h3: {
      ...general,
      fontSize: "22px",
      marginBottom: "10px"
    }
  }
})

export default theme;