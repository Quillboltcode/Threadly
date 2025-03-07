import { createFileRoute } from "@tanstack/react-router";

export const Route: any = createFileRoute('/Profile')({
  component: () => (
    <div>
      <h1>Profile</h1>
    </div>
  )
})