"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { statusClass, statusLabel } from "../_utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Machine } from "@/app/api/machine/type";
import { useCan } from "@/utils/user";

export default function TableDesktop({ machines, setDeleteId, onEdit }: { machines: Machine[]; setDeleteId: (id: string) => void; onEdit: (m: Machine) => void }) {
	const canDelete = useCan('machine', 'delete');
	const canEdit = useCan('machine', 'edit');

	return (
		<Table>
			<TableHeader>
				<TableRow className="bg-muted/50 hover:bg-muted/50">
					<TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
						Nome
					</TableHead>
					<TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
						Nº de Série
					</TableHead>
					<TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
						Nº do Adesivo
					</TableHead>
					<TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
						Status
					</TableHead>
					<TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
						Vendedor
					</TableHead>
					<TableHead className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
						Observação
					</TableHead>
					<TableHead className="px-6 py-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
						Ações
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{machines.map((m) => (
					<TableRow key={m.id} className="hover:bg-muted/30">
						<TableCell className="px-6 py-4 font-semibold text-foreground">
							{m.name}
						</TableCell>
						<TableCell className="px-6 py-4 text-foreground">
							{m.serialNumber}
						</TableCell>
						<TableCell className="px-6 py-4 text-foreground">
							{m.stickerNumber}
						</TableCell>
						<TableCell className="px-6 py-4">
							<span
								className={cn(
									"inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
									statusClass(m)
								)}
							>
								<span className="size-1.5 rounded-full bg-current opacity-70" />
								{statusLabel(m)}
							</span>
						</TableCell>
						<TableCell className="px-6 py-4">
							<div className="flex items-center gap-2">
								<span className="text-sm text-foreground">{m.user?.name ?? "- Não atribuído -"}</span>
							</div>
						</TableCell>
						<TableCell className="px-6 py-4 max-w-xs">
							<span className="text-sm text-muted-foreground truncate block" title={m.comment}>
								{m.comment || "—"}
							</span>
						</TableCell>
						<TableCell className="px-6 py-4 text-right">
							<div className="flex items-center gap-1 justify-end">
								{canEdit && (
									<Button variant="ghost" size="icon-sm" onClick={() => onEdit(m)}>
									<Pencil className="size-4 text-blue-600" />
									</Button>
								)}
								{canDelete && (
								<Button
									variant="ghost"
									size="icon-sm"
									onClick={() => setDeleteId(m.id)}
									className="text-red-600 hover:text-red-700 hover:bg-red-50"
								>
									<Trash2 className="size-4" />
								</Button>
								)}
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}