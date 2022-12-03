import cls from "./Layout.module.scss";

const Layout = ({children}) => (
  <div className={cls.root}>
    <div className={cls.line}></div>
    <main className={cls.content}>{children}</main>
    <div className={cls.line}></div>
  </div>
)

export default Layout;