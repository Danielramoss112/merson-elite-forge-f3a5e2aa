import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/insights")({
  component: () => <Navigate to="/blog" replace />,
});
