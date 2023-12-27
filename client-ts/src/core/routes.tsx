import HomePage from '../pages/home';
import CreateCampaignPage from '../pages/campaign/create';
import ViewCampaignPage from '../pages/campaign/view';
import ProfilePage from '../pages/profile';
import AdminPage from '../pages/admin';

export const appRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/campaign/new',
    element: <CreateCampaignPage />,
  },
  {
    path: '/campaign/:campaignId',
    element: <ViewCampaignPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
];
