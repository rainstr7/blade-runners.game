import cn from './style.module.css';

interface Props {
  label: string;
  type?: 'button' | 'reset' | 'submit';
}
const Button = ({label, type = 'button', ...props}: Props) => {
  return (
    <button className={cn.Button} type={type} {...props}>
      {label}
    </button>
  );
}

export default Button;
