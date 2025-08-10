import * as React from 'react'

export const Badge = ({className = '', ...props}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${className}`}
    {...props}
  />
)


