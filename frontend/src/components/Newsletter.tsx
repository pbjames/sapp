import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Newsletter = () => {
    interface FormValues {
        email: string;
    }

    const { handleSubmit, register } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('Subscribed with email:', data.email);
    };

    return (
        <section id="newsletter">
            <hr className="mx-auto w-11/12" />

            <div className="container py-24 sm:py-32">
                <h3 className="text-center text-4xl font-bold md:text-5xl">
                    Join Our Daily{' '}
                    <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                        Newsletter
                    </span>
                </h3>
                <p className="text-muted-foreground mt-4 mb-8 text-center text-xl">
                    Subscribe to stay updated with our latest news.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto flex w-full flex-col gap-4 md:w-6/12 md:flex-row md:gap-2 lg:w-4/12"
                >
                    <Input
                        placeholder="leomirandadev@gmail.com"
                        className="bg-muted/50 dark:bg-muted/80"
                        aria-label="email"
                    />
                    <Button>Subscribe</Button>
                </form>
            </div>

            <hr className="mx-auto w-11/12" />
        </section>
    );
};
