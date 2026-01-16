import type { Task } from "~/lib/api/types";
import { Card, CardContent, CardHeader } from "./card";
import { TaskCard } from "./task-card";

export default function TaskColumn({ initialTasks, title }: { initialTasks: Task[], title: string }) {
  
  return (
        <Card className="h-8/10 w-full">
            <CardHeader className="text-center text-2xl">{title}</CardHeader>
            <CardContent className="flex-1 overflow-y-auto pr-2 space-y-3">
                {initialTasks.map(task => (
                <TaskCard key={task.id} task={task}/>
                ))}
            </CardContent>
        </Card>
    )};