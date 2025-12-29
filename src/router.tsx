import { createBrowserRouter, RouterProvider } from 'react-router';
import { HomePage } from './pages/HomePage';
import { DetailsModalPage } from './pages/DetailsModalPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                path: 'details/:id',
                element: <DetailsModalPage />,
            },
        ],
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
