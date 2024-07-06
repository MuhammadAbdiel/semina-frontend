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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SignInForm from './SignInForm'
import { postData } from '@/utils/fetch'
import { useDispatch } from 'react-redux'
import { userLogin } from '@/redux/auth/action'

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
  const dispatch = useDispatch()
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSignin = async ({ email, password }) => {
    setIsLoading(true)

    const res = await postData('/cms/auth/signin', {
      email,
      password,
    })

    if (res?.data?.data) {
      dispatch(userLogin(res.data.data.token, res.data.data.role))
      Swal.fire({
        title: 'Success',
        text: 'Sign In Successfully',
        icon: 'success',
      })
      navigate('/dashboard')
    } else {
      Swal.fire({
        title: 'Failed',
        text: res?.response?.data?.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    }
    setIsLoading(false)
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
