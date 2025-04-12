import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQProps {
    question: string;
    answer: string;
    value: string;
}

const FAQList: FAQProps[] = [
    {
        question: 'Will this post coins on my behalf?',
        answer: 'No. We will never take charge of your account from you, our goal is only to provide key insights into trending ideas and movements on Zora!',
        value: 'item-1',
    },
    {
        question: 'How does the coin analysis work?',
        answer: 'We use time-series data to build a historical record of the coins performance, and correlate data with image contents using AI vision.',
        value: 'item-2',
    },
    {
        question: 'How do I contact the team?',
        answer: "You can reach us on GitHub by our link and submit an issue, or find us in whatever building we're in!",
        value: 'item-3',
    },
    {
        question: "What if I don't like the profile analysis?",
        answer: 'Our process is customisable, and you can personally tell the AI agent how it could improve, but remember - feedback is always important!',
        value: 'item-4',
    },
];

export const FAQ = () => {
    return (
        <section
            id="faq"
            className="container mx-auto w-full max-w-5xl px-4 pb-24 sm:pb-32"
        >
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
                Frequently Asked{' '}
                <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                    Questions
                </span>
            </h2>

            <Accordion
                type="single"
                collapsible
                className="AccordionRoot w-full"
            >
                {FAQList.map(({ question, answer, value }: FAQProps) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger className="text-left">
                            {question}
                        </AccordionTrigger>
                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="flex items-center justify-center">
                <h3 className="mt-8 text-center font-medium">
                    Still have questions?{' '}
                    <a
                        rel="noreferrer noopener"
                        href="#"
                        className="border-primary text-blue-500 transition-all hover:border-b-2"
                    >
                        Contact us
                    </a>
                </h3>
            </div>
        </section>
    );
};
