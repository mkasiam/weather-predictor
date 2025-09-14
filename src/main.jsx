import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Root/Root";
import City from "./City/City";
import ErrorPage from "./ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/city/:city",
        element: <City />,
      },
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
