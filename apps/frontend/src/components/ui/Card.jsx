import { forwardRef } from 'react'
import { clsx } from 'clsx'

export const Card = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-lg border bg-card text-card-foreground shadow-sm',
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex flex-col space-y-1.5 p-6', className)}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={clsx('text-2xl font-semibold leading-none tracking-tight', className)}
        {...props}
      />
    )
  }
)

CardTitle.displayName = 'CardTitle'

export const CardContent = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('p-6 pt-0', className)} {...props} />
    )
  }
)

CardContent.displayName = 'CardContent'
