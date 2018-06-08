const router = (routes) => {
  const hashValue = location.hash.slice(1);

  const currentRoute = routes.find(route => route.path === hashValue);

  currentRoute.component();
};
