import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { Grades, Home, Login, Notes, Register } from "./pages";
import { Navbar, Searchbar } from "./components";
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

const UnderDevelopment = () => (
  <div className="underDevelopment">
    <h1>Under Development</h1>
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          // loader: homeLoader,
        },
        {
          path: "classes",
          element: <UnderDevelopment />,
        },
        {
          path: "grades",
          element: <Grades />,
        },
        {
          path: "instructors",
          element: <UnderDevelopment />,
        },
        {
          path: "notes",
          element: <Notes />,
        },
        {
          path: "settings",
          element: <UnderDevelopment />,
        },
        {
          path: "logout",
          element: <UnderDevelopment />,
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
