import { Route, Routes } from "react-router-dom";
import Header from "../widgets/header";
import { Container } from "@mui/material";
import Home from "./home";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
