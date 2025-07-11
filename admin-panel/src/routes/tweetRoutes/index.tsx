import { Route } from "react-router-dom";
import {
  TweetCreate,
  TweetEdit,
  TweetList,
  TweetShow,
} from "../../pages/tweets";

export const tweetRoutes = [
  <Route path="/tweets" key="tweets">
    <Route index element={<TweetList />} />
    <Route path="create" element={<TweetCreate />} />
    <Route path="edit/:id" element={<TweetEdit />} />
    <Route path="show/:id" element={<TweetShow />} />
  </Route>,
];
