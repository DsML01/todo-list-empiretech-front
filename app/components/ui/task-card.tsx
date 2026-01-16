import { Card, CardContent, CardHeader } from "./card";
import { Button } from "./button";
import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import type { Task } from "~/lib/api/types";

export function TaskCard({ task }: { task: Task }) {

  const handleDelete = () => {
    // Implement delete functionality here
  };
  
  const handleEdit = () => {
    // Implement edit functionality here
  };

  return (
    <Card>
        <CardHeader>
        <h2 className="text-xl font-semibold">{task.title}</h2>
        </CardHeader>
        <CardContent>
        <p className="text-sm">{task.description}</p>
            <Button variant="ghost" size="icon" onClick={handleEdit}>
                <Edit2 className="w-5 h-5 text-primary" />
            </Button>          
            <Button variant="ghost" size="icon" onClick={handleDelete}>
                <Trash2 className="w-5 h-5 text-destructive" />
            </Button>                    
        </CardContent>
    </Card>
  )}
