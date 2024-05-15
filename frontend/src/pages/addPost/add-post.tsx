import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./addPost.module.scss";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkAuth } from "../../entities/store/auth/auth-slice";

export const AddPost = () => {
  const isAuth = useSelector(checkAuth);
  const ref = useRef<null | HTMLInputElement>(null);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [imageUrl, setImageUrl] = React.useState<string | undefined>("");

  console.log(imageUrl);

  const handleChangeFile = () => {
    console.log(ref.current?.value.split("\\")[2]);
    setImageUrl(ref.current?.value.split("\\")[2]);
  };

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () =>
      ({
        spellChecker: false,
        maxHeight: "400px",
        autofocus: true,
        placeholder: "Введите текст...",
        status: false,
        autosave: {
          uniqueId: "1",
          enabled: true,
          delay: 1000,
        },
      } as SimpleMDEReactProps),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        variant="outlined"
        size="large"
        onClick={() => ref.current?.click()}>
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden ref={ref} />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4000/${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        onChange={(e) => setTags(e.currentTarget.value.split(","))}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
