import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from '../components/Icons';

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
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
    },
    {
        icon: <MapIcon />,
        title: 'Community',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
    },
    {
        icon: <PlaneIcon />,
        title: 'Scalability',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
    },
    {
        icon: <GiftIcon />,
        title: 'Gamification',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum',
    },
];

export const HowItWorks = () => {
    return (
        <section
            id="howItWorks"
            className="container mx-auto px-4 py-24 sm:py-32"
        >
            <h2 className="text-center text-3xl font-bold md:text-center md:text-4xl">
                How It{' '}
                <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                    Works
                </span>{' '}
                Step-by-Step Guide
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 mb-8 text-center text-xl md:w-3/4 md:text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Veritatis dolor pariatur sit!
            </p>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {features.map(({ icon, title, description }: FeatureProps) => (
                    <Card key={title} className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="grid place-items-center gap-4">
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
