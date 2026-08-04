import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  GitBranchPlus,
  GitCompareArrows,
  Github,
  LoaderCircle,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '@/app/contexts/auth/useAuth';
import { useAddRepositories } from '@/app/hooks/mutations/repositories/useAddRepositories';
import { useSyncRepositories } from '@/app/hooks/mutations/repositories/useSyncRepositories';
import { useSyncRepository } from '@/app/hooks/mutations/repositories/useSyncRepository';
import { useUpdateRepository } from '@/app/hooks/mutations/repositories/useUpdateRepository';
import { useGetGitHubRepositories } from '@/app/hooks/queries/gitHub/useGetGitHubRepositories';
import { useGitHubRepositories } from '@/app/hooks/queries/gitHub/useGitHubRepositories';
import { cn } from '@/app/lib/utils';
import { RepositoryService } from '@/app/services/RepositoryService';
import { Pagination } from '@/view/components/Pagination';
import { Badge } from '@/view/components/ui/Badge';
import { Button } from '@/view/components/ui/Button';
import { Input } from '@/view/components/ui/Input';
import { Toggle } from '@/view/components/ui/Toggle';

import { GenerateReportSheet } from './components/GenerateReportSheet';

const LIMIT_PER_PAGE = 10;

function getPageIndexFromSearchParams(searchParams: URLSearchParams) {
  const pageParam = Number(searchParams.get('page') ?? '1');

  if (!Number.isFinite(pageParam) || pageParam < 1) {
    return 0;
  }

  return pageParam - 1;
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return 'Nunca';
  }

  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

function getStatusLabel(status: RepositoryService.RepositoryStatus) {
  switch (status) {
    case 'SYNCED':
      return 'Sincronizado';
    case 'PENDING':
      return 'Pendente';
    case 'DISCONNECTED':
      return 'Desconectado';
    case 'PAUSED':
      return 'Pausado';
    case 'ERROR':
      return 'Erro';
  }
}

function getStatusBadgeClass(status: RepositoryService.RepositoryStatus) {
  switch (status) {
    case 'SYNCED':
      return 'bg-[#1C3B2A] text-[#7AE2A1]';
    case 'PENDING':
      return 'bg-[#3A3014] text-[#F4D06F]';
    case 'DISCONNECTED':
      return 'bg-[#3D1F1F] text-[#F2A2A2]';
    case 'PAUSED':
      return 'bg-[#2C2C2C] text-[#C6C6C6]';
    case 'ERROR':
      return 'bg-[#4A2020] text-[#FF9A9A]';
  }
}

export default function RepositoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { me } = useAuth();
  const searchTerm = searchParams.get('qrepositories') ?? '';
  const pageIndex = getPageIndexFromSearchParams(searchParams);
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [githubRepositorySearchTerm, setGitHubRepositorySearchTerm] = useState('');
  const [selectedRepositoryIds, setSelectedRepositoryIds] = useState<string[]>([]);
  const [reportSheetRepository, setReportSheetRepository] =
    useState<RepositoryService.RepositoryItem | null>(null);

  const {
    githubRepositories,
    githubRepositoriesMeta,
    isFetchingGitHubRepositories,
    refetch: refetchRepositories,
  } = useGetGitHubRepositories(
    {
      page: pageIndex + 1,
      limitPerPage: LIMIT_PER_PAGE,
      searchTerm: searchTerm || undefined,
    },
    {
      enabled: me?.is_github_app_installed === true,
    },
  );

  const {
    githubRepositories: installRepositories,
    isFetchingGitHubRepositories: isFetchingInstallRepositories,
    refetchGitHubRepositories,
  } = useGitHubRepositories({
    enabled: isDiscoveryOpen && me?.is_github_app_installed === true,
  });

  const { addRepositoriesFn, isAddRepositoriesPending } = useAddRepositories();
  const { syncRepositoriesFn, isSyncRepositoriesPending } = useSyncRepositories();
  const { syncRepositoryFn, isSyncRepositoryPending } = useSyncRepository();
  const { updateRepositoryFn, isUpdateRepositoryPending } = useUpdateRepository();

  const isBusy =
    isAddRepositoriesPending ||
    isSyncRepositoriesPending ||
    isSyncRepositoryPending ||
    isUpdateRepositoryPending;

  useEffect(() => {
    function clearParams() {
      setSearchParams((prev) => {
        const nextParams = new URLSearchParams(prev);
        nextParams.delete('source');
        nextParams.delete('error');
        return nextParams;
      });
    }

    const source = searchParams.get('source');
    const error = searchParams.get('error');

    if (source === 'github_app_success') {
      toast.success('Aplicativo do GitHub instalado com sucesso!');
      refetchRepositories();
      refetchGitHubRepositories();
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
  }, [refetchGitHubRepositories, refetchRepositories, searchParams, setSearchParams]);

  function handleSearchTermChange(value: string) {
    setSearchParams(
      (prev) => {
        const nextParams = new URLSearchParams(prev);
        if (value.trim()) {
          nextParams.set('qrepositories', value);
        } else {
          nextParams.delete('qrepositories');
        }
        nextParams.set('page', '1');
        return nextParams;
      },
      { replace: true },
    );
  }

  function handlePageChange(nextPageIndex: number) {
    setSearchParams(
      (prev) => {
        const nextParams = new URLSearchParams(prev);
        nextParams.set('page', String(nextPageIndex + 1));
        return nextParams;
      },
      { replace: true },
    );
  }

  async function handleSyncAllRepositories() {
    try {
      await syncRepositoriesFn();
      toast.success('Sincronização geral concluída.');
      await refetchRepositories();
      await refetchGitHubRepositories();
    } catch {
      toast.error('Não foi possível sincronizar os repositórios agora.');
    }
  }

  async function handleSyncRepository(repositoryId: string) {
    try {
      await syncRepositoryFn(repositoryId);
      toast.success('Repositório sincronizado.');
      await refetchRepositories();
      await refetchGitHubRepositories();
    } catch {
      toast.error('Não foi possível sincronizar este repositório.');
    }
  }

  async function handleToggleRepository(
    repository: RepositoryService.RepositoryItem,
    nextEnabled: boolean,
  ) {
    try {
      await updateRepositoryFn({
        repositoryId: repository.id,
        payload: { is_enabled: nextEnabled },
      });

      if (nextEnabled) {
        await syncRepositoryFn(repository.id);
      }

      await refetchRepositories();
      await refetchGitHubRepositories();
      toast.success(nextEnabled ? 'Sincronização reativada.' : 'Sincronização pausada.');
    } catch {
      toast.error('Não foi possível atualizar este repositório.');
    }
  }

  function handleOpenReportSheet(repository: RepositoryService.RepositoryItem) {
    setReportSheetRepository(repository);
  }

  function handleCloseReportSheet(open: boolean) {
    if (!open) {
      setReportSheetRepository(null);
    }
  }

  function toggleDiscoveryPanel() {
    setIsDiscoveryOpen((current) => {
      const nextValue = !current;
      if (!nextValue) {
        setSelectedRepositoryIds([]);
        setGitHubRepositorySearchTerm('');
      }

      return nextValue;
    });
  }

  function toggleSelectedRepository(repositoryId: string) {
    setSelectedRepositoryIds((current) =>
      current.includes(repositoryId)
        ? current.filter((id) => id !== repositoryId)
        : [...current, repositoryId],
    );
  }

  async function handleAddSelectedRepositories() {
    if (!selectedRepositoryIds.length) {
      toast.error('Selecione ao menos um repositório.');
      return;
    }

    try {
      await addRepositoriesFn({ external_repo_ids: selectedRepositoryIds });
      toast.success('Repositórios adicionados com sucesso.');
      setSelectedRepositoryIds([]);
      setGitHubRepositorySearchTerm('');
      setIsDiscoveryOpen(false);
      await refetchRepositories();
      await refetchGitHubRepositories();
    } catch {
      toast.error('Não foi possível adicionar os repositórios selecionados.');
    }
  }

  const filteredInstallRepositories = installRepositories.filter((repository) => {
    const search = githubRepositorySearchTerm.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return [repository.name, repository.full_name, repository.owner].some((value) =>
      value.toLowerCase().includes(search),
    );
  });

  return (
    <article className="h-full w-full">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-white">Repositórios</h2>
          </div>

          <p className="text-muted-foreground">Gerencie os repositórios conectados.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetchRepositories()}
            disabled={isFetchingGitHubRepositories || isBusy}
            className="border-[#2A2A2A] bg-[#1F1F1F] text-white hover:bg-[#2A2A2A]"
          >
            <RefreshCw
              className={isFetchingGitHubRepositories ? 'animate-spin' : ''}
              size={16}
              color="#fff"
            />
            Recarregar
          </Button>

          <Button
            size="sm"
            onClick={handleSyncAllRepositories}
            disabled={isBusy || isFetchingGitHubRepositories}
            className="bg-[#282828] text-white hover:bg-[#333333] focus:bg-[#333333] active:bg-[#333333]"
          >
            {isSyncRepositoriesPending ? (
              <LoaderCircle className="animate-spin" size={16} color="#fff" />
            ) : (
              <GitCompareArrows size={16} color="#fff" />
            )}
            Sincronizar repositórios
          </Button>

          <Button
            className="flex items-center gap-1"
            onClick={toggleDiscoveryPanel}
            disabled={isBusy}
          >
            <GitBranchPlus size={16} color="#252525" />
            {isDiscoveryOpen ? 'Fechar adição' : 'Adicionar repositório'}
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
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
        </div>
      </div>

      <GenerateReportSheet
        key={reportSheetRepository?.id ?? 'closed'}
        open={reportSheetRepository !== null}
        repository={reportSheetRepository}
        onOpenChange={handleCloseReportSheet}
        onReportGenerated={async () => {
          await refetchRepositories();
          await refetchGitHubRepositories();
        }}
      />

      {isDiscoveryOpen && (
        <section className="border-border/70 bg-card mt-6 overflow-hidden rounded-[32px] border shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
          <div className="border-border/70 border-b bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] px-5 py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    Adicionar repositórios
                  </h3>
                  <Badge variant="outline" className="border-border bg-background text-foreground">
                    {filteredInstallRepositories.length} disponíveis
                  </Badge>
                  <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                    {selectedRepositoryIds.length} selecionados
                  </Badge>
                </div>

                <p className="text-muted-foreground max-w-2xl text-sm">
                  Selecione os repositórios da instalação atual do GitHub para sincronizar com o
                  Nexo sem sair da aplicação.
                </p>
              </div>

              <Button
                onClick={handleAddSelectedRepositories}
                disabled={!selectedRepositoryIds.length || isAddRepositoriesPending}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
              >
                {isAddRepositoriesPending ? (
                  <LoaderCircle className="animate-spin" size={16} />
                ) : (
                  <CheckCircle2 size={16} />
                )}
                Adicionar selecionados
              </Button>
            </div>
          </div>

          <div className="px-5 py-5">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="text-muted-foreground h-4 w-4" />
                </div>
                <Input
                  value={githubRepositorySearchTerm}
                  onChange={(event) => setGitHubRepositorySearchTerm(event.target.value)}
                  placeholder="Buscar por nome, owner ou repositório"
                  className="pl-9"
                />
              </div>

              <p className="text-muted-foreground text-sm">
                Cards enxutos com as informações essenciais para decidir rapidamente.
              </p>
            </div>

            {isFetchingInstallRepositories ? (
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <LoaderCircle className="animate-spin" size={16} />
                Carregando repositórios do GitHub...
              </div>
            ) : filteredInstallRepositories.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredInstallRepositories.map((repository) => {
                  const isSelected = selectedRepositoryIds.includes(repository.id);

                  return (
                    <button
                      key={repository.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleSelectedRepository(repository.id)}
                      className={cn(
                        'group flex h-full min-h-44 w-full flex-col justify-between rounded-[24px] border p-4 text-left transition-all outline-none',
                        isSelected
                          ? 'border-primary/50 bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]'
                          : 'border-border bg-background hover:border-foreground/20 hover:bg-accent/25',
                      )}
                    >
                      <div className="flex min-w-0 items-start justify-between gap-4">
                        <div className="flex min-w-0 items-start gap-3">
                          <div
                            className={cn(
                              'flex size-10 shrink-0 items-center justify-center rounded-2xl border transition-colors',
                              isSelected
                                ? 'border-primary/20 bg-primary/10 text-primary'
                                : 'border-border bg-card text-foreground/80',
                            )}
                          >
                            <Github className="size-4" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-foreground truncate text-sm font-medium">
                              {repository.name}
                            </p>
                            <p className="text-muted-foreground mt-1 truncate text-sm">
                              {repository.full_name}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className="border-border bg-background text-muted-foreground shrink-0 text-xs"
                        >
                          {repository.isPrivate ? 'Privado' : 'Público'}
                        </Badge>
                      </div>

                      <div className="mt-6 flex items-end justify-between gap-3">
                        <div className="text-muted-foreground min-w-0 text-xs">
                          <p className="truncate">Owner: {repository.owner}</p>
                          <p className="truncate">github.com/{repository.full_name}</p>
                        </div>

                        <span
                          className={cn(
                            'shrink-0 text-xs font-medium transition-colors',
                            isSelected ? 'text-primary' : 'text-muted-foreground',
                          )}
                        >
                          {isSelected ? 'Selecionado' : 'Selecionar'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="border-border bg-background text-muted-foreground rounded-2xl border border-dashed px-4 py-5 text-sm">
                Nenhum repositório do GitHub foi encontrado para esta instalação.
              </div>
            )}
          </div>
        </section>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {isFetchingGitHubRepositories ? (
          <div className="flex items-center gap-2 text-sm">
            <LoaderCircle className="animate-spin" size={16} />
            Carregando repositórios...
          </div>
        ) : githubRepositories && githubRepositories.length > 0 ? (
          githubRepositories.map((repo) => (
            <div
              key={repo.id}
              className="flex flex-col gap-4 rounded-3xl border border-[#2A2A2A] bg-[#1F1F1F] p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg text-white">{repo.name}</p>
                  <Badge variant="default" className="bg-[#373737] text-[#C6C6C6]">
                    {repo.is_private ? 'Privado' : 'Público'}
                  </Badge>
                  <Badge variant="default" className={getStatusBadgeClass(repo.sync_status)}>
                    {getStatusLabel(repo.sync_status)}
                  </Badge>
                </div>

                <p className="truncate text-sm text-[#C6C6C6]">
                  {repo.full_name ?? 'Sem descrição'}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#C6C6C6]">
                  <p>Última sincronização: {formatDate(repo.last_synced_at)}</p>
                  <p>Última tentativa: {formatDate(repo.last_sync_attempt_at)}</p>
                  {repo.last_sync_error ? (
                    <p className="flex items-center gap-1 text-[#FF9A9A]">
                      <AlertTriangle size={14} />
                      {repo.last_sync_error}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  aria-label="Gerar relatório"
                  variant="outline"
                  size="sm"
                  className="border-[#2A2A2A] bg-[#1B1B1B] text-white hover:bg-[#262626]"
                  onClick={() => handleOpenReportSheet(repo)}
                  disabled={repo.sync_status === 'DISCONNECTED' || isBusy}
                >
                  <Sparkles size={16} />
                  Relatório
                </Button>

                <div className="flex items-center gap-1.5">
                  {repo.sync_status === 'SYNCED' ? (
                    <CheckCircle2 size={14} className="text-[#50C878]" />
                  ) : repo.sync_status === 'PAUSED' ? (
                    <Ban size={14} className="text-[#C6C6C6]" />
                  ) : (
                    <AlertTriangle size={14} className="text-[#F4D06F]" />
                  )}
                  <p className="text-xs text-[#C6C6C6]">
                    {repo.sync_status === 'DISCONNECTED' ? 'Desconectado' : 'Gerenciado'}
                  </p>
                </div>

                <Button
                  aria-label="Sincronizar repositório"
                  variant="ghost"
                  size="sm"
                  className="hover:bg-[#282828]"
                  onClick={() => handleSyncRepository(repo.id)}
                  disabled={repo.sync_status === 'PAUSED' || isBusy}
                >
                  <RefreshCw color="white" />
                </Button>

                <Toggle
                  variant="pill"
                  pressed={repo.is_enabled}
                  onPressedChange={(nextPressed) => handleToggleRepository(repo, nextPressed)}
                  disabled={isBusy}
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

      {githubRepositories && githubRepositories.length > 0 && (
        <div className="mt-8 border-t border-[#2A2A2A] pt-6">
          <Pagination
            pageIndex={pageIndex}
            limit={LIMIT_PER_PAGE}
            totalCount={githubRepositoriesMeta?.total_count ?? githubRepositories.length}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </article>
  );
}
