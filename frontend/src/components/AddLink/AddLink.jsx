import { useState, useMemo } from "react";
import { Button, TextField, Typography } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import cls from "./AddLink.module.scss";

const AddLink = ({ showAlert, listUpdate }) => {
  const BASE_URL = "https://google.com/";
  const [pathname, setPathname] = useState(BASE_URL);
  const [paramsCount, setParamsCount] = useState(1);
  const [params, setParams] = useState([{key: "", value: ""}]);
  const [shortId, setShortId] = useState("");

  const query = useMemo(() => {
    const urlData = new URL(pathname);

    params.forEach(item => {
      if (!item) return;

      const { key, value } = item;
      if (key) {
        if (!value) {
          return urlData.searchParams.set(key, "");
        }
        urlData.searchParams.set(key, value);
      }
    })

    return urlData.search;
  }, [params])

  const paramsInputHandler = (field, index, value) => {
    setParams(prev => {
      const newArray = [...prev];

      if (field == "key") {
        newArray[index] = {...newArray[index], key: value};
      } else {
        newArray[index] = {...newArray[index], value};
      }

      return newArray;
    })
  }

  const addParamsFields = () => {
    setParams(prev => [...prev, {key: "", value: ""}]);
    setParamsCount(prev => ++prev);
  }

  const pathnameInputHandler = value => {
    if (!value.startsWith(BASE_URL)) return;
    setPathname(value);
  }

  const sendForm = async event => {
    event.preventDefault();
    const { method } = event.target;

    try {
      const request = await fetch("/api/createShortLink", {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          longUrl: pathname + query,
          customShortId: shortId
        })
      })

      const info = await request.json();

      if (request.ok) {
        listUpdate();
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
    <>
      { (query || pathname.length > BASE_URL.length) ? <div className={cls.href}>{pathname + query}</div> : null }
      <form onSubmit={event => sendForm(event)} className={cls.root} method="POST">
        <div>
          <div className={cls["row-wrapper"]}>
            <div className={cls.item}>
              <TextField onInput={event => pathnameInputHandler(event.target.value)} value={pathname} className={cls.input} size="small" label="Длинная ссылка" variant="outlined" />
            </div>
            <div className={cls.item}>
              <TextField onInput={event => setShortId(event.target.value)} className={cls.input} size="small" label="Сокращение" variant="outlined" />
            </div>
          </div>
        </div>
        <div className="title-wrapper">
          <Typography variant="h3">Параметры</Typography> 
          <button type="button" className="title-button" onClick={addParamsFields}>
            <AddCircleOutlineRoundedIcon className="title-icon"/>
          </button>
        </div>
        <div className={cls["params-fields"]}>
          {
            Array(paramsCount).fill("el").map((_, index) => (

              <div className={cls["row-wrapper"]} key={index}>
                <div className={cls.item}>
                  <TextField onInput={event => paramsInputHandler("key", index, event.target.value)} className={cls.input} size="small" label="Ключ" variant="outlined" />
                </div>
                <div className={cls.item}>
                  <TextField onInput={event => paramsInputHandler("value", index, event.target.value)} className={cls.input} size="small" label="Значение" variant="outlined" />
                </div>
              </div>
            ))
          }
        </div>
        <div className={cls.button}>
          <Button type="submit" variant="outlined">Добавить</Button>
        </div>
      </form>
    </>
  )
}

export default AddLink;