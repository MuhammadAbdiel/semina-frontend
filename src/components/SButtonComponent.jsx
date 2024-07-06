import { forwardRef } from 'react'
import { Button } from './ui/button'

const SButtonComponent = forwardRef(({ children, ...props }, ref) => {
  return (
    <Button ref={ref} {...props}>
      {children}
    </Button>
  )
})

export default SButtonComponent
