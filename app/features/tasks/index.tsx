import type { Task } from "~/lib/api/types";
import { TaskCard } from "~/components/ui/task-card";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import { PlusCircle } from "lucide-react";
import TaskColumn from "~/components/ui/task-column";
import { useState } from "react";
import { api } from "~/lib/api/client";
import * as z from "zod";
import { TaskFormShadcn, taskSchema } from "~/components/ui/task-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface TasksProps {
  initialTasks: Task[];
}
export function Tasks({initialTasks}: TasksProps) {

  // Tenho consciencia que usar vários useState não é a melhor prática,
  // Tive problemas com o React Query e decidi seguir assim por enquanto,
  // Por falta de tempo hábil.
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleCreate = async (values: z.infer<typeof taskSchema>) => {
    try{
      const response = await api.post<Task>("/tasks/", values);
      setTasks(prevTasks => [...prevTasks, response.data]);
      setIsCreateOpen(false);
    }catch(error){
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = async (taskId: number) => {
    try{
      await api.delete(`/tasks/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }catch(error){
      console.error("Error deleting task:", error);
    }
  };
  
  const handleEdit = async (task: Task) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  const handleUpdate = async (values: z.infer<typeof taskSchema>) => {
    console.log('antes do return');
    console.log('editingTask:', editingTask);
    if (!editingTask){
      console.log("Não tem id");
      return;
    }
    console.log('depois do return');

    try{
      const payload = {
        ...values,
        is_in_progress: editingTask.is_in_progress,
        is_completed: editingTask.is_completed,
      }

      const response = await api.patch<Task>(`/tasks/${editingTask}`, payload);
      setIsEditOpen(false);
      setEditingTask(null);
      setTasks(prevTasks => prevTasks.map(task => task.id === response.data.id ? response.data : task));
    }catch(error){
      console.error("Error updating task:", error);
    }
  };

  //Eu sei que a filtragem deve ser feita no backend, mas por fins didáticos, estou fazendo aqui no front-end
  const backlog_tasks: Task[] = tasks.filter(task => !task.is_completed && !task.is_in_progress);
  const todo_tasks: Task[] = tasks.filter(task => !task.is_completed && task.is_in_progress);
  const completed_tasks: Task[] = tasks.filter(task => task.is_completed);

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
          <TaskColumn initialTasks={backlog_tasks} title="Backlog Tasks" onDelete={handleDelete} onEdit={handleEdit} />
        </div>

        <div className="w-4/10 p-8 bg-foreground items-center justify-center flex flex-col">
          <TaskColumn initialTasks={todo_tasks} title="To-Do Tasks" onDelete={handleDelete} onEdit={handleEdit} />

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button 
                className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-background text-foreground shadow-xl rounded-full px-8 h-12 hover:bg-background/90 border-2 border-foreground/10 z-50"
              >
              <PlusCircle className="w-5 h-5 mr-2" />
                Add New Task
              </Button>
            </DialogTrigger>
          
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Nova Tarefa</DialogTitle>
              </DialogHeader>
              <TaskFormShadcn onSubmit={handleCreate} />
            </DialogContent>
          </Dialog>

        </div>

        <div className="w-3/10 p-8 items-center justify-center flex bg-gray-400">
          <TaskColumn initialTasks={completed_tasks} title="Completed Tasks" onDelete={handleDelete} onEdit={handleEdit} />
          
          {/* Modal de edição */}
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Editar Tarefa</DialogTitle>
              </DialogHeader>
              {editingTask && (
                <TaskFormShadcn 
                  initialData={editingTask} 
                  onSubmit={handleUpdate} 
                />
              )}
            </DialogContent>
          </Dialog>          
        </div>
      
      </div>
    
    </main>
  );
}