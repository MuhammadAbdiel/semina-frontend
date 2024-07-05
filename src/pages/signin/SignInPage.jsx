import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SignInForm from './SignInForm'
// import { useDispatch } from 'react-redux'

const signinSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .min(3, { message: 'Email must be at least 3 characters' })
    .max(50, {
      message: 'Email must be less than 50 characters',
    })
    .email({ message: 'Email must be a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export default function SignInPage() {
  // const dispatch = useDispatch()
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  if (token) {
    return <Navigate to='/' replace />
  }

  const onSignin = async ({ email, password }) => {
    setIsLoading(true)
    try {
      const res = await axios.post(
        'http://localhost:9000/api/v1/cms/auth/signin',
        {
          email,
          password,
        },
      )
      console.log(res.data)
      Swal.fire({
        title: 'Success',
        text: 'Sign In Successfully',
        icon: 'success',
      })
      localStorage.setItem('token', res.data.data.token)
      navigate('/')
    } catch (error) {
      console.log(error.response.data.msg ?? 'Internal Server Error')
      Swal.fire({
        title: 'Failed',
        text: error.response.data.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    } finally {
      setIsLoading(false)
    }
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
          <SignInForm form={form} onSignin={onSignin} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
