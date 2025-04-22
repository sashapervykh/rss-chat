import { routePages } from './route-pages';

export default function startRouting(): void {
  addEventListener('hashchange', () => {
    routePages();
  });

  addEventListener('load', () => {
    routePages();
  });
}
