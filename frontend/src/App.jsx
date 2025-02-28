import {createBrowserRouter, Outlet, RouterProvider} from "react-router";


import {Courses, EditCourse, Grades, Home, Login, Messages, NewCourse, Notes, NotFound, Register,} from "./pages";

import {AuthRequired, Err, Navbar, Searchbar} from "./components";

import {courseLoader, editCourseLoader, messageLoader, newCourseLoader,} from "./util/loaders";

const Layout = () => (
    <div className="app">
        <Navbar/>
        <div className="app-content">
            <Searchbar/>
            <Outlet/>
        </div>
    </div>
);

const routes = [
    {
        path: "/",
        element: (
            <AuthRequired>
                <Layout/>
            </AuthRequired>
        ),
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "courses",
                element: <Courses/>,
                loader: courseLoader,
            },
            {
                path: "grades",
                element: <Grades/>,
            },
            {
                path: "messages",
                element: <Messages/>,
                loader: messageLoader,
            },
            {
                path: "notes",
                element: <Notes/>,
            },
        ],
        errorElement: <Err/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "courses/new",
        element: <NewCourse/>,
        loader: newCourseLoader,
    },
    {
        path: "courses/edit/:id",
        element: <EditCourse/>,
        loader: editCourseLoader,
    },
    {
        path: "*",
        element: <NotFound/>,
    },
];

function App() {
    const router = createBrowserRouter(routes);

    return <RouterProvider router={router}/>;
}

export default App;
