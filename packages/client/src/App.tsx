import './App.css'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import RoutersList from './components/RouterList'
import { ThemeProvider } from './components/Theme'

const App = () => (
  <ThemeProvider>
    <Layout>
      <ErrorBoundary>
        <RoutersList />
      </ErrorBoundary>
    </Layout>
  </ThemeProvider>
)
export default App
