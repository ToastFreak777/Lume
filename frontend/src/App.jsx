import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import {
  Grades,
  Home,
  Login,
  Notes,
  Register,
  Courses,
  NewCourse,
  Messages,
} from "./pages";
import { Navbar, Searchbar, ProtectedRoute } from "./components";
import { courseLoader, newCourseLoader } from "./util/loaders";

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
        },
        {
          path: "courses",
          element: <Courses />,
          loader: courseLoader,
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
    {
      path: "courses/new",
      element: <NewCourse />,
      loader: newCourseLoader,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
