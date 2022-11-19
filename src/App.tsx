import React from 'react';
import "./App.less";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Show from "./pages/Show";
import Home from "./pages/Home";
import Intro from "./pages/Intro";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/show",
        element: <Show/>
    },
    {
        path: "/intro",
        element: <Intro/>
    }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
