import type { Route } from "./+types/tasks";
import { Tasks } from "../features/tasks/tasks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TO-DO List EmpireTech" },
    { name: "description", content: "Welcome to EmpireTech TO-DO List!" },
  ];
}

export default function Index() {
  return <Tasks />;
}
