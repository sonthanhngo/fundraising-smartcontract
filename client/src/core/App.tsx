import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './routes.jsx';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store.js';
import { Header } from '@src/common/components/Header';
import { Toaster } from '@shadcn/components/ui/toaster';
import { Chat } from '@src/common/chat';
function App() {
  const appRouter = createBrowserRouter(appRoutes);
  return (
    <div className=''>
      <ReduxProvider store={store}>
        <Header />
        <Toaster />
        <Chat />
        <RouterProvider router={appRouter} />
      </ReduxProvider>
    </div>
  );
}

export default App;
