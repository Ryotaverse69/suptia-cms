import * as React from 'react'

export const Alert = ({className = '', ...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-md border p-4 ${className}`} role="alert" {...props} />
)


