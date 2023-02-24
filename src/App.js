import Calendar from "./Calendar";
import TimeSlot from "./TimeSlot";
// import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Calendar />,
    },
    {
      path: "time-slot",
      element: <TimeSlot />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
