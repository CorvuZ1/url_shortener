import { Box, Modal } from '@mui/material';
import cls from "./Popup.module.scss";

const Popup = ({children, ...props}) => (
  <Modal className={cls.root} {...props}>
    <Box className={cls.content}>{children}</Box>
  </Modal>
)

export default Popup;