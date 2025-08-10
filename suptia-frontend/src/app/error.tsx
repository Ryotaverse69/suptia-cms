"use client"

export default function GlobalError({error}: {error: Error}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-xl font-semibold mb-2">エラーが発生しました</h2>
      <p className="text-gray-600">{error.message}</p>
    </div>
  )
}


