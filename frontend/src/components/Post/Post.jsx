import { useState } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import clsx from "clsx";
import Popup from "../Popup/Popup";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import cls from "./Post.module.scss";

const Post = props => {
  const { id, shortUrl, date, clickCount, longUrl, onDeletePost} = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const unixToDate = date => {
    const postDate = new Date(parseInt(date));
    return postDate.toLocaleString();
  }

  const downloadQR = () => {
    const canvas = document.getElementById("QR-CODE");
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "dolshik-online";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={cls.root}>
      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          <QRCodeCanvas
            id="QR-CODE"
            onClick={downloadQR}
            className={cls["qr-code"]} 
            size={300} value={shortUrl} 
            imageSettings={{src: "./logo.png", height: 50, width: 50, excavate: true}}
          />
      </Popup>
      <div className={cls.item}>
        <span className={cls.key}>Длинная ссылка:</span>
        <a target="_blank" rel="noopener noreferrer" href={longUrl} className={cls.link}>{longUrl}</a>
      </div>
      <div className={cls.item}>
        <span className={cls.key}>Короткая ссылка:</span>
        <a target="_blank" rel="noopener noreferrer" href={shortUrl} className={cls.link}>{shortUrl}</a>
      </div>
      <div className={clsx(cls.item, cls["item--small"])}>
        <span className={cls.key}>Количество переходов:</span>
        <span className={cls.value}>{clickCount}</span>
      </div>
      <div className={clsx(cls.item, cls["item--small"])}>
        <span className={cls.key}>Дата создания:</span>
        <span className={cls.value}>{unixToDate(date)}</span>
      </div>
      <div className={cls["buttons-container"]}>
        <button 
          onClick={() => setIsPopupOpen(true)} 
          className={clsx(cls["float-button"], cls["float-button--qr-code"])}
        >
          <QrCodeScannerIcon/>
        </button>
        <button
         onClick={() => onDeletePost(id)}
         className={clsx(cls["float-button"], cls["float-button--delete"])}
        >
          <DeleteOutlineIcon className={cls["delete-icon"]}/>
        </button>
      </div>
    </div>
  )
}

export default Post;