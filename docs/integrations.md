# Integracoes

## Integracoes confirmadas

### API principal do Nexo

- Finalidade: autenticar usuarios, recuperar dados do perfil e listar repositorios GitHub.
- Direcao: navegador -> backend do Nexo.
- Modulo responsavel: `src/app/services/*` e hooks de `src/app/hooks/*`.
- Autenticacao/transporte: `axios` com `baseURL` em `VITE_BASE_API_URL` e `withCredentials: true`.
- Endpoints identificados:
  - `POST /auth/google`
  - `POST /auth/github`
  - `POST /auth/refresh-tokens`
  - `POST /auth/sign-out`
  - `GET /users/me`
  - `GET /github/repositories`
- Payloads relevantes:
  - login: resposta com `auth_url` e `message`
  - refresh: envio de `refresh_token`
  - refresh: resposta com `access_token` e `refresh_token`
  - `me`: `id`, `name`, `avatar_url`, `is_github_app_installed`
  - repositorios: lista com `id`, `name`, `full_name`, `private`, `owner`, `description`, `language`, `updated_at`
- Tratamento de erro:
  - queries e mutations nao fazem retry por padrao no `QueryClient`.
  - login e sign out exibem toast na camada de pagina quando necessario.
  - interceptacao de `401` tenta renovar a sessao antes de repetir a requisicao original.
- Timeouts/retries/idempotencia: nao configurados no codigo atual.
- Arquivos relacionados:
  - [src/app/services/Services.ts](../src/app/services/Services.ts)
  - [src/app/services/AuthService.ts](../src/app/services/AuthService.ts)
  - [src/app/services/UserService.ts](../src/app/services/UserService.ts)
  - [src/app/services/GitHubService.ts](../src/app/services/GitHubService.ts)

### OAuth Google

- Finalidade: iniciar login via Google.
- Direcao: navegador -> backend do Nexo -> redirecionamento externo.
- Modulo responsavel: `AuthService` + hook `useStartLoginWithGoogle`.
- Configuracao: usa a base da API do projeto.
- Fluxo: o backend devolve `auth_url` e o navegador e redirecionado para essa URL.
- Observacao: o callback deve retornar `refreshToken`.

### OAuth GitHub

- Finalidade: iniciar login via GitHub.
- Direcao: navegador -> backend do Nexo -> redirecionamento externo.
- Modulo responsavel: `AuthService` + hook `useStartLoginWithGitHub`.
- Configuracao: usa a base da API do projeto.
- Fluxo: o backend devolve `auth_url` e o navegador e redirecionado para essa URL.
- Observacao: o callback deve retornar `refreshToken`.

### GitHub App

- Finalidade: instalar e usar o GitHub App associado ao produto.
- Direcao: navegador -> GitHub.
- Modulo responsavel: `src/view/components/HeaderDesktop.tsx` e `src/view/pages/User/Repositories/index.tsx`.
- URL externa identificada: `https://github.com/apps/app-nexo-AI/installations/new`.
- Autenticacao: depende da sessao GitHub do usuario na plataforma GitHub.
- Tratamento de erro: a tela de repositorios reage a `error=github_not_linked` e `error=app_install_failed`.
- Risco conhecido: o nome do app esta fixo em `app-nexo-AI`.

### Google Fonts

- Finalidade: carregar a familia Inter usada pela interface.
- Direcao: navegador -> Google Fonts.
- Modulo responsavel: `index.html`.
- Configuracao: `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`.
- Observacao: integra a camada visual, nao a regra de negocio.

## Integracoes internas relevantes

### React Query

- Finalidade: cache e sincronizacao de consultas/mutations.
- Direcao: componentes -> hooks -> servicos.
- Modulo responsavel: `src/app/lib/queryClient.ts`, hooks de `src/app/hooks/*`.
- Estrategia: sem retry e sem refetch ao focar a janela.

### Persistencia local de tokens

- Finalidade: reter o `refreshToken` entre recargas.
- Direcao: `AuthProvider` -> `localStorage`.
- Modulo responsavel: `src/app/lib/AuthTokensManager.ts`.
- Dados persistidos: apenas `refreshToken`.

## Integracoes nao identificadas

- Banco de dados local no front-end: nao identificado.
- Fila, scheduler e worker: nao identificados.
- Webhook, analytics, push ou notificacao externa: nao identificados.
- CI/CD automatizado: nao identificado no repositorio.

## Pontos de atencao

- A condicao de exclusao do refresh no interceptor usa `/auth/refresh-token`, mas o servico chama `/auth/refresh-tokens`.
- Nao ha timeout explicito configurado para os clientes HTTP.
- Nao foi encontrado provider global de tema, embora o toaster leia `next-themes`.

## Quando atualizar este documento

Atualize este arquivo quando houver mudancas em contratos, autenticacao, clientes, payloads, eventos, variaveis de ambiente ou estrategia de erro.
