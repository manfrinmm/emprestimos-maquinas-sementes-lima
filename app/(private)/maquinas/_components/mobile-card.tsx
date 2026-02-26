import { Machine } from "@/app/api/machine/type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { statusClass, statusLabel } from "../_utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export function MobileCard({ machines, setDeleteId, onEdit }: { machines: Machine[]; setDeleteId: (id: string) => void; onEdit: (m: Machine) => void }) {
	return (
		machines.map((m) => (
			<Card key={m.id} className="py-4">
				<CardHeader className="flex flex-row items-start justify-between gap-3 pb-2 px-4">
					<div className="flex-1 min-w-0">
						<h3 className="text-lg font-semibold text-foreground truncate">{m.name}</h3>
						<p className="text-sm text-muted-foreground mt-0.5">
							{m.serialNumber} • {m.stickerNumber}
						</p>
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
						<Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => onEdit(m)}>
							<Pencil className="size-4 text-blue-600" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
							onClick={() => setDeleteId(m.id)}
						>
							<Trash2 className="size-4" />
						</Button>
					</div>
				</CardHeader>
				<CardContent className="px-4 pt-0 space-y-2">
					<p className="text-sm text-muted-foreground">
						<span className="font-medium text-foreground">Obs:</span> {m.comment || "—"}
					</p>
				</CardContent>
			</Card>
		))
	)
}