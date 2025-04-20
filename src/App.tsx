//import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./signIn";
import Overview from "./overview";
//import { useState } from "react";

function App() {
  //const [count, setCount] = useState(0);

  const router = createBrowserRouter(
    [
      { path: "/", element: <SignIn /> },
      { path: "overview", element: <Overview /> },
    ],
    {
      basename: "/refresh-error-page-exercise/",
    }
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
