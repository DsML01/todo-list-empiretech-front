// app/features/tasks/components/task-form-shadcn.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { is } from "zod/v4/locales";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { Task } from "~/lib/api/types";

export const taskSchema = z.object({
  title: z.string().min(10, {
    message: "O título deve ter pelo menos 10 caracteres.",
  }),
  description: z.string().optional(),
  priority: z.coerce.number().min(1).max(5).optional(),
  is_in_progress: z.boolean().optional(),
  is_completed: z.boolean().optional(),
});

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: z.infer<typeof taskSchema>) => void;
}

export function TaskFormShadcn({ initialData, onSubmit }: TaskFormProps) {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      priority: initialData?.priority || 1,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título da Tarefa</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Finalizar integração do CRUD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (Opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Detalhes sobre o que precisa ser feito..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder="1 (Baixa) a 5 (Alta)" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
        <div className="flex justify-end gap-2">
          <Button type="submit">
            {initialData ? "Salvar Alterações" : "Criar Tarefa"}
          </Button>
        </div>
      </form>
    </Form>
  );
}