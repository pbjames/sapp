// @ts-nocheck
import Dashboard from '@/components/dashboard/dashboard';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Rocket } from 'lucide-react';
import analysis from '@/lib/api/analysis';

export const Route = createFileRoute('/app/analyse-coin')({
    component: CoinAnalysis,
});

function CoinAnalysis() {
    const [tokenAddress, setTokenAddress] = useState<string | undefined>(
        undefined
    );

    return (
        <Dashboard>
            {tokenAddress === undefined ? (
                <CoinSelection setTokenAddress={setTokenAddress} />
            ) : (
                <CoinAnalysisResult
                    tokenAddress={tokenAddress}
                    setTokenAddress={setTokenAddress}
                />
            )}
        </Dashboard>
    );
}

function CoinSelection({ setTokenAddress }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) setTokenAddress(input.trim());
    };

    return (
        <section className="mx-auto flex max-w-2xl flex-grow flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-3xl font-bold">Analyze Coin</h1>
            <p>
                Analyze a coin by entering the token address you want to
                analyze.
            </p>
            <form
                onSubmit={handleSubmit}
                className="flex w-full flex-row gap-2"
            >
                <section className="w-full rounded-lg bg-gradient-to-br from-purple-300 to-blue-500 p-1">
                    <input
                        type="text"
                        placeholder="0x123456789a..ff"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-accent w-full rounded-md p-2 outline-0"
                    />
                </section>
                <Button
                    type="submit"
                    className="flex h-full cursor-pointer items-center gap-2 !px-4 py-0"
                >
                    Analyze
                    <Rocket className="h-4 w-4" />
                </Button>
            </form>
        </section>
    );
}

function CoinAnalysisResult({ tokenAddress, setTokenAddress }) {
    const jwt = localStorage.getItem('jwt') || '';

    const { data, isLoading, error } = useQuery<AnalysisCoinResponse[]>({
        queryKey: ['coin-analysis', tokenAddress],
        queryFn: () => analysis.getAnalysisCoin(tokenAddress, jwt),
        enabled: !!tokenAddress,
    });

    if (isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
        );
    }

    if (error || !data?.length) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
                <p className="text-red-500">
                    Failed to load analysis for this token.
                </p>
                <Button onClick={() => setTokenAddress(undefined)}>
                    Try Another
                </Button>
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center space-y-6 px-[15%] pt-10">
            <h1 className="text-2xl font-bold">Analysis for {tokenAddress}</h1>
            {data.map((item, i) => (
                <div
                    key={i}
                    className="w-full rounded-md border bg-white p-4 shadow"
                >
                    <p className="text-sm text-gray-500">
                        Created: {new Date(item.created_at).toLocaleString()}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">Summary</h2>
                    <p className="text-gray-700">{item.summary}</p>

                    <h2 className="mt-4 text-lg font-semibold">
                        Predicted ROI
                    </h2>
                    <p className="text-sm text-gray-800">
                        {item.predicted_roi.toFixed(2)}%
                    </p>
                </div>
            ))}
            <section className="w-full rounded-lg bg-gradient-to-br from-purple-300 to-blue-500 p-1">
                <Textarea
                    className="h-24 w-full rounded-md p-2"
                    placeholder="Write your thoughts or feedback..."
                />
            </section>
            <Button
                variant="outline"
                onClick={() => setTokenAddress(undefined)}
            >
                Analyze Another Token
            </Button>
        </section>
    );
}
