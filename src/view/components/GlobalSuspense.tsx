export default function GlobalSuspense() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-5">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div>
          <h1 className="text-foreground text-center text-xl font-bold md:text-start">Nexo.</h1>
          <p className="text-muted-foreground text-center text-sm md:text-start">
            Aguarde um instante, estamos preparando o seu ambiente...
          </p>
        </div>
      </div>
    </div>
  );
}
