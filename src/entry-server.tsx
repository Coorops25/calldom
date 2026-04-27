import App from './App';

export function createApp(pathname: string) {
  return <App initialPath={pathname} />;
}
