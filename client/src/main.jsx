import ReactDOM from 'react-dom/client';
import SignUp from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import App from './App.jsx';
import Search from './pages/Search.jsx';
import Shelves from './pages/Shelves.jsx';
import NewShelf from './pages/CreateShelf.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
        path: '/shelves',
        element: <Shelves/>
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/new_shelf',
        element: <NewShelf/>
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
