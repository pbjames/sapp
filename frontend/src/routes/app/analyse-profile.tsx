// @ts-nocheck
import Dashboard from '@/components/dashboard/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TriangleUpIcon } from '@radix-ui/react-icons';
import { Loader2 } from 'lucide-react';
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
    function handleForm(formData: FormData) {
        props.setTargetProfile(formData.get('wallet'));
    }
    return (
        <section className="grid h-full w-full grid-cols-1 grid-rows-1 items-center justify-items-center">
            <form
                action={handleForm}
                className="space-x-2 rounded-lg p-4 outline"
            >
                <label htmlFor="wallet">Wallet: </label>
                <input
                    name="wallet"
                    type="text"
                    placeholder="0x123456789a..ff"
                    className="rounded outline"
                />
                <Button type="submit">Submit</Button>
            </form>
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
                    className="grid cursor-pointer grid-cols-1 items-center justify-items-center transition-colors hover:bg-gray-300"
                    onClick={() => props.setTargetProfile('')}
                >
                    <p className="text-2xl font-semibold">My profile</p>
                </button>
                <button
                    className="grid cursor-pointer grid-flow-col grid-cols-1 items-center justify-items-center transition-colors hover:bg-gray-300"
                    onClick={() => props.setTargetProfile('replaceMe')}
                >
                    <p className="text-2xl font-semibold">Another profile</p>
                </button>
            </section>
        </section>
    );
}
function TargetAnalysis(props: TargetState) {
    const profileQ = useQuery<ProfileResponse>({
        queryKey: ['profile', 'analysis'],
        queryFn: async () => {
            const p = await profile.getProfileByWallet(
                localStorage.getItem('jwt') || '',
                props.targetProfile
            );
            return p;
        },
    });
    const analysisQ = useQuery<AIProfileResponse>({
        queryKey: ['analysisProfile'],
        queryFn: async () => ai.getAIProfileAnalysis(),
    });
    if (profileQ.status == 'pending') {
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
