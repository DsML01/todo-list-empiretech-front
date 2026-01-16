import type { Route } from "./+types/tasks";
import { Tasks } from "../features/tasks/tasks";
import { api } from "~/lib/api/client";
import { useLoaderData } from "react-router";
import type { Task } from "~/lib/api/types";

export async function loader() {
  try {
    const response = await api.get<Task[]>("/tasks/");
    return {tasks: response.data}
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Response("Failed to load tasks", { status: 500 });
  }
}


export function meta({}: Route.MetaArgs) {
  return [
    { title: "TO-DO List EmpireTech" },
    { name: "description", content: "Welcome to EmpireTech TO-DO List!" },
  ];
}

export default function Index({loaderData}: Route.ComponentProps) {
  return <Tasks initialTasks={loaderData.tasks}/>;
}
