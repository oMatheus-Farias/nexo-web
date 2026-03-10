import ShinyText from './ShinyText';

export default function GlobalSuspense() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-5">
      <ShinyText
        text="Nexo."
        speed={1}
        delay={0}
        color="#b5b5b5"
        shineColor="#ffffff"
        spread={120}
        direction="left"
        yoyo={true}
        pauseOnHover={false}
        disabled={false}
        className="text-foreground text-center text-3xl font-semibold md:text-start"
      />
    </div>
  );
}
