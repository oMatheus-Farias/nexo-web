import { LoaderCircle, LogOut } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAuth } from '@/app/contexts/auth/useAuth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/view/components/ui/AlertDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/view/components/ui/DropdownMenu';

import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';

export function DropdownMenuSidebar() {
  const { signOut, isSignOutPending } = useAuth();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleSignOutToggle() {
    setIsDropdownOpen(false);
    setTimeout(() => {
      setIsAlertOpen(true);
    }, 0);
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch {
      toast.error('Erro ao sair da aplicação. Por favor, tente novamente.');
    }
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="w-full rounded-xl border border-[#3A3A3A] bg-[#1D1D1D] py-2 pr-3 pl-2.5 transition-all duration-100 ease-linear hover:bg-[#272727] focus:ring-2 focus:ring-[#272727] focus:outline-none">
          <div className="flex cursor-pointer items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="max-h-6 min-h-6 max-w-6 min-w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start">
                <p className="text-sm font-medium text-[#E2E2E2]">Alex Morgan</p>
              </div>
            </div>

            <Badge className="px-1.5 text-[10px] font-semibold">Free</Badge>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-48 border-[#3A3A3A] bg-[#1D1D1D]">
          <DropdownMenuLabel aria-hidden="true" className="hidden"></DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={handleSignOutToggle}
            className="text-[#fb2c36] hover:cursor-pointer hover:bg-[#272727] focus:bg-[#272727] focus:outline-none"
          >
            <LogOut color="#fb2c36" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="border-[#3A3A3A]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#E2E2E2]">Confirmar saída</AlertDialogTitle>
            <AlertDialogDescription className="text-[#deebff]">
              Tem certeza que deseja sair da aplicação?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer text-[#E2E2E2]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isSignOutPending}
              onClick={handleSignOut}
              className="cursor-pointer bg-red-500 hover:bg-red-600 hover:text-red-500"
            >
              {isSignOutPending ? (
                <LoaderCircle
                  aria-label="Carregando"
                  color="white"
                  size={20}
                  className="animate-spin"
                />
              ) : (
                'Sair'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
