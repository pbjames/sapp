// @ts-nocheck
import Dashboard from '@/components/dashboard/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TriangleUpIcon } from '@radix-ui/react-icons';
import { Loader2, Rocket } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';
import profile, { ProfileResponse, ReportsResponse } from '@/lib/api/profile';
import ai, { AIProfileResponse } from '@/lib/api/ai';
import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/app/analyse-profile')({
    component: ProfileAnalysis,
});

interface TargetState {
    targetProfile: string | undefined;
    setTargetProfile: Dispatch<SetStateAction<string | undefined>>;
}

function ProfileAnalysis() {
    const [targetProfile, setTargetProfile] = useState<string>(undefined);
    return (
        <Dashboard>
            {targetProfile == undefined ? (
                <TargetSelection
                    targetProfile={targetProfile}
                    setTargetProfile={setTargetProfile}
                />
            ) : targetProfile == 'replaceMe' ? (
                <ChooseTarget
                    targetProfile={targetProfile}
                    setTargetProfile={setTargetProfile}
                />
            ) : (
                <TargetAnalysis
                    targetProfile={targetProfile}
                    setTargetProfile={setTargetProfile}
                />
            )}
        </Dashboard>
    );
}

function ChooseTarget(props: TargetState) {
    const [value, setValue] = useState<string>('');
    return (
        <section className="mx-auto flex max-w-2xl flex-grow flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-3xl font-bold">Analyze a profile</h1>
            <p>
                Analyze a profile by entering the wallet address of the profile
                you want to analyze.
            </p>
            <div className="flex w-full flex-row gap-2">
                <section className="w-full rounded-lg bg-gradient-to-br from-purple-300 to-blue-500 p-1">
                    <input
                        className="bg-accent w-full rounded-md p-2 outline-0"
                        placeholder="0x123456789a..ff"
                        onChange={(e) => setValue(e.target.value)}
                    ></input>
                </section>
                <Button
                    className="flex h-full cursor-pointer items-center gap-2 !px-4 py-0"
                    onClick={() => props.setTargetProfile(value)}
                >
                    Analyze
                    <Rocket className="h-4 w-4" />
                </Button>
            </div>
        </section>
    );
}

function TargetSelection(props: TargetState) {
    return (
        <section className="flex h-full flex-col items-center">
            <div className="flex flex-col items-center justify-items-center text-center">
                <h1 className="flex items-center justify-items-center p-4 text-4xl font-black">
                    Analyze..
                </h1>
            </div>
            <section className="grid w-full flex-grow grid-cols-2">
                <button
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 transition-colors hover:bg-gray-300"
                    onClick={() => props.setTargetProfile('')}
                >
                    <h1 className="text-2xl font-semibold">My profile</h1>
                    <p className="text-sm text-gray-500">
                        Analyze your own profile.
                    </p>
                </button>
                <button
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 transition-colors hover:bg-gray-300"
                    onClick={() => props.setTargetProfile('replaceMe')}
                >
                    <h1 className="text-2xl font-semibold">Another profile</h1>
                    <p className="text-sm text-gray-500">
                        Analyze another profile by entering the wallet address.
                    </p>
                </button>
            </section>
        </section>
    );
}
function TargetAnalysis(props: TargetState) {
    const profileQ = useQuery<ProfileResponse>({
        queryKey: ['profile', props.targetProfile],
        queryFn: async () => {
            const p = await profile.getProfileByWallet(
                localStorage.getItem('jwt') || '',
                props.targetProfile
            );
            return p;
        },
    });
    const analysisQ = useQuery<AIProfileResponse>({
        queryKey: ['analysisProfile', props.targetProfile],
        queryFn: async () => ai.getAIProfileAnalysis(),
    });

    if (profileQ.status == 'pending' || analysisQ.status == 'pending') {
        return (
            <div className="flex h-[calc(122px-2rem)] w-full items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
        );
    }
    return (
        <section className="flex flex-col items-center justify-items-center space-y-2 px-[15%]">
            <section className="flex items-center pt-10">
                <div className="flex h-auto max-w-[25%] items-center justify-items-start p-4">
                    <img
                        src={profileQ.data?.avatar || null}
                        className="rounded-full object-contain"
                    />
                </div>
                <div className="flex flex-col justify-items-center space-y-1">
                    <h1 className="text-2xl font-bold">
                        {profileQ.data?.displayName}
                    </h1>
                    <h1 className="text-xs text-gray-500">
                        {profileQ.data?.handle}
                        {' @ '}
                        {profileQ.data?.wallet}
                    </h1>
                    <h1 className="text-[0.8rem] text-gray-500">
                        {profileQ.data?.bio}
                    </h1>
                </div>
            </section>
            <section className="rounded-lg bg-gradient-to-br from-purple-300 to-blue-400 p-1">
                <section className="bg-accent flex flex-col items-start justify-items-start space-y-2 space-x-4 rounded-md">
                    <div className="min-w-[50%] grow basis-0 p-2">
                        <h1 className="text-[1.10rem] font-semibold">
                            Bio Analysis
                        </h1>
                        {analysisQ.data?.bio_analysis}
                    </div>
                    <div className="grow basis-0 p-2">
                        <h1 className="text-[1.10rem] font-semibold">
                            General Coin Performance
                        </h1>
                        <divContent>
                            {analysisQ.data?.all_coin_summary}
                        </divContent>
                    </div>
                    <div className="grow basis-0 p-2">
                        <h1 className="text-[1.10rem] font-semibold">
                            Summary
                        </h1>
                        <divContent>
                            {analysisQ.data?.prompt_summary}
                        </divContent>
                    </div>
                </section>
            </section>
        </section>
    );
}
