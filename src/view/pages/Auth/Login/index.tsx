import githubIcon from '@/view/assets/github-icon.svg';
import googleIcon from '@/view/assets/google-icon.svg';
import nexoLogo from '@/view/assets/nexo-logo.svg';
import { Button } from '@/view/components/ui/Button';

import { useLoginController } from './useLoginController';

export default function LoginPage() {
  const {
    handleStartLoginWithGoogle,
    isStartLoginWithGooglePending,
    handleStartLoginWithGitHub,
    isStartLoginWithGitHubPending,
  } = useLoginController();

  return (
    <main className="mx-auto h-full w-full max-w-125 rounded-3xl border border-[#2A2A2A] bg-[#131313] p-8 lg:w-2/5 lg:max-w-full">
      <img src={nexoLogo} alt="Nexo Logo" className="w-32" />

      <h1 className="mt-16 text-2xl font-medium text-[#FBFBFB]">
        Boas vindas ao{' '}
        <span className="-webkit-text-fill-transparent block bg-linear-to-r from-[#B5D3FF] to-[#00337F] bg-clip-text text-transparent">
          Nexo.
        </span>
      </h1>

      <p className="mt-6">
        Teste gratuitamente entrando com a sua conta Google ou GitHub para começar a aproveitar
        nossa plataforma.
      </p>

      <form className="mt-20 flex w-full flex-col gap-6">
        <Button
          type="button"
          disabled={isStartLoginWithGitHubPending || isStartLoginWithGooglePending}
          onClick={handleStartLoginWithGitHub}
          className="duration- flex h-12 w-full cursor-pointer items-center gap-2 rounded-xl border border-[#282828] bg-[#0c0c0c] text-base font-medium text-white transition-all hover:bg-[#181818]"
        >
          <img src={githubIcon} alt="GitHub Icon" className="h-6 w-6" />
          GitHub
        </Button>

        <Button
          type="button"
          disabled={isStartLoginWithGooglePending || isStartLoginWithGitHubPending}
          onClick={handleStartLoginWithGoogle}
          className="duration- flex h-12 w-full cursor-pointer items-center gap-2 rounded-xl bg-[#FBFBFB] text-base font-medium text-gray-500 transition-all"
        >
          <img src={googleIcon} alt="Google Icon" className="h-6 w-6" />
          Google
        </Button>
      </form>

      <p className="mt-5 text-sm">
        Criando uma conta, você concorda com todos os nossos{' '}
        <a href="#" className="underline underline-offset-2">
          termos e condições
        </a>
        .
      </p>
    </main>
  );
}
