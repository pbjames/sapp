import Dashboard from '@/components/dashboard/dashboard';
import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@/context/ProtectedRouteContext';

// We can define beforeMatch if we need more complex route protection logic
export const Route = createFileRoute('/app/')({
    component: ProtectedAppRoute,
});

function ProtectedAppRoute() {
    return (
        <ProtectedRoute>
            <Dashboard>app</Dashboard>
        </ProtectedRoute>
    );
}
