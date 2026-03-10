import { ROUTE_PATHS } from '@/app/constants/routePaths';
import FuzzyText from '@/view/components/FuzzyText';

export default function ErrorBoundaryFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
          500
        </FuzzyText>
        <FuzzyText baseIntensity={0.01} hoverIntensity={0.1} enableHover fontSize={24}>
          Erro inesperado, retorne para a Home e tente novamente.
        </FuzzyText>
        <a
          href={ROUTE_PATHS.login}
          className="text-base font-bold underline transition-all duration-200 ease-linear"
        >
          Ir para Home
        </a>
      </div>
    </div>
  );
}
