import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '@/components/dashboard/dashboard';
import { Button } from '@/components/ui/button';
import ai from '@/lib/api/ai';
import { Loader2, Rocket } from 'lucide-react';
import React, { useState } from 'react';

export const Route = createFileRoute('/app/generate-ideas')({
    component: RouteComponent,
});

function RouteComponent() {
    const [value, setValue] = useState('');
    const [idea, setIdea] = useState<{
        content: string;
        image: string | null;
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState<boolean>(false);

    const handleGenerate = async () => {
        setLoading(true);
        const response = await ai.getIdeaGeneration(value);

        setIdea({
            content: response.data.content,
            image: null,
        });
        setLoading(false);
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

    if (idea) {
        return (
            <Dashboard>
                <section className="flex flex-col items-center px-[15%] pt-10">
                    <h1 className="mb-2 text-2xl font-bold">Generated Idea</h1>
                    <p className="mb-6 text-center">
                        Your idea has been generated! You can use the
                        information below to create your coin.
                    </p>
                    <div className="flex w-full flex-col gap-2 rounded-md border bg-white p-4 shadow">
                        <h2 className="text-lg font-semibold">Content</h2>
                        <p className="text-gray-700">
                            {idea.content.split('\n').map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                        <h2 className="text-lg font-semibold">Image</h2>
                        {idea.image ? (
                            <img
                                src={idea.image}
                                alt="Generated Coin"
                                className="mt-2 w-full rounded-md"
                            />
                        ) : (
                            <>
                                <p className="text-gray-700">
                                    {!imgLoading ? (
                                        'No image generated yet.'
                                    ) : (
                                        <Loader2 className="h-8 w-8 animate-spin" />
                                    )}
                                </p>
                                <Button
                                    className="mt-4 flex w-full max-w-xs cursor-pointer items-center gap-2"
                                    onClick={async () => {
                                        // Handle image generation here
                                        setImgLoading(true);
                                        setIdea({
                                            content: idea.content,
                                            image:
                                                (
                                                    await ai.getImageGeneration(
                                                        idea.content
                                                    )
                                                ).data.content || null,
                                        });
                                        setImgLoading(false);
                                    }}
                                >
                                    Generate Image
                                    <Rocket className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                        <img src="" alt="" />
                    </div>
                </section>
            </Dashboard>
        );
    }

    return (
        <Dashboard>
            <section className="mx-auto flex max-w-2xl flex-grow flex-col items-center justify-center gap-4 p-4">
                <h1 className="text-3xl font-bold">Generate Ideas</h1>
                <p className="text-center">
                    Have an idea for a coin? Put it in below, and we will
                    generate you a coin and photo for it! We will also include
                    your last 5 reports in the context.
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
