import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import {
  Grades,
  Home,
  Login,
  Notes,
  Register,
  Courses,
  Messages,
} from "./pages";
import { Navbar, Searchbar, ProtectedRoute } from "./components";
// import { homeLoader } from "./lib/loaders";

const Layout = () => (
  <div className="app">
    <Navbar />
    <div className="app-content">
      <Searchbar />
      <Outlet />
    </div>
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
          // loader: homeLoader,
        },
        {
          path: "courses",
          element: <Courses />,
        },
        {
          path: "grades",
          element: <Grades />,
        },
        {
          path: "messages",
          element: <Messages />,
        },
        {
          path: "notes",
          element: <Notes />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
