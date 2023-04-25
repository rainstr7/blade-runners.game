import cn from './view.module.css'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import Header from '../../components/UI/Header'

const Auth = () => {
  return (
    <div className={cn.Container}>
      <Header className={cn.Header}>BLADE RUNNER</Header>
      <form className={cn.AuthForm}>
        <Input placeholder='LOGIN' type='text' />
        <Input placeholder='PASSWORD' type='text' />
        <Button label='SIGN IN' />
        <p className={cn.Message}>Don’t you have an account?
          <a className={cn.Goto} href='#'>
            SIGN UP
          </a>
        </p>
      </form>
      <span className={cn.Authors}>BY blade runners</span>
    </div>
  )
}

export default Auth
