import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(routes.dashboard);
}