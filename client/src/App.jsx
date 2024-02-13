import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import Compose from "./pages/Compose";
import Edit from "./pages/Edit";
import {
    RouterProvider,
    createBrowserRouter
  } from "react-router-dom";


const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children: [
            {
                path:"",
                element:<Home/>,
            },
            {
                path:"about",
                element:<About/>,
            },
            {
                path:"contact",
                element:<Contact/>,
            },
            {
                path:"compose",
                element:<Compose/>,
            },
            {
                path:"/edit/:id/:target",
                element:<Edit/>,
            },
            {
                path:"/blogs/:id",
                element:<Blogs/>,
            },
        ],
    },
  ]);


export default function App() {
    return (
        <RouterProvider router={router} />
    );
}