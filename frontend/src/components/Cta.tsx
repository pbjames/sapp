import { Button } from "./ui/button";

export const Cta = () => {
  return (
    <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
      <div className="container mx-auto px-4 lg:grid lg:grid-cols-2 place-items-center gap-8">
        {/* Left text column (centered on mobile, left-aligned on larger screens) */}
        <div className="text-center lg:text-left lg:col-start-1 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            All Your
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Ideas & Concepts{" "}
            </span>
            In One Interface
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi,
            sed!
          </p>
        </div>

        {/* Button container (centered on all screen sizes) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full lg:col-start-2">
          <Button className="w-full md:w-auto">Request a Demo</Button>
          <Button variant="outline" className="w-full md:w-auto">
            View all features
          </Button>
        </div>
      </div>
    </section>
  );
};
