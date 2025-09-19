import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root/Root";
import Home from "./Home/Home";
import City from "./City/City";
import TodayWeather from "./components/TodayWeather";
import HourlyWeather from "./components/HourlyWeather";
import DailyWeather from "./components/DailyWeather";
import MonthlyWeather from "./components/MonthlyWeather";
import AirQuality from "./components/AirQuality";
import ErrorPage from "./ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/city/:city",
        element: <City />,
        children: [
          {
            index: true,
            element: <TodayWeather />,
          },
          {
            path: "today",
            element: <TodayWeather />,
          },
          {
            path: "hourly",
            element: <HourlyWeather />,
          },
          {
            path: "daily",
            element: <DailyWeather />,
          },
          {
            path: "monthly",
            element: <MonthlyWeather />,
          },
          {
            path: "air-quality",
            element: <AirQuality />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
