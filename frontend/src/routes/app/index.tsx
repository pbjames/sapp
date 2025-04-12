import Dashboard from '@/components/dashboard/dashboard';
import { Card } from '@/components/ui/card';
import { TrendingResponse } from '@/lib/api/analysis';
import { ProfileResponse } from '@/lib/api/profile';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ChartNoAxesCombined, Coins } from 'lucide-react';

export const Route = createFileRoute('/app/')({
    component: RouteComponent,
});

function RouteComponent() {
    const profileQ = useQuery<ProfileResponse>({
        queryKey: ['profile'],
        queryFn: () => {
            return {
                username: 'fred',
                wallet: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
                zora: {
                    displayName: 'Freddy Snow',
                    handle: 'fred',
                    bio: 'I am Fred Bloggs',
                    avatar: null,
                    following: 100,
                    followers: 200,
                    holdings: [
                        {
                            id: '1',
                            symbol: 'ETH',
                            name: 'Ethereum',
                            preview: null,
                            amount: 1,
                            value: 2000,
                        },
                        {
                            id: '2',
                            symbol: 'BTC',
                            name: 'Bitcoin',
                            preview: null,
                            amount: 0.5,
                            value: 25000,
                        },
                    ],
                },
            };
        },
    });

    const trendingQ = useQuery<TrendingResponse>({
        queryKey: ['trending'],
        queryFn: () => [
            {
                id: '1',
                name: 'SICK COIN',
                symbol: 'SICK',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
            },
            {
                id: '2',
                name: 'EPIC COIN',
                symbol: 'EPIC',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
            },
            {
                id: '3',
                name: 'LIT COIN',
                symbol: 'LIT',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
            },
            {
                id: '4',
                name: 'BRO COIN',
                symbol: 'BRO',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
            },
            {
                id: '5',
                name: 'WOKE COIN',
                symbol: 'WOKE',
                preview: null,
                marketCap: 100000,
                marketCapDelta24h: 1000,
                price: 1,
            },
        ],
    });

    if (profileQ.status === 'pending' || trendingQ.status === 'pending') {
        return <div>Loading...</div>;
    }

    if (profileQ.status === 'error') {
        return <div>Profile Error: {JSON.stringify(profileQ.error)}</div>;
    }

    if (trendingQ.status === 'error') {
        return <div>Trending Error: {JSON.stringify(trendingQ.error)}</div>;
    }

    return (
        <Dashboard>
            <Card className="w-full gap-1 p-4">
                <h1 className="text-xl font-bold">
                    Welcome back, {profileQ.data.username}
                </h1>
                <div className="mt-2 flex flex-row flex-wrap items-center gap-6">
                    <div className="flex flex-row items-center gap-2">
                        {profileQ.data.zora.avatar ? (
                            <img
                                src={profileQ.data.zora.avatar}
                                alt="Avatar"
                                className="h-12 w-12 rounded-full"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                {profileQ.data.zora.displayName[0]}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <h2 className="text-lg leading-5 font-semibold">
                                {profileQ.data.zora.displayName}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {profileQ.data.zora.handle &&
                                    `@${profileQ.data.zora.handle}`}{' '}
                                ({profileQ.data.wallet})
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm">
                            <span className="font-semibold text-gray-600">
                                {profileQ.data.zora.following}
                            </span>{' '}
                            <span className="text-gray-500">following</span>
                        </span>
                        <span className="text-sm">
                            <span className="font-semibold text-gray-600">
                                {profileQ.data.zora.followers}
                            </span>{' '}
                            <span className="text-gray-500">followers</span>
                        </span>
                    </div>
                </div>
            </Card>
            <div className="mt-4 flex flex-row flex-wrap gap-4">
                <Card className="flex flex-grow basis-0 flex-col p-4">
                    <div className="flex flex-row items-center gap-3">
                        <Coins className="h-6 w-6 text-gray-500" />
                        <div className="flex flex-col">
                            <h2 className="text-lg leading-5 font-semibold">
                                Your Holdings
                            </h2>
                            <p className="text-sm text-gray-500">
                                {profileQ.data.zora.holdings.length} assets
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {profileQ.data.zora.holdings.map((holding) => (
                            <div
                                key={holding.id}
                                className="flex flex-row items-center gap-2"
                            >
                                {holding.preview ? (
                                    <img
                                        src={holding.preview}
                                        alt={holding.name}
                                        className="h-12 w-12 rounded-full"
                                    />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                        {holding.symbol}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">
                                        {holding.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {holding.symbol} - {holding.amount} (
                                        {holding.value} USD)
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="flex flex-grow basis-0 flex-col p-4">
                    <div className="flex flex-row items-center gap-3">
                        <ChartNoAxesCombined className="h-6 w-6 text-gray-500" />
                        <div className="flex flex-col">
                            <h2 className="text-lg leading-5 font-semibold">
                                Trending Coins
                            </h2>
                            <p className="text-sm text-gray-500">
                                {trendingQ.data.length} assets
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {trendingQ.data.map((coin) => (
                            <div
                                key={coin.id}
                                className="flex flex-row items-center gap-2"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                    {coin.preview ? (
                                        <img
                                            src={coin.preview}
                                            alt={coin.name}
                                            className="h-12 w-12 rounded-full"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                                            {coin.symbol}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">
                                        {coin.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {coin.symbol} - {coin.price} USD
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Market Cap: {coin.marketCap} USD (
                                        {coin.marketCapDelta24h > 0 ? '+' : ''}
                                        {coin.marketCapDelta24h} USD)
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </Dashboard>
    );
}
