import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import Select from 'react-select'

export default function SelectBoxLabelComponent({
  form,
  label,
  placeholder,
  name,
  options,
  isClearable,
}) {
  const handleSelectChange = (selectedOption) => {
    form.setValue(name, selectedOption.value)
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              {...field}
              value={options.find((option) => option.value === field.value)}
              options={options}
              isClearable={isClearable}
              placeholder={placeholder}
              onChangeCapture={handleSelectChange}
              className='max-w'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
