import { GitBranchPlus, LoaderCircle, RefreshCw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/app/contexts/auth/useAuth';
import { useGetGitHubRepositories } from '@/app/hooks/queries/gitHub/useGetGitHubRepositories';
import { Badge } from '@/view/components/ui/Badge';
import { Button } from '@/view/components/ui/Button';
import { Input } from '@/view/components/ui/Input';
import { Toggle } from '@/view/components/ui/Toggle';

export default function RepositoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('qcollaborators') ?? '');
  const { me } = useAuth();
  const { githubRepositories, isFetchingGitHubRepositories, refetch } = useGetGitHubRepositories({
    enabled: me?.is_github_app_installed === true,
  });

  useEffect(() => {
    function clearParams() {
      setSearchParams((prev) => {
        prev.delete('source');
        prev.delete('error');
        return prev;
      });
    }

    const source = searchParams.get('source');
    const error = searchParams.get('error');

    if (source === 'github_app_success') {
      toast.success('Aplicativo do GitHub instalado com sucesso!');
      refetch();
      clearParams();
    }

    if (error === 'github_not_linked') {
      toast.error('Você precisa vincular sua conta do GitHub antes de instalar o app.');
      clearParams();
    }

    if (error === 'app_install_failed') {
      toast.error('Ocorreu um erro ao tentar instalar o Github App.');
      clearParams();
    }
  }, [refetch, searchParams, setSearchParams]);

  return (
    <article className="h-full w-full">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-white">Repositórios</h2>
          </div>

          <p className="text-muted-foreground">Gerencie os repositórios conectados.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => refetch()}
            disabled={isFetchingGitHubRepositories}
            className="bg-[#282828] hover:bg-[#333333] focus:bg-[#333333] active:bg-[#333333] data-[state=loading]:bg-[#333333]"
          >
            <RefreshCw
              className={isFetchingGitHubRepositories ? 'animate-spin' : ''}
              size={16}
              color="#fff"
            />
          </Button>

          <Button className="flex items-center gap-1">
            <GitBranchPlus size={16} color="#252525" />
            Adicionar repositório
          </Button>
        </div>
      </div>

      <div className="mt-6 w-full">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            placeholder="Buscar repositórios pelo nome..."
            value={searchTerm}
            className="pl-9"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {isFetchingGitHubRepositories ? (
          <div className="flex items-center gap-2 text-sm">
            <LoaderCircle className="animate-spin" size={16} />
            Carregando repositórios...
          </div>
        ) : githubRepositories && githubRepositories.length > 0 ? (
          githubRepositories.map((repo) => (
            <div
              key={repo.id}
              className="flex items-center justify-between rounded-[16px] border border-[#2A2A2A] bg-[#1F1F1F] p-4"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p>{repo.name}</p>
                  <Badge variant="default" className="bg-[#373737] text-[#C6C6C6]">
                    {repo.is_private ? 'Privado' : 'Público'}
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm text-[#C6C6C6]">
                  {repo.full_name ?? 'Sem descrição'}
                </p>

                <div className="mt-4 flex items-center gap-4">
                  <p className="text-sm text-[#C6C6C6]">
                    {repo.name ?? 'Linguagem não especificada'}
                  </p>
                  <p className="text-sm text-[#C6C6C6]">
                    Última atualização:{' '}
                    {new Date(repo.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="max-h-2 min-h-2 max-w-2 min-w-2 rounded-full bg-[#50C878]"></div>
                  <p className="text-xs text-[#C6C6C6]">Sincronizado</p>
                </div>

                <Button
                  aria-label="Atualizar"
                  variant="ghost"
                  size="sm"
                  className="hover:bg-[#282828]"
                >
                  <RefreshCw color="white" />
                </Button>

                <Toggle
                  variant="pill"
                  className="h-4.5 bg-[#373737] hover:bg-[#2A2A2A] data-[state=on]:bg-[#50C878]"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm">
            Nenhum repositório encontrado. Conecte seu GitHub para começar a gerenciar seus
            repositórios!
          </p>
        )}
      </div>
    </article>
  );
}
