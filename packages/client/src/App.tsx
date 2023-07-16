import './App.css'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import RoutersList from './components/RouterList'
import React from 'react'

const App = () => (
  <Layout>
    <ErrorBoundary>
      <RoutersList />
    </ErrorBoundary>
  </Layout>
)
export default App
