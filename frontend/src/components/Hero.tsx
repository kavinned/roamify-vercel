import { useState } from "react";
import { TextAnimate } from "./ui/text-animate";

export default function Hero() {
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <div className="relative overflow-hidden w-full bg-zinc-900 py-24 sm:py-32 min-h-64 max-h-64 mt-16 flex items-center justify-start drop-shadow-lg">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-12 w-12 rounded-full border-8 border-b-transparent border-teal-500 animate-spin"></div>
            </div>
            <img
                src="assets/hero-image.jpg"
                alt=""
                className="absolute inset-0 w-screen object-cover object-top opacity-100 h-full z-1 mix-blend-plus-darker"
                onLoad={() => setImageLoaded(true)}
            />
            {imageLoaded && (
                <div className="z-20 mix-blend-difference">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0">
                            <TextAnimate
                                className="font-black md:text-8xl text-5xl text-white tracking-wide leading-snug text-shadow-gradient transition-[text-shadow] duration-500 ease-in-out"
                                as="h1"
                                animation="fadeIn"
                            >
                                Roamify
                            </TextAnimate>
                            <TextAnimate
                                className="text-3xl font-bold tracking-tight text-white sm:text-6xl"
                                animation="slideLeft"
                                delay={0.1}
                                as="h2"
                                by="character"
                            >
                                Explore the World
                            </TextAnimate>
                            <TextAnimate
                                className="mt-6 text-xl leading-8 text-gray-300 font-medium"
                                animation="slideDown"
                                delay={0.3}
                                as="p"
                                by="word"
                            >
                                Discover amazing places and plan your perfect
                                trip.
                            </TextAnimate>
                        </div>
                    </div>
                    <p className="text-white font-thin text-[0.7rem] opacity-50 hover:opacity-100 transition-opacity duration-300 absolute bottom-5 right-5 leading-3">
                        <TextAnimate delay={0.5} animation="blurIn" as="span">
                            Photo by
                        </TextAnimate>
                        <a
                            className="imgcredit hover:underline duration-300 transition-all"
                            href="https://unsplash.com/@cikstefan?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <TextAnimate
                                delay={0.5}
                                animation="blurIn"
                                as="span"
                            >
                                Štefan Štefančík
                            </TextAnimate>
                        </a>{" "}
                        on{" "}
                        <a
                            className="imgcredit hover:underline duration-300 transition-all"
                            href="https://unsplash.com/photos/man-standing-on-cliff-near-falls-0wMmxNB6Xzc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <TextAnimate
                                delay={0.5}
                                animation="blurIn"
                                as="span"
                            >
                                Unsplash
                            </TextAnimate>
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}
