# Documentacao do Projeto

Esta pasta concentra a documentacao viva do Nexo. O objetivo e permitir que o contexto operacional seja recuperado sem revarrer o repositorio inteiro.

Ultima revisao consolidada: 2026-07-27.

## Indice

- [Arquitetura](./architecture.md): contexto tecnico, estrutura, fluxos e riscos confirmados.
- [Regras de negocio](./business-rules.md): regras de dominio observadas no codigo atual.
- [Integracoes](./integrations.md): APIs, servicos externos e contratos relevantes.
- [Desenvolvimento](./development.md): setup local, comandos e validacoes.
- [Decisoes arquiteturais](./decisions.md): decisoes relevantes e suas consequencias.

## Quando consultar cada arquivo

- Use `architecture.md` quando precisar entender a organizacao do sistema, dependencias entre modulos, entrada da aplicacao ou fluxos principais.
- Use `business-rules.md` quando uma mudanca afetar validacoes, estados, permissoes, transicoes ou comportamentos do dominio.
- Use `integrations.md` quando a tarefa tocar em API, OAuth, contratos HTTP, clientes externos ou estrategia de erro/retry.
- Use `development.md` quando precisar saber como instalar, executar, validar ou operar o projeto localmente.
- Use `decisions.md` quando a tarefa envolver uma decisao tecnica que deva ser preservada como historico util.

## Pendencias identificadas

- A rota `/configuration` aparece na navegacao, mas nao ha pagina/rota correspondente registrada em `src/app/routes.tsx`.
- Nao foi encontrado provider global de tema, embora `src/view/components/ui/Sonner.tsx` use `next-themes`.
- Nao foram encontrados testes automatizados nem scripts dedicados de teste.
