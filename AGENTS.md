# AGENTS.md

## 1. Visao geral

- Projeto: Nexo.
- Objetivo: SPA front-end para autenticar usuarios com Google ou GitHub e acessar uma area logada com dados do usuario e repositorios GitHub.
- Dominio: dashboard/operacao de conteudo e integracao com GitHub.
- Perfis principais: visitante, usuario autenticado e usuario com GitHub App instalado.
- Capacidades principais: iniciar login OAuth, receber callback com `refreshToken`, manter sessao, consultar `me`, listar repositorios GitHub, iniciar instalacao do GitHub App e sair da aplicacao.
- Estado atual: front-end Vite/React funcional, sem backend, banco, filas, workers ou CI/CD identificados neste repositório.

## 2. Mapa do repositorio

- `src/app`: camada de aplicacao com configuracao, contexto de auth, servicos HTTP, hooks, constantes e utilitarios.
- `src/view`: camada de interface com rotas, layouts, paginas e componentes visuais.
- `src/view/components/ui`: biblioteca local de componentes de UI baseada em Radix/shadcn.
- `src/app/assets`: imagens, video e icones usados pela interface.
- `docs`: documentacao operacional viva do projeto.

## 3. Stack principal

- Linguagem: TypeScript.
- Runtime: navegador para a aplicacao; Node.js para tooling local.
- Framework: React 19.2.0 com Vite 7.3.1.
- Roteamento: `react-router-dom` 7.13.1.
- Estado de servidor: `@tanstack/react-query` 5.90.21.
- HTTP: `axios` 1.13.6.
- Validacao: `zod` 4.3.6.
- Formularios: `react-hook-form` 7.71.2.
- UI e estilos: Tailwind CSS 4.2.1, `@tailwindcss/vite`, shadcn config via `components.json`, Radix UI, `lucide-react`, `sonner`, `motion`.
- Auth/persistencia local: `localStorage` via `AuthTokensManager`.
- Gerenciador de pacotes: `pnpm`.

## 4. Comandos principais

- Instalacao: `pnpm install` na raiz do repo.
- Desenvolvimento: `pnpm dev` na raiz.
- Build: `pnpm build` na raiz.
- Preview do build: `pnpm preview` na raiz.
- Lint: `pnpm lint` na raiz.
- Type-check: `pnpm typecheck` na raiz.
- Formatacao automatica: `npx prettier --write` via `lint-staged` no pre-commit.
- Hooks Git: `pnpm prepare` instala Husky.
- Validacao de commit: `npx --no -- commitlint --edit <arquivo>` via hook `commit-msg`.
- Testes: nao ha script de testes identificado.
- Migrations, seeds e geracao de codigo: nao identificados.

## 5. Documentacao do projeto

- [docs/README.md](docs/README.md): indice central e mapa da documentacao.
- [docs/architecture.md](docs/architecture.md): arquitetura atual, fluxos e riscos.
- [docs/business-rules.md](docs/business-rules.md): regras de negocio confirmadas.
- [docs/integrations.md](docs/integrations.md): integracoes internas e externas.
- [docs/development.md](docs/development.md): fluxo real de desenvolvimento e validacoes.
- [docs/decisions.md](docs/decisions.md): decisoes arquiteturais e tecnicas relevantes.

## 6. Diretrizes permanentes para o Codex

- Antes de iniciar qualquer tarefa, leia este `AGENTS.md`.
- Consulte somente os documentos de `docs/` relacionados a tarefa atual.
- Nao faca uma nova varredura completa do repositorio quando o contexto ja estiver documentado e atualizado.
- Confirme no codigo apenas as areas diretamente relacionadas a tarefa.
- Compreenda o contexto antes de modificar qualquer arquivo.
- Nunca altere codigo sem analisar o impacto sobre modulos relacionados.
- Nunca remova funcionalidades existentes sem solicitacao explicita.
- Nunca faca gambiarra, patch temporario ou solucao fragil.
- Nunca mascare erros sem tratar sua causa.
- Nunca duplique logica que possa ser reutilizada adequadamente.
- Reutilize componentes, servicos, utilitarios e padroes existentes quando apropriado.
- Respeite a arquitetura existente.
- Preserve baixo acoplamento e alta coesao.
- Aplique responsabilidade unica.
- Priorize legibilidade e manutencao.
- Mantenha tipagem forte.
- Evite `any`, casts inseguros e supressoes de erro sem justificativa.
- Evite overengineering.
- Evite abstracoes prematuras.
- Evite otimizacoes sem evidencia.
- Nao introduza novas dependencias sem necessidade real.
- Preserve compatibilidade com o restante do sistema.
- Trate erros explicitamente.
- Considere seguranca, privacidade, autorizacao e exposicao de dados.
- Considere concorrencia e idempotencia quando aplicaveis.
- Considere performance com base em cenarios reais.
- Considere acessibilidade em toda interface.
- Preserve consistencia visual e comportamental.
- Nao altere arquivos fora do escopo sem justificativa.
- Faca mudancas incrementais e faceis de revisar.
- Adicione ou atualize testes quando o comportamento for alterado.
- Execute as validacoes relevantes antes de concluir uma tarefa.
- Nao declare que algo foi validado se nao tiver sido realmente executado.
- Registre riscos, limitacoes e pontos nao validados.
- Entregue codigo completo quando for solicitado codigo pronto para copiar.
- Nao apresente trechos desconectados quando a alteracao exigir o arquivo completo.
- Nao suponha a estrutura de arquivos que ainda nao foi analisada.
- Solicite ou leia os arquivos necessarios antes de modificar uma implementacao desconhecida.

## 7. Uso obrigatorio de Skills

- Antes de iniciar qualquer tarefa:
  1. Identifique quais Skills sao relevantes.
  2. Utilize apenas as Skills necessarias.
  3. Prefira a Skill mais especializada para a atividade.
  4. Combine Skills quando a tarefa envolver areas diferentes.
  5. Nao use uma Skill apenas porque ela esta instalada.
- Considere prioritariamente:
  - Project Orchestrator
  - Full Stack TypeScript Architect
  - React/Next Senior Developer
  - Express API Engineer
  - Database Designer
  - Code Reviewer
  - Professional UI/UX Designer
  - UI/UX Dashboard Specialist
  - Technical Documentation Writer
- Se houver uma Skill mais adequada ao contexto especifico, utilize-a.

## 8. Uso obrigatorio de MCPs

- Context7: use sempre que a tarefa depender de documentacao atualizada de frameworks, bibliotecas, APIs, SDKs, ORMs, ferramentas de build, ferramentas de teste, componentes, recursos recentes, APIs depreciadas ou comportamento especifico de versao.
- Antes de implementar algo dependente de uma biblioteca:
  1. Confirme a biblioteca e sua versao no projeto.
  2. Consulte a documentacao atual pelo Context7.
  3. Aplique apenas APIs compativeis com a versao identificada.
  4. Nao invente propriedades, metodos, configuracoes ou comandos.
- Playwright: use quando houver necessidade de inspecao de interface, reproducao de bug visual, validacao de fluxo, validacao responsiva, navegacao, estados, comportamento no navegador, testes E2E, screenshots ou acessibilidade pratica.
- GitHub: use quando a tarefa envolver PRs, issues, historico, branches, commits, revisao de alteracoes ou informacoes disponiveis apenas no repositorio remoto.

## 9. Fluxo obrigatorio de trabalho

1. Ler o `AGENTS.md`.
2. Identificar o escopo da solicitacao.
3. Consultar os documentos relevantes em `docs/`.
4. Selecionar as Skills necessarias.
5. Identificar os arquivos diretamente envolvidos.
6. Confirmar padroes existentes no codigo.
7. Consultar o Context7 quando houver dependencia de documentacao atual.
8. Planejar a alteracao.
9. Implementar a menor solucao completa e correta.
10. Validar com testes, lint, type-check, build ou Playwright, conforme aplicavel.
11. Revisar o proprio diff.
12. Verificar regressoes e efeitos colaterais.
13. Atualizar a documentacao afetada.
14. Resumir o que mudou, o que foi validado e o que permanece pendente.

## 10. Documentacao viva

- A documentacao faz parte da implementacao.
- Ao concluir qualquer tarefa futura, verifique se houve impacto em:
  - arquitetura;
  - estrutura de pastas;
  - comandos;
  - setup;
  - dependencias;
  - variaveis de ambiente;
  - regras de negocio;
  - integracoes;
  - contratos;
  - banco de dados;
  - fluxos;
  - decisoes arquiteturais;
  - padroes de desenvolvimento;
  - riscos conhecidos.
- Quando houver impacto, atualize os documentos respectivos na mesma tarefa.
- Nao deixe a atualizacao documental para depois.
- Nao atualize a documentacao se nao houver impacto real.
- Use este arquivo como indice operacional e `docs/` como fonte detalhada de verdade.
