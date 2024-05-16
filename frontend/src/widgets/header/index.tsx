import { Button, Container } from "@mui/material";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux-hooks";
import { checkAuth, logout } from "../../entities/store/auth/auth-slice";
const Header = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuth);

  const exitHandle = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };

  return (
    <header className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/">
            <Button>Irina_YK Blog</Button>
          </Link>
          <div>
            {isAuth ? (
              <>
                <Link to={"/posts/create"}>
                  <Button variant="outlined">Написать статью</Button>
                </Link>
                <Link to={"/"}>
                  <Button onClick={exitHandle} type="reset">
                    Выйти
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button variant="contained">Войти</Button>
                </Link>
                <Link to={"/register"}>
                  <Button variant="text"> Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
