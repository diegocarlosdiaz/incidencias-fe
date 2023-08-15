import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { DetalleIncidencia } from 'pages/extra-pages/DetalleIncidencia';
// render - dashboard
const Estados = Loadable(lazy(() => import('pages/reports/Estados')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const Principal = Loadable(lazy(() => import('pages/extra-pages/Principal')))


// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <SamplePage />
        },{
            path: '/estados',
            element: <Estados />
        },
        {
            path: '/principal',
            element:<Principal />
        },
        {
            path:'/detalle/:id',
            element:<DetalleIncidencia/>
        }

    ]
};

export default MainRoutes;