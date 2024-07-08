import TextInputComponent from './TextInputComponent'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'

export default function TextInputGroupComponent({
  form,
  name,
  id,
  type,
  placeholder,
  handleChange,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          <FormControl>
            <TextInputComponent
              id={id}
              type={type}
              placeholder={placeholder}
              field={field}
              handleChange={handleChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
