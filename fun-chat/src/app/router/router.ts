import { routePages } from './route-pages';

export default function startRouting(): void {
  addEventListener('popstate', (event) => {
    const state = typeof event.state === 'string' ? event.state : '';
    routePages(state);
  });

  addEventListener('load', () => {
    const state = location.pathname.slice(1);
    routePages(state);
  });
}
