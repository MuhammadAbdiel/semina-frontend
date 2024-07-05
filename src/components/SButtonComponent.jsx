import { Button } from './ui/button'

export default function SButtonComponent({ children, ...props }) {
  return <Button {...props}>{children}</Button>
}
