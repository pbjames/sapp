import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import image from '@/assets/growth.png';
import image3 from '@/assets/reflecting.png';
import image4 from '@/assets/looking-ahead.png';

interface FeatureProps {
    title: string;
    description: string;
    image: string;
}

const features: FeatureProps[] = [
    {
        title: 'Intelligence',
        description:
            'We use advanced financial prediction models and sentiment analysis to bring you the freshest insights.',
        image: image4,
    },
    {
        title: 'Intuitive user interface',
        description:
            'Built with love, from scratch - our team cares about the user experience at every step.',
        image: image3,
    },
    {
        title: 'Our Team',
        description:
            'We are ready to help you with anything that stands in your path to creative expression!',
        image: image,
    },
];

const featureList: string[] = [
    'Our team',
    'Responsive design',
    'Intelligence',
    'Pricing',
    'Features',
    'Convienience',
    'Reviews',
];

export const Features = () => {
    return (
        <section
            id="features"
            className="container mx-auto w-full max-w-5xl space-y-8 px-4 pb-24 sm:pb-32"
        >
            <h2 className="text-center text-3xl font-bold lg:text-4xl">
                Many{' '}
                <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                    Great Features
                </span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
                {featureList.map((feature: string) => (
                    <Badge
                        key={feature}
                        variant="secondary"
                        className="text-sm"
                    >
                        {feature}
                    </Badge>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map(({ title, description, image }: FeatureProps) => (
                    <Card key={title}>
                        <CardHeader>
                            <CardTitle className="text-center">
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            {description}
                        </CardContent>
                        <CardFooter>
                            <img
                                src={image}
                                alt={`Feature ${title}`}
                                className="mx-auto w-[200px] lg:w-[300px]"
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};
