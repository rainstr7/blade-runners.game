import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import ButtonLink from "../UI/ButtonLink";
import cn from './ErrorComponent.module.scss'

interface ErrorProps {
    errorCode: number
}

const ErrorComponent: React.FC<ErrorProps> = ({ errorCode }) => {
    let errorMessage = ''
    if (errorCode.toString().startsWith('4')) {
        errorMessage = `OOOPS... THIS PAGE DOESN'T EXIST`
    } else if (errorCode.toString().startsWith('5')) {
        errorMessage = `OOOPS... SOMETHING WENT WRONG`
    }
    return (
        <div className={cn.Container}>
            <h1>{errorCode}</h1>
            <div className={cn.Message}>{errorMessage}</div>
            <Button size="small">TO MAIN</Button>
        </div>
    )
}

export default ErrorComponent