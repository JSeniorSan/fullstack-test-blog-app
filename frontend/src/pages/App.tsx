import { Route, Routes } from "react-router-dom";
import Header from "../widgets/header";
import { Container } from "@mui/material";
import { FullPost } from "./fullPost/fullPost";
import { AddPost } from "./addPost/add-post";
import { Login } from "./login/login";
import { Registration } from "./register/register";
import { Home } from "./home";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/post-add" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
