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
  EditCourse,
  NotFound,
} from "./pages";

import { Navbar, Searchbar, AuthRequired, Err } from "./components";

import {
  courseLoader,
  newCourseLoader,
  editCourseLoader,
  messageLoader,
} from "./util/loaders";

const Layout = () => (
  <div className="app">
    <Navbar />
    <div className="app-content">
      <Searchbar />
      <Outlet />
    </div>
  </div>
);

const routes = [
  {
    path: "/",
    element: (
      <AuthRequired>
        <Layout />
      </AuthRequired>
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
        loader: messageLoader,
      },
      {
        path: "notes",
        element: <Notes />,
      },
    ],
    errorElement: <Err />,
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
  {
    path: "courses/edit/:id",
    element: <EditCourse />,
    loader: editCourseLoader,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
