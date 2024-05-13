import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./register.module.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux-hooks";
import { checkAuth, fetchRegister } from "../../entities/store/auth/auth-slice";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuth);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
    },
  });

  const onSubmit = async ({
    email,
    password,
    fullname,
  }: {
    email: string;
    password: string;
    fullname: string;
  }) => {
    try {
      const response = await dispatch(
        fetchRegister({ email, password, fullname })
      );
      if (typeof response.payload === "object") {
        window.localStorage.setItem("token", response.payload.token);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          helperText={errors.fullname?.message}
          error={Boolean(errors.fullname?.message)}
          {...register("fullname", { required: "Введите полное имя" })}
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          helperText={errors.email?.message}
          error={Boolean(errors.email?.message)}
          {...register("email", { required: "Введите email" })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          {...register("password", { required: "Введите пароль" })}
        />
        <Button
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          disabled={!isValid}>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
