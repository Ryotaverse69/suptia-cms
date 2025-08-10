import * as React from 'react'

export const Card = ({className = '', ...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props} />
)

export const CardHeader = ({className = '', ...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 border-b ${className}`} {...props} />
)

export const CardTitle = ({className = '', ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
)

export const CardContent = ({className = '', ...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 ${className}`} {...props} />
)

export const CardFooter = ({className = '', ...props}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 border-t ${className}`} {...props} />
)


