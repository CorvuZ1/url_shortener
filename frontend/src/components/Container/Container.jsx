import cls from "./Container.module.scss";

const Container = ({children}) => (
  <div className={cls.root}>
    {children}
  </div>
)

export default Container;