import HomePage from '../modules/home/pages/HomePage';
import CreateCampaignPage from '../modules/campaign/pages/CreateCampaignPage';
import ViewCampaignPage from '../modules/campaign/pages/ViewCampaignPage';
import ProfilePage from '../modules/profile/pages/ProfilePage';
import AdminPage from '../modules/admin/pages/AdminPage';
import TestPage from '../modules/test/TestPage';
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
  { path: '/test', element: <TestPage /> },
];
