import ReactDOM from 'react-dom/client'
import SignUp from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Search from './pages/Search.jsx'
import Collections from './pages/Collections.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <p>Page not found!</p>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/collections',
        element: <Collections/>
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      },
      {
        path: '/login',
        element: <Login/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
