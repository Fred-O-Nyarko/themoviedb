import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route(':id', 'routes/details.tsx'),
] satisfies RouteConfig;
