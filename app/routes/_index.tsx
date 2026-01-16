import type { Route } from "./+types/welcome";
import { Welcome } from "../features/index/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TO-DO List EmpireTech" },
    { name: "description", content: "Welcome to EmpireTech TO-DO List!" },
  ];
}

export default function Index() {
  return <Welcome />;
}
