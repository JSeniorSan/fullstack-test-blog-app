import { Route, Routes } from "react-router-dom";
import Header from "../widgets/header";
import { Container } from "@mui/material";
import { FullPost } from "./fullPost/fullPost";
import { AddPost } from "./addPost/add-post";
import { Login } from "./login/login";
import { Registration } from "./register/register";
import { Home } from "./home";
import { useAppDispatch } from "../shared/hooks/redux-hooks";
import { useEffect } from "react";
import { fetchMe } from "../entities/store/auth/auth-slice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/posts/create" element={<AddPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
