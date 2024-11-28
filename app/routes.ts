import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('movie/:id', 'routes/details.tsx'),
] satisfies RouteConfig;
