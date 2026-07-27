# Decisoes arquiteturais e tecnicas

Este arquivo registra decisoes que ainda sao uteis para entender o sistema atual. Quando a decisao veio apenas da implementacao, isso e indicado.

## ADR-001 - Aplicacao em SPA com roteamento cliente

- Status: Aceita
- Data: Nao identificada
- Contexto: o produto e entregue como uma aplicacao front-end unica, com rotas publicas e protegidas.
- Decisao: usar React + Vite + BrowserRouter para renderizar tudo no cliente.
- Motivo: o codigo atual mostra bootstrap unico em `main.tsx`, roteamento em `routes.tsx` e telas carregadas via `lazy`.
- Consequencias: a navegacao depende do router do cliente e a inicializacao precisa do ambiente do navegador.
- Alternativas identificadas: nao identificadas no repositorio.
- Evidencias: [src/main.tsx](../src/main.tsx), [src/view/App.tsx](../src/view/App.tsx), [src/app/routes.tsx](../src/app/routes.tsx).
- Arquivos relacionados: [src/view/pages/\_Layouts/AuthLayout.tsx](../src/view/pages/_Layouts/AuthLayout.tsx), [src/view/pages/\_Layouts/UserLayout.tsx](../src/view/pages/_Layouts/UserLayout.tsx).

## ADR-002 - Estado de servidor com React Query e auth local em contexto

- Status: Aceita
- Data: Nao identificada
- Contexto: o app precisa consumir `me`, repositorios e endpoints de auth sem um store global pesado.
- Decisao: usar `@tanstack/react-query` para queries/mutations e `AuthProvider` para sessao.
- Motivo: o provider inicializa tokens, registra refresh, carrega o usuario e expõe a API de auth para a UI.
- Consequencias: o cache e o ciclo de vida dos dados ficam centralizados, e o logout pode limpar tudo de uma vez.
- Alternativas identificadas: nao identificadas no repositorio.
- Evidencias: [src/app/lib/queryClient.ts](../src/app/lib/queryClient.ts), [src/app/contexts/auth/AuthContext.tsx](../src/app/contexts/auth/AuthContext.tsx), [src/app/hooks/\*](../src/app/hooks).
- Arquivos relacionados: [src/app/lib/AuthTokensManager.ts](../src/app/lib/AuthTokensManager.ts).

## ADR-003 - Refresh token persistido no localStorage

- Status: Aceita
- Data: Nao identificada
- Contexto: a sessao precisa sobreviver a recarregamentos da pagina.
- Decisao: guardar apenas `refreshToken` em `localStorage`.
- Motivo: o codigo de auth salva e recarrega esse valor ao iniciar a aplicacao.
- Consequencias: o cliente nao persiste `access_token`; a renovacao depende do backend e do interceptor Axios.
- Alternativas identificadas: nao identificadas no repositorio.
- Evidencias: [src/app/lib/AuthTokensManager.ts](../src/app/lib/AuthTokensManager.ts), [src/app/contexts/auth/AuthContext.tsx](../src/app/contexts/auth/AuthContext.tsx), [src/app/services/AuthService.ts](../src/app/services/AuthService.ts).
- Arquivos relacionados: [src/app/services/Services.ts](../src/app/services/Services.ts).

## ADR-004 - Interceptor de refresh automatizado

- Status: Aceita
- Data: Nao identificada
- Contexto: requisicoes autenticadas podem expirar e retornar `401`.
- Decisao: interceptar respostas `401` e tentar renovar a sessao antes de repetir a requisicao original.
- Motivo: reduzir falhas por expiracao de token para o usuario.
- Consequencias: a estrategia depende de o refresh funcionar sem loop e de o backend manter o contrato esperado.
- Alternativas identificadas: nao identificadas no repositorio.
- Evidencias: [src/app/services/Services.ts](../src/app/services/Services.ts), [src/app/services/AuthService.ts](../src/app/services/AuthService.ts).
- Arquivos relacionados: [src/app/contexts/auth/AuthContext.tsx](../src/app/contexts/auth/AuthContext.tsx).

## ADR-005 - UI base com Tailwind, Radix e shadcn

- Status: Aceita
- Data: Nao identificada
- Contexto: a interface usa componentes reutilizaveis e tokens visuais via CSS.
- Decisao: manter Tailwind CSS 4, componentes Radix/shadcn e estilos globais em `src/view/index.css`.
- Motivo: o repositorio ja contem `components.json`, imports de `shadcn/tailwind.css` e componentes locais em `src/view/components/ui`.
- Consequencias: novos elementos devem seguir o sistema visual e os componentes base existentes.
- Alternativas identificadas: nao identificadas no repositorio.
- Evidencias: [components.json](../components.json), [src/view/index.css](../src/view/index.css), [src/view/components/ui](../src/view/components/ui).
- Arquivos relacionados: [package.json](../package.json).

## Quando atualizar este documento

Registre novas decisoes quando uma tarefa introduzir ou alterar arquitetura, dependencias estruturais, banco, autenticacao, integracao, padrao transversal, infraestrutura, estrategia de estado, abordagem de testes ou convencao importante.
