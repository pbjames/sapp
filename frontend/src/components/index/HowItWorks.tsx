import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from './Icons';

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const features: FeatureProps[] = [
    {
        icon: <MedalIcon />,
        title: 'Accessibility',
        description:
            'Use our effortless platform to analyze your Zora coins and earn as a creator.',
    },
    {
        icon: <MapIcon />,
        title: 'Community',
        description:
            'Engage with our community of creators and share your insights.',
    },
    {
        icon: <PlaneIcon />,
        title: 'Scalability',
        description:
            'Our platform is designed to grow with you, providing the tools you need as you scale.',
    },
    {
        icon: <GiftIcon />,
        title: 'Gamification',
        description: 'Earn crypto from your Zora coins',
    },
];

export const HowItWorks = () => {
    return (
        <section
            id="howItWorks"
            className="container mx-auto w-full max-w-5xl px-4 py-24 sm:py-32"
        >
            <h2 className="text-center text-3xl font-bold md:text-center md:text-4xl">
                How It{' '}
                <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                    Works
                </span>{' '}
                Step-by-Step Guide
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 mb-8 text-center text-xl md:w-3/4 md:text-center">
                Explore the features of our platform and learn how to make the
                most of SAPP.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {features.map(({ icon, title, description }: FeatureProps) => (
                    <Card key={title} className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-2">
                                {icon}
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>{description}</CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
