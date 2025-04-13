import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/generate-ideas')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/generate-ideas"!</div>
}
