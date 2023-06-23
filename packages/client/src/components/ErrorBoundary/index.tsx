import React, { Component, ErrorInfo, ReactNode } from 'react'
import cn from './style.module.scss'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 className={cn.Error}>
          Something went wrong. Please try refresh page.
        </h2>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
