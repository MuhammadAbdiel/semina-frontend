import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'

const signinSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email must be a valid email address' })
    .min(1, { message: 'Emial is required' })
    .min(3, { message: 'Emial must be at least 3 characters' })
    .max(50, {
      message: 'Emial must be less than 50 characters',
    }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
})

export default function SignInPage() {
  // const dispatch = useDispatch()

  const [passwordType, setPasswordType] = useState('password')

  function togglePasswordVisibility() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password')
  }

  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSignin = ({ email, password }) => {
    console.log(email, password)
    form.reset()
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Card className='mx-auto max-w-sm w-full'>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign In</CardTitle>
          <CardDescription>
            Enter your account below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSignin)}
              className='space-y-8 mt-5'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        id='username'
                        type='text'
                        placeholder='Username'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Link
                        to='#'
                        className='ml-auto inline-block text-sm underline'
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          id='password'
                          type={passwordType}
                          placeholder='Password'
                          {...field}
                        />
                        <Button
                          type='button'
                          onClick={togglePasswordVisibility}
                          className='absolute right-2 top-1/2 transform -translate-y-1/2'
                        >
                          {passwordType === 'password' ? <Eye /> : <EyeOff />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Login
              </Button>
            </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link to='/register' className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
