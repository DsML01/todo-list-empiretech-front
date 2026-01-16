export interface Task {
    id: number;
    title: string;
    description: string;
    is_completed: boolean;
    is_in_progress: boolean;
    priority: number;
}

//Omit<Type, Keys> ... Constructs a type by picking all properties from Type and then removing Keys 
export type TaskCreate = Omit<Task, 'id'>;

// All of the properties of the original Type set to optional.
export type TaskUpdate = Partial<TaskCreate>;
