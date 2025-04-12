// @ts-nocheck
import Dashboard from '@/components/dashboard/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { TriangleUpIcon } from '@radix-ui/react-icons';
import { createFileRoute } from '@tanstack/react-router';
import profile, { ProfileResponse, ReportsResponse } from '@/lib/api/profile';
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
            ) : (
                <TargetAnalysis
                    targetProfile={targetProfile}
                    setTargetProfile={setTargetProfile}
                />
            )}
        </Dashboard>
    );
}
function TargetSelection(props: TargetState) {
    return (
        <section className="h-full items-center">
            <div className="flex flex-col items-center justify-items-center text-center">
                <h1 className="flex items-center justify-items-center p-4 text-4xl font-black">
                    Analyze..
                </h1>
            </div>
            <section className="grid min-h-screen grid-cols-2">
                <button
                    className="grid cursor-pointer grid-cols-1 items-center justify-items-center transition-colors hover:bg-gray-300"
                    onClick={() => props.setTargetProfile('')}
                >
                    <p className="text-2xl font-semibold">My profile</p>
                </button>
                <button
                    className="grid cursor-pointer grid-flow-col grid-cols-1 items-center justify-items-center transition-colors hover:bg-gray-300"
                    onClick={() => props.setTargetProfile('')}
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
            const p = await profile.getProfile(
                localStorage.getItem('jwt') || ''
            );
            return p;
        },
    });
    return (
        <section className="flex flex-col items-center justify-items-center space-y-2 px-[15%]">
            <section className="flex pt-10">
                <div className="flex justify-items-start p-4">
                    <img
                        src={profileQ.data?.avatar || ''}
                        className="h-auto w-50 object-contain"
                    />
                </div>
                <div className="flex flex-col justify-items-start space-y-1">
                    <h1 className="text-2xl font-bold">
                        {profileQ.data?.displayName}
                    </h1>
                    <h1 className="text-xs text-gray-500">
                        {profileQ.data?.handle}
                    </h1>
                    <h1 className="text-[0.8rem] text-gray-500">
                        {profileQ.data?.bio}
                    </h1>
                </div>
            </section>
            <p>hello</p>
            <section className="h-50 w-full rounded-lg bg-gradient-to-br from-purple-300 to-blue-500 p-1">
                <textarea
                    className="bg-accent h-full w-full rounded-md p-2 outline-0"
                    placeholder="✨ Customize your feedback.."
                ></textarea>
            </section>
        </section>
    );
}
