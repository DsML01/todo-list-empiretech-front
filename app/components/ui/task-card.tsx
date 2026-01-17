import { Card, CardContent, CardHeader } from "./card";
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import type { Task } from "~/lib/api/types";

export function TaskCard({ task, onDelete, onEdit }: { task: Task, onDelete: (taskId: number) => void, onEdit: (taskId: number) => void }) {

  return (
    <Card>
        <CardHeader>
        <p>Prioridade {task.priority}</p>
        <h2 className="text-xl font-semibold">{task.title}</h2>
        </CardHeader>
        <CardContent>
        <p className="text-sm">{task.description}</p>
            <Button variant="ghost" size="icon" onClick={() => onEdit(task.id)}>
                <Edit2 className="w-5 h-5 text-primary" />
            </Button>          
            <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
                <Trash2 className="w-5 h-5 text-destructive" />
            </Button>                    
        </CardContent>
    </Card>
  )}
