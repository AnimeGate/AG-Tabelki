import { createFileRoute } from "@tanstack/react-router";
import ASSTable from "@/components/ass-table/ASSTable";

export const Route = createFileRoute("/")({
  component: ASSTable,
});
