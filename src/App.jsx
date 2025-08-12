import { lazy } from 'react'
import './App.css'
import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout/Layout'
import { RouterProvider } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage/HomePage')); 
const InteractiveWorkspace = lazy(() => import('./pages/InteractiveWorkspace/InteractiveWorkspace'))
const BitcoinTransactions = lazy(() => import('./components/BitcoinPage/BitcoinPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'interactive-workspace', element: <InteractiveWorkspace /> },
      {path: 'bitcoin-transactions', element: <BitcoinTransactions />},
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
