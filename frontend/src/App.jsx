import { useState } from "react";
import Container from "./components/Container/Container";
import Layout from "./layout/Layout";
import AddLink from "./components/AddLink/AddLink";
import PostList from "./components/PostList/PostList";
import Auth from "./components/Auth/Auth";
import Popup from "./components/Popup/Popup";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Alert, Snackbar, Tooltip, ThemeProvider, Typography } from "@mui/material";
import theme from "./theme";
import cls from "./App.module.scss";
import "./styles/global.scss";

const App = () => {
  const [alertData, setAlertData] = useState({});
  const [listUpdate, setListUpdate] = useState(1);
  const [isAuth, setIsAuth] = useState(false);
  const isAuthSession = document.cookie.includes("isAuth=true");

  const tooltipTitle = (
    <>
      В поле "Сокращение" нужно ввести короткий ID. <br/>
      Если поле останется пустым, то ID будет создан случайно.
    </>
  )

  const showAlert = (status, data) => {
    let dataFormat = Array.isArray(data) ? data : [data];
    setAlertData({status, data: dataFormat});
  }

  return (
    <ThemeProvider theme={theme}>
      {
        Object.entries(alertData).length > 0 &&
        <Snackbar open={true} autoHideDuration={5000} onClose={() => setAlertData([])}>
          <Alert severity={alertData.status} sx={{ width: '100%' }}>
            {alertData.data.map((item,index) => (
              <span key={index}>
                { item.message } <br/>
              </span>
            ))}
          </Alert>
        </Snackbar> 
      }

      <Popup open={!isAuth && !isAuthSession}>
        <Auth setIsAuth={setIsAuth} showAlert={showAlert}/>
      </Popup>

      <Layout>
        <Container>
          <Typography variant="h1">Сокращение ссылок</Typography>

          <section className={cls.section}>
            <div className="title-wrapper">
              <Typography variant="h2">Добавить новую ссылку</Typography>
              <Tooltip title={tooltipTitle}>
                <InfoOutlinedIcon className="title-icon"/>
              </Tooltip>
            </div>
            <AddLink listUpdate={() => setListUpdate(prev => ++prev)} showAlert={showAlert}/>
          </section>

          {
            (isAuth || isAuthSession) &&
            <section className={cls.section}>
              <Typography variant="h2">Список коротких ссылок</Typography>
              <PostList listUpdate={listUpdate} showAlert={showAlert}/>
            </section>
          }

        </Container>
      </Layout>
    </ThemeProvider>
  )
}

export default App;
