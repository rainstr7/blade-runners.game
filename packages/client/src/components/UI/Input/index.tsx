import cn from './styles.module.scss'
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  UseFormRegister,
} from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

interface Props {
  name: Path<FieldValues>
  autoComplete: string
  register: UseFormRegister<FieldValues>
  options?: RegisterOptions
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

const Input = ({
  name,
  register,
  error,
  autoComplete = 'off',
  options,
  ...props
}: Props &
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) => {
  const inputClasses = [cn.Input]
  if (error) {
    inputClasses.push(cn.Invalid)
  } else {
    inputClasses.push(cn.Margin)
  }
  return (
    <label className={cn.Label}>
      <input
        className={inputClasses.join(' ')}
        autoComplete={autoComplete}
        {...register(name, options)}
        {...props}
      />
      <div className={cn.ErrorMessage}>
        <span>{error && (error.message as ReactNode)}</span>
      </div>
    </label>
  )
}

export default Input
