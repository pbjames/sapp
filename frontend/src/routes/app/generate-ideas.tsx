import Dashboard from '@/components/dashboard/dashboard';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { Rocket } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/app/generate-ideas')({
    component: RouteComponent,
});

function RouteComponent() {
    const [idea, setIdea] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <Dashboard>
            <section className="mx-auto flex max-w-2xl flex-grow flex-col items-center justify-center gap-4 p-4">
                <h1 className="text-3xl font-bold">Generate Ideas</h1>
                <p>
                    Have an idea for a coin? Put it in below, and we will
                    generate you a coin and photo for it!
                </p>
                <section className="h-50 w-full rounded-lg bg-gradient-to-br from-purple-300 to-blue-500 p-1">
                    <textarea
                        className="bg-accent h-full w-full rounded-md p-2 outline-0"
                        placeholder="✨ Enter your idea here..."
                    />
                </section>
                <Button className="mt-4 flex w-full max-w-xs items-center gap-2">
                    Generate
                    <Rocket className="h-4 w-4" />
                </Button>
            </section>
        </Dashboard>
    );
}
