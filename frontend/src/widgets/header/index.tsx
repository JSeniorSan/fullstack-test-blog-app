import { Button, Container } from "@mui/material";
import styles from "./header.module.scss";
const Header = () => {
  const isAuth = false;

  return (
    <header className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a href="/">
            <Button>Vladimir_YK Blog</Button>
          </a>
          <div>
            {isAuth ? (
              <>
                <a>
                  <Button>Написать статью</Button>
                </a>
                <a>
                  <Button>Выйти</Button>
                </a>
              </>
            ) : (
              <>
                <a>
                  <Button>Войти</Button>
                </a>
                <a>
                  <Button>Создать аккаут</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
