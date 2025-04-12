// @ts-nocheck
import Dashboard from '@/components/dashboard/dashboard';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { TriangleUpIcon } from '@radix-ui/react-icons';
import { createFileRoute } from '@tanstack/react-router';
import { Dispatch, SetStateAction, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export const Route = createFileRoute('/app/analyse-profile')({
    component: ProfileAnalysis,
});

interface PreviewImage {
    blurhash: string;
    medium: string;
    small: string;
}
interface Avatar {
    small: PreviewImage;
    medium: PreviewImage;
}
interface BasicProfile {
    handle: string;
    avatar: Avatar;
    displayName: string;
    website: string;
}

interface TargetState {
    targetProfile: string | undefined;
    setTargetProfile: Dispatch<SetStateAction<string | undefined>>;
}

function ProfileAnalysis() {
    const [targetProfile, setTargetProfile] = useState<string>();
    const handleMeProfile = () => {
        setTargetProfile('0xme');
    };
    const handleOtherProfile = () => {
        setTargetProfile('0xother');
    };
    return (
        <Dashboard>
            {targetProfile?.length == 0 || targetProfile == undefined ? (
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
                    className="grid grid-cols-1 items-center justify-items-center transition-colors hover:bg-gray-300"
                    onClick={() => props.setTargetProfile('0xme')}
                >
                    <p className="text-2xl font-semibold">My profile</p>
                </button>
                <button
                    className="grid grid-flow-col grid-cols-1 items-center justify-items-center transition-colors hover:bg-gray-300"
                    onClick={() => props.setTargetProfile('0xother')}
                >
                    <p className="text-2xl font-semibold">Another profile</p>
                </button>
            </section>
        </section>
    );
    // TODO: Fix stupid footer
}
function TargetAnalysis(props: TargetState) {
    return (
        <section className="flex items-center justify-items-center">
            <section className="">
                <div></div>
                <div></div>
            </section>
            <section></section>
        </section>
    );
}
