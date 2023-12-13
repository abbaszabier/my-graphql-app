import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import CreateUser from "../Components/CreateUser";
import Login from "../Components/Login";
import CreateLink from "../Components/CreateLink";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<CreateUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-link" element={<CreateLink />} />
    </Route>
  )
);

export default router;
