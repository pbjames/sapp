import Dashboard from '@/components/dashboard/dashboard';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/reports')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Dashboard>reports</Dashboard>;
}
