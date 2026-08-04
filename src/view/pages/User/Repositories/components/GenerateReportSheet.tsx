import { AlertTriangle, LoaderCircle, Sparkles } from 'lucide-react';
import { type FormEvent, useEffect, useRef, useState } from 'react';

import { useGenerateGithubRepositoryReport } from '@/app/hooks/mutations/reports/useGenerateGithubRepositoryReport';
import { ReportService } from '@/app/services/ReportService';
import { RepositoryService } from '@/app/services/RepositoryService';
import { Badge } from '@/view/components/ui/Badge';
import { Button } from '@/view/components/ui/Button';
import { Input } from '@/view/components/ui/Input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/view/components/ui/Sheet';

type ReportMessage =
  | {
      id: string;
      role: 'assistant';
      kind: 'intro' | 'report' | 'error';
      title?: string;
      content: string;
      report?: ReportService.GenerateGithubRepositoryReportResponse;
    }
  | {
      id: string;
      role: 'user';
      kind: 'request';
      content: string;
    };

interface IGenerateReportSheetProps {
  open: boolean;
  repository: RepositoryService.RepositoryItem | null;
  onOpenChange: (open: boolean) => void;
  onReportGenerated?: () => Promise<void> | void;
}

function formatDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDefaultPeriod() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 7);

  return {
    start: formatDateInputValue(start),
    end: formatDateInputValue(end),
  };
}

function toIsoStartOfDay(value: string) {
  return `${value}T00:00:00.000`;
}

function toIsoEndOfDay(value: string) {
  return `${value}T23:59:59.999`;
}

function formatReportStyle(style: ReportService.ReportStyle) {
  switch (style) {
    case 'EXECUTIVE':
      return 'Executivo';
    case 'TECHNICAL':
      return 'Técnico';
    case 'SPRINT':
      return 'Sprint';
    case 'WEEKLY':
      return 'Semanal';
  }
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-3">
      <p className="text-[11px] tracking-[0.14em] text-[#8E8E8E] uppercase">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function createIntroMessage(
  repository: RepositoryService.RepositoryItem | null,
): ReportMessage | null {
  if (!repository) {
    return null;
  }

  return {
    id: `intro-${repository.id}`,
    role: 'assistant',
    kind: 'intro',
    title: 'Pronto para analisar',
    content:
      'Escolha o período, o estilo do relatório e gere um resumo de alta densidade com métricas e análise em linguagem natural.',
  };
}

export function GenerateReportSheet({
  open,
  repository,
  onOpenChange,
  onReportGenerated,
}: IGenerateReportSheetProps) {
  const [reportStyle, setReportStyle] = useState<ReportService.ReportStyle>('EXECUTIVE');
  const [periodStart, setPeriodStart] = useState(getDefaultPeriod().start);
  const [periodEnd, setPeriodEnd] = useState(getDefaultPeriod().end);
  const [maxItemsPerType, setMaxItemsPerType] = useState('200');
  const [messages, setMessages] = useState<ReportMessage[]>(() => {
    const introMessage = createIntroMessage(repository);

    return introMessage ? [introMessage] : [];
  });
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const { generateGithubRepositoryReportFn, isGenerateGithubRepositoryReportPending } =
    useGenerateGithubRepositoryReport();

  const canGenerateReport = Boolean(repository?.id) && repository?.sync_status !== 'DISCONNECTED';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isGenerateGithubRepositoryReportPending]);

  async function handleGenerateReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!repository || !canGenerateReport) {
      return;
    }

    const requestMessage: ReportMessage = {
      id: `request-${Date.now()}`,
      role: 'user',
      kind: 'request',
      content: [
        `Gerar relatório ${formatReportStyle(reportStyle)} para ${repository.full_name}.`,
        `Período: ${periodStart} até ${periodEnd}.`,
        maxItemsPerType.trim() ? `Limite por tipo: ${maxItemsPerType.trim()}.` : null,
      ]
        .filter(Boolean)
        .join(' '),
    };

    setMessages((current) => [...current, requestMessage]);

    const parsedMaxItemsPerType = Number(maxItemsPerType.trim());

    try {
      const response = await generateGithubRepositoryReportFn({
        report_style: reportStyle,
        repository_external_id: repository.id,
        period_start: toIsoStartOfDay(periodStart),
        period_end: toIsoEndOfDay(periodEnd),
        max_items_per_type: Number.isFinite(parsedMaxItemsPerType)
          ? parsedMaxItemsPerType
          : undefined,
      });

      const reportMessage: ReportMessage = {
        id: `report-${response.report_id}`,
        role: 'assistant',
        kind: 'report',
        title: `Relatório ${formatReportStyle(response.report_style)}`,
        content: response.summary_text,
        report: response,
      };

      setMessages((current) => [...current, reportMessage]);
      await onReportGenerated?.();
    } catch {
      const errorMessage: ReportMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        kind: 'error',
        title: 'Falha ao gerar relatório',
        content:
          'Não foi possível concluir a análise agora. Verifique o período e tente novamente.',
      };

      setMessages((current) => [...current, errorMessage]);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex h-full w-full max-w-[100vw] flex-col border-l border-[#2A2A2A] bg-[#111111] p-0 text-white sm:max-w-[980px]"
      >
        <div className="border-b border-[#2A2A2A] bg-[radial-gradient(circle_at_top_right,rgba(80,200,120,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] px-6 py-5">
          <SheetHeader className="p-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="bg-[#1C3B2A] text-[#7AE2A1]">
                IA
              </Badge>
              <Badge variant="default" className="bg-[#262626] text-[#C6C6C6]">
                {repository ? repository.name : 'Selecione um repositório'}
              </Badge>
            </div>
            <SheetTitle className="text-xl tracking-tight text-white">
              Gerar relatório com IA
            </SheetTitle>
            <SheetDescription className="max-w-2xl text-sm text-[#A7A7A7]">
              Preencha o contexto da análise e acompanhe a resposta em formato de conversa.
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="grid flex-1 gap-4 overflow-hidden px-6 py-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <form
            onSubmit={handleGenerateReport}
            className="flex min-h-0 flex-col gap-4 overflow-y-auto rounded-[28px] border border-[#2A2A2A] bg-[#171717] p-4"
          >
            <div className="rounded-2xl border border-[#2A2A2A] bg-[#141414] p-4">
              <p className="text-[11px] tracking-[0.14em] text-[#8E8E8E] uppercase">Repositório</p>
              <p className="mt-1 truncate text-base font-medium text-white">
                {repository?.name ?? 'Nenhum selecionado'}
              </p>
              <p className="mt-1 truncate text-sm text-[#C6C6C6]">
                {repository?.full_name ?? 'Selecione um repositório para começar'}
              </p>
              {repository ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="default" className="bg-[#2A2A2A] text-[#C6C6C6]">
                    {repository.is_private ? 'Privado' : 'Público'}
                  </Badge>
                  <Badge variant="default" className="bg-[#2A2A2A] text-[#C6C6C6]">
                    {repository.sync_status}
                  </Badge>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3">
              <div className="space-y-2">
                <label className="text-xs tracking-[0.12em] text-[#8E8E8E] uppercase">
                  Estilo do relatório
                </label>
                <select
                  value={reportStyle}
                  onChange={(event) =>
                    setReportStyle(event.target.value as ReportService.ReportStyle)
                  }
                  className="h-10 w-full rounded-[10px] border border-[#2A2A2A] bg-[#111111] px-3 text-sm text-white transition-colors outline-none focus:border-[#50C878]"
                >
                  <option value="EXECUTIVE">Executivo</option>
                  <option value="TECHNICAL">Técnico</option>
                  <option value="SPRINT">Sprint</option>
                  <option value="WEEKLY">Semanal</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.12em] text-[#8E8E8E] uppercase">
                    Início
                  </label>
                  <Input
                    type="date"
                    value={periodStart}
                    onChange={(event) => setPeriodStart(event.target.value)}
                    className="border-[#2A2A2A] bg-[#111111] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-[0.12em] text-[#8E8E8E] uppercase">Fim</label>
                  <Input
                    type="date"
                    value={periodEnd}
                    onChange={(event) => setPeriodEnd(event.target.value)}
                    className="border-[#2A2A2A] bg-[#111111] text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-[0.12em] text-[#8E8E8E] uppercase">
                  Máximo por tipo
                </label>
                <Input
                  type="number"
                  min={50}
                  max={300}
                  step={1}
                  inputMode="numeric"
                  value={maxItemsPerType}
                  onChange={(event) => setMaxItemsPerType(event.target.value)}
                  placeholder="200"
                  className="border-[#2A2A2A] bg-[#111111] text-white"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-[#2A2A2A] bg-[#131313] p-4 text-sm text-[#A7A7A7]">
              <p className="font-medium text-white">O que a IA vai analisar</p>
              <p className="mt-2">
                commits, pull requests, issues e os principais contribuidores do período
                selecionado.
              </p>
            </div>

            <Button
              type="submit"
              disabled={
                !repository || !canGenerateReport || isGenerateGithubRepositoryReportPending
              }
              className="mt-auto bg-[#50C878] text-[#101010] hover:bg-[#67da8b] disabled:bg-[#2B2B2B] disabled:text-[#8A8A8A]"
            >
              {isGenerateGithubRepositoryReportPending ? (
                <LoaderCircle className="animate-spin" size={16} color="#101010" />
              ) : (
                <Sparkles size={16} color="#101010" />
              )}
              Gerar relatório
            </Button>
          </form>

          <div className="flex min-h-0 flex-col rounded-[28px] border border-[#2A2A2A] bg-[#151515]">
            <div className="border-b border-[#2A2A2A] px-4 py-3">
              <p className="text-sm font-medium text-white">Conversa</p>
              <p className="text-xs text-[#8E8E8E]">
                O retorno da IA aparece como uma conversa com blocos resumidos.
              </p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length > 0 ? (
                messages.map((message) =>
                  message.role === 'user' ? (
                    <div key={message.id} className="flex justify-end">
                      <div className="max-w-[88%] rounded-3xl rounded-br-md border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 text-sm text-white">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-start">
                      <div className="max-w-[92%] rounded-3xl rounded-bl-md border border-[#2A2A2A] bg-[#191919] px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#50C878]/15">
                            <Sparkles size={16} className="text-[#50C878]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {message.title ?? 'Relatório gerado'}
                            </p>
                            <p className="text-xs text-[#8E8E8E]">Nexo IA</p>
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-6 whitespace-pre-line text-[#E1E1E1]">
                          {message.content}
                        </p>

                        {message.kind === 'report' && message.report ? (
                          <div className="mt-4 grid gap-3">
                            <div className="grid gap-3 md:grid-cols-2">
                              <MetricCard
                                label="Commits"
                                value={message.report.metrics.total_commits}
                              />
                              <MetricCard
                                label="Pull requests"
                                value={message.report.metrics.total_pull_requests}
                              />
                              <MetricCard
                                label="Issues"
                                value={message.report.metrics.total_issues}
                              />
                              <MetricCard
                                label="Tokens utilizados"
                                value={message.report.usage.total_tokens}
                              />
                            </div>

                            <div className="rounded-2xl border border-[#2A2A2A] bg-[#131313] p-4">
                              <p className="text-[11px] tracking-[0.14em] text-[#8E8E8E] uppercase">
                                Top contribuintes
                              </p>

                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.report.metrics.top_contributors.length > 0 ? (
                                  message.report.metrics.top_contributors.map((contributor) => (
                                    <Badge
                                      key={contributor.login}
                                      variant="default"
                                      className="bg-[#262626] text-[#D8D8D8]"
                                    >
                                      {contributor.login} · {contributor.commits}
                                    </Badge>
                                  ))
                                ) : (
                                  <span className="text-sm text-[#A7A7A7]">
                                    Nenhum contribuinte identificado.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {message.kind === 'error' ? (
                          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[#3D1F1F] bg-[#261313] px-3 py-2 text-sm text-[#F2A2A2]">
                            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                            <span>{message.content}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ),
                )
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="max-w-md rounded-[28px] border border-dashed border-[#2A2A2A] bg-[#131313] px-5 py-6 text-center">
                    <Sparkles className="mx-auto text-[#50C878]" size={24} />
                    <p className="mt-3 text-sm font-medium text-white">
                      A conversa vai aparecer aqui
                    </p>
                    <p className="mt-2 text-sm text-[#A7A7A7]">
                      Gere o relatório para ver a resposta em blocos, como um chat de IA.
                    </p>
                  </div>
                </div>
              )}

              {isGenerateGithubRepositoryReportPending ? (
                <div className="flex justify-start">
                  <div className="max-w-[92%] rounded-3xl rounded-bl-md border border-[#2A2A2A] bg-[#191919] px-4 py-4">
                    <div className="flex items-center gap-2">
                      <LoaderCircle className="animate-spin text-[#50C878]" size={16} />
                      <p className="text-sm text-white">Gerando relatório...</p>
                    </div>
                    <p className="mt-2 text-sm text-[#A7A7A7]">
                      A IA está processando os sinais do repositório e preparando o resumo.
                    </p>
                  </div>
                </div>
              ) : null}

              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-[#2A2A2A] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-[#8E8E8E]">
                  {repository?.sync_status === 'DISCONNECTED'
                    ? 'Repositório desconectado, geração indisponível.'
                    : 'Você pode gerar novos relatórios quantas vezes quiser.'}
                </p>

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="border-[#2A2A2A] bg-transparent text-white hover:bg-[#242424]"
                  >
                    Fechar
                  </Button>
                </SheetClose>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
