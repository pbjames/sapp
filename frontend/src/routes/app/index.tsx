import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute, useProtectedRoute } from '@/context/ProtectedRouteContext';

// We can define beforeMatch if we need more complex route protection logic
export const Route = createFileRoute('/app/')({
    component: ProtectedAppRoute,
});

function AppContent() {
    // We can still access the context data with useProtectedRoute
    const { user } = useProtectedRoute();
    
    // This component only renders if the user is authenticated
    // All auth checks are handled by the ProtectedRoute component
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Protected App Page</h1>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="mb-2">This is a protected route that only authenticated users can see.</p>
                {user && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="mb-2">Logged in as: <strong>{user.username}</strong></p>
                        <p>Wallet address: <code>{user.wallet_address}</code></p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Wrap the actual content with the ProtectedRoute component
function ProtectedAppRoute() {
    return (
        <ProtectedRoute>
            <AppContent />
        </ProtectedRoute>
    );
}
