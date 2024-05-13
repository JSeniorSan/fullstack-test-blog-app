import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./login.module.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux-hooks";
import { checkAuth, fetchLogin } from "../../entities/store/auth/auth-slice";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuth);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const result = await dispatch(fetchLogin(data));
      if (typeof result.payload === "object") {
        window.localStorage.setItem("token", result?.payload.token);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={!isValid && errors.email?.message}
          fullWidth
          {...register("email", { required: "Введите почту" })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          helperText={!isValid && errors.password?.message}
          fullWidth
          {...register("password", { required: "Требуется ввести пароль" })}
          error={Boolean(errors.password?.message)}
        />
        <Button size="large" variant="contained" fullWidth type="submit">
          Войти
        </Button>
      </form>
    </Paper>
  );
};
