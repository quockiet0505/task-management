// app/members/page.tsx
import { Suspense } from "react"
import MembersContent from "./MembersContent"

export default function MembersPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: 50, textAlign: 'center' }}>
        Loading members...
      </div>
    }>
      <MembersContent />
    </Suspense>
  )
}