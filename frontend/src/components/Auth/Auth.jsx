import { useState } from "react";
import { Button, TextField } from '@mui/material';
import cls from "./Auth.module.scss";

const Auth = ({setIsAuth, showAlert}) => {
  const [token, setToken] = useState("");

  const doAuth = async event => {
    event.preventDefault();
    const { method } = event.target;

    try {
      const request = await fetch("/auth", {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token
        })
      })

      const info = await request.json();
      if (request.ok) {
        setIsAuth(true);
        showAlert("success", info);
      } else {
        showAlert("error", info);
        throw Error();
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={event => doAuth(event)} className={cls.root} method="POST">
      <span className={cls.title}>Введите ключ доступа</span>
      <TextField value={token} type="password" onInput={event => setToken(event.target.value)} size="small" label="Ключ" variant="outlined"/>
      <Button type="submit" variant="outlined">Отправить</Button>
    </form>
  )
}

export default Auth;