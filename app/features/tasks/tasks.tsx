import type { Task } from "~/lib/api/types";
import { TaskCard } from "~/components/ui/task-card";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import { PlusCircle } from "lucide-react";
import TaskColumn from "~/components/ui/task-column";

interface TasksProps {
  initialTasks: Task[];
}
export function Tasks({initialTasks}: TasksProps) {


  //Eu sei que a filtragem deve ser feita no backend, mas por fins didáticos, estou fazendo aqui no front-end
  const backlog_tasks: Task[] = initialTasks.filter(task => !task.is_completed && !task.is_in_progress);
  const todo_tasks: Task[] = initialTasks.filter(task => !task.is_completed && task.is_in_progress);
  const completed_tasks: Task[] = initialTasks.filter(task => task.is_completed);

  console.log("Initial Tasks:", initialTasks);
  console.log("Backlog Tasks:", backlog_tasks);
  console.log("To-Do Tasks:", todo_tasks);
  console.log("Completed Tasks:", completed_tasks);

  return (
    <main className="flex flex-col h-screen">

      <div className="h-1/15 p-1 flex items-center justify-center bg-background">
        <h1 className="text-3xl text-center">Your Tasks</h1>
      </div>

      <div className="h-19/20 flex w-full">

        <div className="w-3/10 p-8 items-center justify-center flex bg-gray-400">
          <TaskColumn initialTasks={backlog_tasks} title="Backlog Tasks" />
        </div>

        <div className="w-4/10 p-8 bg-foreground items-center justify-center flex flex-col">
          <TaskColumn initialTasks={todo_tasks} title="To-Do Tasks" />

          <Button className="mt-4 bg-background text-foreground flex items-center absolute bottom-12 right-12">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New Task
          </Button>
        </div>

        <div className="w-3/10 p-8 items-center justify-center flex bg-gray-400">
          <TaskColumn initialTasks={completed_tasks} title="Completed Tasks" />
        </div>
      
      </div>
    
    </main>
  );
}