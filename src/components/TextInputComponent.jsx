import { Input } from './ui/input'

export default function TextInputComponent({
  id,
  type,
  placeholder,
  className,
  field,
  handleChange,
}) {
  return type === 'file' ? (
    <Input
      className={className}
      id={id}
      type={type}
      placeholder={placeholder}
      onChangeCapture={handleChange}
      {...field}
    />
  ) : (
    <Input
      className={className}
      id={id}
      type={type}
      placeholder={placeholder}
      {...field}
    />
  )
}
