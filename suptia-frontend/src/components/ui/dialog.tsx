import * as React from 'react'

type DialogProps = {
  open: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  children?: React.ReactNode
}

export function Dialog({open, onOpenChange, title, children}: DialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-sm text-gray-500" onClick={() => onOpenChange?.(false)} aria-label="Close">×</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}


