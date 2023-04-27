import { ReactElement } from 'react';
import cn from './style.module.scss';

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={cn.Layout}>
      {children}
    </div>
  )
};

export default Layout;
