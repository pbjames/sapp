import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ProtectedRouteProvider } from '@/context/ProtectedRouteContext';

export const Route = createRootRoute({
    component: () => (
        <ProtectedRouteProvider>
            <div className="flex h-dvh flex-col">
                <Navbar />
                <div className="flex flex-grow flex-col">
                    <Outlet />
                </div>
                <Footer />
                <TanStackRouterDevtools />
            </div>
        </ProtectedRouteProvider>
    ),
});
