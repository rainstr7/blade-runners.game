import cn from './input.module.css';
const Input = ({placeholder, type}) => {
  return (
    <input className={cn.Input} placeholder={placeholder} type={type}/>
  );
}

export default Input;
