import { Link } from 'react-router-dom'
import TextInputComponent from './TextInputComponent'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import SButtonComponent from './SButtonComponent'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function TextInputLabelComponent({
  form,
  name,
  label,
  id,
  type,
  placeholder,
}) {
  const [passwordType, setPasswordType] = useState('password')

  function togglePasswordVisibility() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password')
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {name === 'password' ? (
            <div className='flex items-center justify-between'>
              <FormLabel>{label}</FormLabel>
              <Link to='#' className='ml-auto inline-block text-sm underline'>
                Forgot your password?
              </Link>
            </div>
          ) : (
            <FormLabel>{label}</FormLabel>
          )}
          <FormControl>
            {name === 'password' ? (
              <div className='relative'>
                <TextInputComponent
                  id={id}
                  type={passwordType}
                  placeholder={placeholder}
                  field={field}
                />
                <SButtonComponent
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2'
                >
                  {passwordType === 'password' ? <Eye /> : <EyeOff />}
                </SButtonComponent>
              </div>
            ) : (
              <TextInputComponent
                id={id}
                type={type}
                placeholder={placeholder}
                field={field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
