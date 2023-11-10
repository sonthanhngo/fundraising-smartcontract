import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes.jsx';
import { TopBar } from '../common/components/TopBar/TopBar.jsx';

function App() {
  const appRouter = createBrowserRouter(appRoutes);
  return (
    <div className=''>
      <TopBar />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
