export const Footer = () => {
    return (
        <footer id="footer">
            <hr className="mx-auto w-11/12" />

            {/* 
        1) The container now uses mx-auto to center itself. 
        2) We added text-center directly on the section so all child elements
           inherit centered text alignment by default.
        3) justify-items-center ensures each grid cell is centered horizontally.
      */}
            <section className="container mx-auto grid grid-cols-2 justify-items-center gap-x-12 gap-y-8 py-10 text-left md:grid-cols-4 xl:grid-cols-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Lorem Ipsum</h3>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Lorem
                        </a>
                    </div>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Ipsum
                        </a>
                    </div>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Dolor
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Sit Amet</h3>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Consectetur
                        </a>
                    </div>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Adipiscing
                        </a>
                    </div>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Elit
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Sed Do</h3>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Eiusmod
                        </a>
                    </div>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Tempor
                        </a>
                    </div>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Incididunt
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">Ut Labore</h3>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Et Dolore
                        </a>
                    </div>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Magna
                        </a>
                    </div>
                    <div>
                        <a
                            rel="noreferrer noopener"
                            href="#"
                            className="opacity-60 hover:opacity-100"
                        >
                            Aliqua
                        </a>
                    </div>
                </div>
            </section>

            <section className="container mx-auto pb-14 text-center">
                <h3>
                    &copy; 2024 Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit.{' '}
                    <a
                        rel="noreferrer noopener"
                        target="_blank"
                        href="https://www.example.com"
                        className="text-primary border-primary transition-all hover:border-b-2"
                    >
                        Lorem Ipsum
                    </a>
                </h3>
            </section>
        </footer>
    );
};
