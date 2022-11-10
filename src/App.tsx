import React from 'react';
import "./App.less";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Show from "./pages/Show";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/show",
        element: <Show/>
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
