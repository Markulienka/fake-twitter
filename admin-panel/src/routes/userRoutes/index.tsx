import { Route } from "react-router-dom";
import {
  UserCreate,
  UserEdit,
  UserList,
  UserShow,
} from "../../pages/users";

export const userRoutes = [
  <Route path="/users" key="users">
    <Route index element={<UserList />} />
    <Route path="create" element={<UserCreate />} />
    <Route path="edit/:id" element={<UserEdit />} />
    <Route path="show/:id" element={<UserShow />} />
  </Route>,
];
