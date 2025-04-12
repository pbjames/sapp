import {
    createRootRoute,
    Outlet,
    useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

function RootLayout() {
    const location = useRouterState({ select: (state) => state.location });
    const hideLayout = location.pathname.includes('/app');

    return (
        <div className="flex h-dvh flex-col">
            {!hideLayout && <Navbar />}

            <div className="flex flex-grow flex-col">
                <Outlet />
            </div>

            {!hideLayout && <Footer />}
        </div>
    );
}

export const Route = createRootRoute({
    component: RootLayout,
});
