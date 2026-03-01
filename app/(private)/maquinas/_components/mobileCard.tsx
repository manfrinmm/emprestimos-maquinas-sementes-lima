import { Machine } from "@/app/api/machine/type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { statusClass, statusLabel } from "../_utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Tractor, Hash, Tag, User, ClipboardList } from "lucide-react";
import { Can } from "@/utils/user";

export function MobileCard({ machines, setDeleteId, onEdit }: { machines: Machine[]; setDeleteId: (id: string) => void; onEdit: (m: Machine) => void }) {
	return (
		machines.map((m) => (
			<Card key={m.id} className="py-4">
				<CardHeader className="flex flex-row items-start justify-between gap-3 pb-2 px-4">
					<div className="flex-1 min-w-0">
						<h3 className="text-lg font-semibold text-foreground truncate flex items-center gap-2">
							<Tractor className="size-4 text-muted-foreground shrink-0" />
							{m.name}
						</h3>
						<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mt-1">
							<span className="flex items-center gap-1.5">
								<Hash className="size-3.5 text-muted-foreground shrink-0" />
								{m.serialNumber}
							</span>
							<span className="flex items-center gap-1.5">
								<Tag className="size-3.5 text-muted-foreground shrink-0" />
								{m.stickerNumber}
							</span>
						</div>
						<span
							className={cn(
								"inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium mt-2",
								statusClass(m)
							)}
						>
							<span className="size-1.5 rounded-full bg-current opacity-70" />
							{statusLabel(m)}
						</span>
					</div>
					<div className="flex gap-1 shrink-0">
						<Can resource="machine" action="edit">
							<Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => onEdit(m)}>
								<Pencil className="size-4 text-blue-600" />
							</Button>
						</Can>
						<Can resource="machine" action="delete">
							<Button
								variant="ghost"
								size="icon"
								className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
								onClick={() => setDeleteId(m.id)}
							>
								<Trash2 className="size-4" />
							</Button>
						</Can>
					</div>
				</CardHeader>
				<CardContent className="px-4 pt-0 space-y-2">
					<p className="text-sm text-muted-foreground flex items-center gap-2">
						<User className="size-4 text-muted-foreground shrink-0" />
						<span className="font-medium text-foreground">Vendedor:</span> {m.user?.name ?? "- Não atribuído -"}
					</p>
					<p className="text-sm text-muted-foreground flex items-center gap-2">
						<ClipboardList className="size-4 text-muted-foreground shrink-0" />
						<span className="font-medium text-foreground">Obs:</span> {m.comment || "—"}
					</p>
				</CardContent>
			</Card>
		))
	)
}