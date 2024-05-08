import { Button, Container } from "@mui/material";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";
const Header = () => {
  const isAuth = false;

  return (
    <header className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/">
            <Button>Vladimir_YK Blog</Button>
          </Link>
          <div>
            {isAuth ? (
              <>
                <Link to={"/create"}>
                  <Button>Написать статью</Button>
                </Link>
                <Link to={"/"}>
                  <Button>Выйти</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button>Войти</Button>
                </Link>
                <Link to={"/register"}>
                  <Button>Создать аккаунт</Button>
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
