import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes.jsx';
import { TopBar } from '../common/components/TopBar/TopBar.jsx';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store.js';
function App() {
  const appRouter = createBrowserRouter(appRoutes);
  return (
    <div className=''>
      <ReduxProvider store={store}>
        <TopBar />
        <RouterProvider router={appRouter} />
      </ReduxProvider>
    </div>
  );
}

export default App;
