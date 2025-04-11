import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex flex-grow items-center justify-center">
            <h1>Login</h1>
        </div>
    );
}
