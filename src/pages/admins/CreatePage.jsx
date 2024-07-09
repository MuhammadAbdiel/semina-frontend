import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import SButtonComponent from '@/components/SButtonComponent'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { fetchAddAdmin } from '@/redux/organizers/action'
import AdminForm from './AdminForm'

const createSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }).max(50, {
      message: 'Name must be less than 50 characters',
    }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Email must be a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export default function CreatePage() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onCreate = async ({ name, email, password, confirmPassword }) => {
    setIsLoading(true)
    dispatch(fetchAddAdmin(name, email, password, confirmPassword))
    setIsLoading(false)
    setOpen(false)
    form.reset()
  }

  const handleDialogChange = (isOpen) => {
    setOpen(isOpen)
    if (!isOpen) {
      form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <SButtonComponent
          size='sm'
          className='me-2 bg-blue-700 hover:bg-blue-800'
        >
          Add Admin
        </SButtonComponent>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Create New Admin</DialogTitle>
          <DialogDescription>
            Create a new admin and assign it to an event.
          </DialogDescription>
        </DialogHeader>
        <AdminForm isLoading={isLoading} form={form} handleCreate={onCreate} />
      </DialogContent>
    </Dialog>
  )
}
