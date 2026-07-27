# Regras de negocio

As regras abaixo foram confirmadas no codigo atual. Quando a evidencia e apenas indireta, isso esta indicado no proprio item.

## Autenticacao e sessao

### BR-001 - Login inicia por Google ou GitHub

- Descricao: o usuario so inicia autenticao pela tela de login usando um dos provedores expostos.
- Evidencia: `src/view/pages/Auth/Login/index.tsx`, `src/view/pages/Auth/Login/useLoginController.ts`, `src/app/services/AuthService.ts`.
- Condicoes: o usuario aciona o botao Google ou GitHub.
- Validacao: o front chama o endpoint correspondente e redireciona o navegador para `auth_url`.
- Impacto: a autenticacao depende da resposta do backend e de redirecionamento externo.

### BR-002 - Callback exige `refreshToken`

- Descricao: as telas de callback so concluem o fluxo quando a query string contem `refreshToken`.
- Evidencia: `src/view/pages/Auth/GoogleCallback/useGoogleCallback.ts`, `src/view/pages/Auth/GitHubCallback/useGitHubCallback.ts`.
- Condicoes: o usuario retorna do fluxo OAuth para `/auth/google/callback` ou `/auth/github/callback`.
- Excecao: se o parametro nao existir, o usuario e enviado para `/login`.
- Impacto: o backend precisa entregar o token na query string para o fluxo funcionar.

### BR-003 - Apenas o refresh token e persistido localmente

- Descricao: o sistema salva somente `refreshToken` em `localStorage`.
- Evidencia: `src/app/lib/AuthTokensManager.ts`, `src/app/contexts/auth/AuthContext.tsx`, `src/app/services/AuthService.ts`.
- Condicoes: login bem-sucedido ou restauracao de sessao.
- Estados envolvidos: token ausente, token presente, token invalido.
- Impacto: o `access_token` retornado pelo backend nao e mantido pelo cliente.

### BR-004 - Area logada e restrita a usuarios autenticados

- Descricao: paginas da area de usuario exigem sessao valida.
- Evidencia: `src/view/pages/_Layouts/UserLayout.tsx`, `src/view/pages/_Layouts/AuthLayout.tsx`.
- Condicoes: `signedIn` derivado de `useMe`.
- Excecao: usuario nao autenticado e redirecionado para `/login`; usuario autenticado que tenta acessar login e redirecionado para `/home`.
- Impacto: a navegacao e protegida no nivel de layout.

### BR-005 - Repositorios GitHub so carregam quando o app esta instalado

- Descricao: a consulta de repositorios so e habilitada quando `me.is_github_app_installed === true`.
- Evidencia: `src/view/pages/User/Repositories/index.tsx`, `src/app/hooks/queries/gitHub/useGetGitHubRepositories.ts`, `src/app/services/UserService.ts`.
- Condicoes: usuario autenticado e com GitHub App instalado.
- Excecao: se o app nao estiver instalado, a lista nao e buscada.
- Impacto: a tela depende do estado de integracao com GitHub para funcionar.

### BR-006 - Instalacao bem-sucedida do GitHub App gera feedback imediato

- Descricao: a pagina de repositorios reage a parametros de retorno da instalacao.
- Evidencia: `src/view/pages/User/Repositories/index.tsx`.
- Condicoes: query string contem `source=github_app_success`.
- Validacao: exibe toast de sucesso, chama `refetch()` e limpa os parametros da URL.
- Excecoes: `error=github_not_linked` e `error=app_install_failed` disparam toasts de erro.

### BR-007 - Sign out limpa sessao e cache

- Descricao: sair da aplicacao remove tokens, interceptores e cache de consultas.
- Evidencia: `src/app/contexts/auth/AuthContext.tsx`, `src/app/services/Services.ts`.
- Condicoes: usuario confirma a saida.
- Impacto: a aplicacao volta a exigir login e nao reaproveita dados em cache.

## Pontos pendentes de confirmacao

- A rota `/configuration` aparece na navegacao, mas nao encontrei pagina ou rota correspondente.
- O parametro `qcollaborators` e lido na pagina de repositorios, mas nao existe outro fluxo no repositorio que confirme sua origem ou finalidade.
- O uso de `next-themes` pelo toaster nao foi acompanhado de provider global encontrado no codigo.

## Quando atualizar este documento

Atualize este arquivo sempre que uma tarefa alterar validacoes, permissoes, estados, condicoes, calculos, transicoes ou comportamentos do dominio.
