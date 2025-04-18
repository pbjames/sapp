import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';

enum PopularPlanType {
    NO = 0,
    YES = 1,
}

interface PricingProps {
    title: string;
    popular: PopularPlanType;
    price: number;
    description: string;
    buttonText: string;
    benefitList: string[];
}

const pricingList: PricingProps[] = [
    {
        title: 'Free',
        popular: PopularPlanType.NO,
        price: 0,
        description:
            'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
        buttonText: 'Get Started',
        benefitList: [
            'Lorem ipsum dolor sit amet',
            'Consectetur adipiscing elit',
            'Sed do eiusmod tempor',
            'Incididunt ut labore et dolore',
            'Magna aliqua',
        ],
    },
    {
        title: 'Premium',
        popular: PopularPlanType.YES,
        price: 5,
        description:
            'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
        buttonText: 'Start Free Trial',
        benefitList: [
            'Lorem ipsum dolor sit amet',
            'Consectetur adipiscing elit',
            'Sed do eiusmod tempor',
            'Incididunt ut labore et dolore',
            'Magna aliqua',
        ],
    },
    {
        title: 'Enterprise',
        popular: PopularPlanType.NO,
        price: 40,
        description:
            'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
        buttonText: 'Contact US',
        benefitList: [
            'Lorem ipsum dolor sit amet',
            'Consectetur adipiscing elit',
            'Sed do eiusmod tempor',
            'Incididunt ut labore et dolore',
            'Magna aliqua',
        ],
    },
];

export const Pricing = () => {
    return (
        <section
            id="pricing"
            className="container mx-auto w-full max-w-5xl px-4 py-24 sm:py-32"
        >
            <h2 className="text-center text-3xl font-bold md:text-4xl">
                Get
                <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                    {' '}
                    Unlimited{' '}
                </span>
                Access
            </h2>
            <h3 className="text-muted-foreground pt-4 pb-8 text-center text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                reiciendis.
            </h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {pricingList.map((pricing: PricingProps) => (
                    <Card
                        key={pricing.title}
                        className={
                            pricing.popular === PopularPlanType.YES
                                ? 'shadow-black/10 drop-shadow-xl dark:shadow-white/10'
                                : ''
                        }
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                {pricing.title}
                                {pricing.popular === PopularPlanType.YES && (
                                    <Badge
                                        variant="secondary"
                                        className="text-primary text-sm"
                                    >
                                        Most popular
                                    </Badge>
                                )}
                            </CardTitle>
                            <div>
                                <span className="text-3xl font-bold">
                                    ${pricing.price}
                                </span>
                                <span className="text-muted-foreground">
                                    {' '}
                                    /month
                                </span>
                            </div>
                            <CardDescription>
                                {pricing.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">
                                {pricing.buttonText}
                            </Button>
                        </CardContent>
                        <hr className="mx-auto mb-4 w-4/5" />
                        <CardFooter>
                            <div className="space-y-4">
                                {pricing.benefitList.map((benefit: string) => (
                                    <span
                                        key={benefit}
                                        className="flex items-center"
                                    >
                                        <Check className="text-green-500" />
                                        <h3 className="ml-2">{benefit}</h3>
                                    </span>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
};
