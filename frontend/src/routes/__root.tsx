import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const Route = createRootRoute({
    component: () => (
        <div className="flex h-dvh flex-col">
            <Nav />
            <div className="flex flex-grow flex-col">
                <Outlet />
            </div>
            <Footer />
            <TanStackRouterDevtools />
        </div>
    ),
});
