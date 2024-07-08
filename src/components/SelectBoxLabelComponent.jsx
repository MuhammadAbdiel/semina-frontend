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
    form.setValue(name, selectedOption)
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
              options={options}
              isClearable={isClearable}
              placeholder={placeholder}
              onChange={handleSelectChange}
              className='max-w'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
