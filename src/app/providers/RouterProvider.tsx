import {
    RouterProvider,
    createBrowserRouter,
    redirect,
    useRouteError,
} from 'react-router-dom';
import { NakedLayout } from '~pages/layouts';
import { mainPageRoute } from '~pages/main';
import { pathKeys } from '~shared/lib/react-router';


function BubbleError() {
    const error = useRouteError();
    if (error) throw error;
    return null;
}

const router = createBrowserRouter([
    {
        errorElement: <BubbleError />,
        element: <NakedLayout />,
        children: [
            mainPageRoute,
            {
                loader: async () => redirect(pathKeys.home.root()),
                path: '*',
            },
        ],
    },
]);

export function BrowserRouter() {
    return (
        <RouterProvider router={router}/>
    );
}
