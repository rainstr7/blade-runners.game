import cn from './Button.module.css';
const Button = ({label}) => {
  return (
    <button className={cn.Button}>
      {label}
    </button>
  );
}

export default Button;
