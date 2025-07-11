export const tweetResource = {
  name: "tweets",
  list: "/tweets",
  create: "/tweets/create",
  edit: "/tweets/edit/:id",
  show: "/tweets/show/:id",
  meta: { canDelete: true },
};
