import './App.css'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import RoutersList from './components/RouterList'

const App = () => (
  <Layout>
    <ErrorBoundary>
      <RoutersList />
    </ErrorBoundary>
  </Layout>
)
export default App
