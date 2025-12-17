import SplitText from "../AnimatedText";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-8">
      <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
        Rasmus Ferst
      </h1>
      <SplitText text="Crafting seamless digital experiences with a blend of creativity and code." className="text-2xl md:text-4xl max-w-3xl" type="lines"/>
    </section>
  );
}