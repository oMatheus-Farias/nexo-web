import { useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import loginImage from '@/app/assets/login-image.png';
import loginVideo from '@/app/assets/login-video.mp4';
import { ROUTE_PATHS } from '@/app/constants/routePaths';
import { useAuth } from '@/app/contexts/auth/useAuth';

export default function AuthLayout() {
  const { signedIn } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);

  if (signedIn) {
    return <Navigate to={ROUTE_PATHS.userHome} replace={true} />;
  }

  return (
    <section className="flex h-screen w-full justify-center px-4 py-10">
      <div className="flex w-full max-w-300 items-center gap-6">
        <Outlet />

        <div className="relative hidden h-full w-3/5 overflow-hidden rounded-3xl select-none lg:block">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={loginImage}
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            style={{
              filter: 'brightness(0.8)',
              imageRendering: 'auto',
            }}
          >
            <source src={loginVideo} type="video/mp4" />
            Seu navegador não suporta vídeos HTML5.
          </video>

          <div className="relative z-10 flex h-full w-full flex-col py-14">
            <h2 className="-webkit-text-fill-transparent mx-auto mt-auto block max-w-125 bg-linear-to-r from-[#DEEBFF] to-[#92B4E6] bg-clip-text text-center text-3xl font-medium text-transparent">
              Tansforme a atividade do GitHub em relatórios prontos para o cliente
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
