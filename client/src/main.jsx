import ReactDOM from 'react-dom/client';
import SignUp from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import App from './App.jsx';
import Search from './pages/Search.jsx';
import Profile from './pages/Profile.jsx';
import NewShelf from './pages/CreateShelf.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shelf from './pages/Shelf.jsx';

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
        path: '/user/:id',
        element: <Profile/>
      },
      {
        path: '/search',
        element: <Search/>
      },
      {
        path: '/new-shelf',
        element: <NewShelf/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/shelf/:id',
        element: <Shelf/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
