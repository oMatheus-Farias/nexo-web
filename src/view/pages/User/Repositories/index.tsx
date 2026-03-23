import { GitBranchPlus, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Badge } from '@/view/components/ui/Badge';
import { Button } from '@/view/components/ui/Button';
import { Input } from '@/view/components/ui/Input';
import { Toggle } from '@/view/components/ui/Toggle';

export default function RepositoriesPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('qcollaborators') ?? '');

  return (
    <article className="h-full w-full">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-white">Repositórios</h2>
          </div>

          <p className="text-muted-foreground">Gerencie os repositórios conectados.</p>
        </div>

        <Button className="flex items-center gap-1">
          <GitBranchPlus size={16} color="#252525" />
          Adicionar repositório
        </Button>
      </div>

      <div className="mt-6 w-full">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            placeholder="Buscar repositórios..."
            value={searchTerm}
            className="pl-9"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-[16px] border border-[#2A2A2A] bg-[#1F1F1F] p-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p>acme-corp/client-dashboard</p>
                <Badge variant="default" className="bg-[#373737] text-[#C6C6C6]">
                  Privado
                </Badge>
              </div>

              <p className="text-sm text-[#C6C6C6]">
                Aplicativo principal de painel de controle voltado para o cliente com análises em
                tempo real.
              </p>

              <div className="mt-4 flex items-center gap-4">
                <p className="text-sm text-[#C6C6C6]">TypeScript</p>
                <p className="text-sm text-[#C6C6C6]">Última sincronização: 13/02/2026</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="max-h-2 min-h-2 max-w-2 min-w-2 rounded-full bg-[#50C878]"></div>
                <p className="text-xs text-[#C6C6C6]">Sincronizar</p>
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
        ))}
      </div>
    </article>
  );
}
