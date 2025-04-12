import {
    createRootRoute,
    Outlet,
    useRouterState,
} from '@tanstack/react-router';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ProtectedRouteProvider } from '@/context/ProtectedRouteContext';


function RootLayout() {
    const location = useRouterState({ select: (state) => state.location });
    const hideLayout = location.pathname.includes('/app');

    return (
      <ProtectedRouteProvider>
        <div className="flex h-dvh flex-col">
            {!hideLayout && <Navbar />}

            <div className="flex flex-grow flex-col">
                <Outlet />
            </div>

            {!hideLayout && <Footer />}
        </div>
      </ProtectedRouteProvider>
    );
}

export const Route = createRootRoute({
    component: RootLayout,
});
