import Dashboard from '@/components/dashboard/dashboard';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2, Rocket } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/app/generate-ideas')({
    component: RouteComponent,
});

function RouteComponent() {
    const [value, setValue] = useState('');
    const [idea, setIdea] = useState<{
        name: string;
        description: string;
        image: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        // api shit
    };

    if (loading) {
        return (
            <Dashboard>
                <section className="mx-auto flex max-w-2xl flex-grow flex-col items-center justify-center gap-4 p-4">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <h1 className="text-3xl font-bold">Generating...</h1>
                    <p>We are generating your idea, please wait...</p>
                </section>
            </Dashboard>
        );
    }

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
                        placeholder="Enter your idea here... ✨"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </section>
                <Button
                    className="mt-4 flex w-full max-w-xs cursor-pointer items-center gap-2"
                    onClick={handleGenerate}
                >
                    Generate
                    <Rocket className="h-4 w-4" />
                </Button>
            </section>
        </Dashboard>
    );
}
