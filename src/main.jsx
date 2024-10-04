import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider,} from 'react-router-dom';
import RecipeDetails from "./views/RecipeDetails.jsx";
import HomePage from "./views/HomePage.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/recipe/:recipeId",
        element: <RecipeDetails/>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
