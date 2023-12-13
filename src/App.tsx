import {MainPage} from "./main_page/MainPage";
import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";
import ModalContainer from "./components/ModalContainer";

function App() {
  return (
      <ThemeProvider theme={theme}>
        <ModalContainer />
            <CssBaseline />
        <MainPage />
      </ThemeProvider>
  )
}

export default App;
