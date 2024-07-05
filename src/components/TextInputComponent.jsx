import { Input } from './ui/input'

export default function TextInputComponent({
  id,
  type,
  placeholder,
  className,
  field,
}) {
  return (
    <Input
      className={className}
      id={id}
      type={type}
      placeholder={placeholder}
      {...field}
    />
  )
}
