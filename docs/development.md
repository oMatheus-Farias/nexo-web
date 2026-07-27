# Desenvolvimento

## Pre-requisitos

- Node.js: versao nao identificada no repositorio.
- Gerenciador de pacotes: `pnpm`.
- Navegador moderno para executar a SPA.
- Git, para usar Husky, lint-staged e commitlint.

## Instalacao

- Instale dependencias com `pnpm install` na raiz.
- O projeto usa `pnpm-workspace.yaml` e `pnpm-lock.yaml`, entao `pnpm` e o gerenciador confirmado.

## Configuracao local

- Crie o arquivo de ambiente a partir de `.env.example`.
- Variavel confirmada: `VITE_BASE_API_URL`.
- A variavel precisa ser uma URL valida, porque `src/app/config/env.ts` valida o `import.meta.env` com `zod`.
- Nao foram identificadas outras variaveis obrigatorias.

## Execucao

- Desenvolvimento: `pnpm dev`
- Build: `pnpm build`
- Preview do build: `pnpm preview`

## Validacoes

- Lint: `pnpm lint`
- Type-check: `pnpm typecheck`
- Build: `pnpm build` executa `tsc -b` e depois `vite build`
- Testes automatizados: nao ha script identificado

## Formatacao e hooks

- Formatacao automatica no pre-commit: `npx prettier --write` via `lint-staged`.
- Lint automatizado no pre-commit: `npx eslint --no-warn-ignored` via `lint-staged`.
- Instalaacao dos hooks: `pnpm prepare` executa `husky install`.
- Commit-msg hook: `npx --no -- commitlint --edit <arquivo>`.

## Comandos auxiliares e geracao

- Migracoes: nao identificadas.
- Seeds: nao identificados.
- Geracao de codigo: nao identificada.
- Containers: nao identificados.
- Servicos auxiliares: nao identificados.

## Convencoes de codigo

- TypeScript estrito com `strict`, `noUnusedLocals`, `noUnusedParameters` e outras checagens ativadas.
- Alias `@/*` aponta para `src/*`.
- Componentes e rotas usam imports absolutos a partir de `@`.
- Ordenacao de imports e aplicada por `eslint-plugin-simple-import-sort`.
- `eqeqeq` e obrigatorio; `console` gera aviso.
- Interfaces seguem o padrao `I...` por regra de lint atual.
- A UI usa Tailwind CSS 4, shadcn/radix e componentes locais em `src/view/components/ui`.

## Padroes de fluxo

- Estado de servidor sempre passa por React Query.
- Auth e centralizada no `AuthProvider`.
- Chamadas HTTP passam pelos servicos em `src/app/services`.
- Rotas sao carregadas sob demanda com `React.lazy`.

## Solucao de problemas

- Se a aplicacao nao subir, confirme `VITE_BASE_API_URL`; a validacao do `zod` falha na inicializacao quando a URL e invalida ou ausente.
- Se os hooks Git nao forem executados, rode `pnpm prepare` e verifique `husky`.
- Se o login quebrar, confirme se o backend retorna `auth_url` e se o callback devolve `refreshToken` na query string.
- Se o refresh de sessao falhar repetidamente, verifique a divergencia entre `/auth/refresh-token` e `/auth/refresh-tokens`.

## Checklist antes de concluir uma tarefa

- Rodar `pnpm lint`.
- Rodar `pnpm typecheck`.
- Rodar `pnpm build`.
- Revisar o diff completo.
- Verificar se a documentacao foi atualizada quando houver impacto.
- Confirmar que nenhuma variavel de ambiente nova foi omitida.

## Estado de testes

- Nao foram encontrados arquivos de teste nem script dedicado de test runner.
- Validacoes praticas de interface nao estao automatizadas neste repositorio.

## Quando atualizar este documento

Atualize este arquivo quando comandos, ferramentas, padroes, dependencias ou processos mudarem.
