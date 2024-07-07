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
import { postData } from '@/utils/fetch'
import Swal from 'sweetalert2'
import PaymentForm from './PaymentForm'
import { fetchAddPayment } from '@/redux/payments/action'

const createSchema = z.object({
  type: z.string().min(1, { message: 'Type is required' }).max(50, {
    message: 'Type must be less than 50 characters',
  }),
  avatar: z.string().min(1, { message: 'Avatar is required' }),
})

export default function CreatePage() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState('')
  const [avatar, setAvatar] = useState('')

  const form = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      type: '',
      avatar: '',
    },
  })

  const onCreate = async ({ type }) => {
    setIsLoading(true)
    dispatch(fetchAddPayment(type, file))
    setIsLoading(false)
    setOpen(false)
    form.reset()
  }

  const uploadImage = async (file) => {
    let formData = new FormData()
    formData.append('avatar', file)
    const res = await postData('/cms/images', formData, true)
    return res
  }

  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
        e?.target?.files[0]?.type === 'image/png' ||
        e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2)

        if (size > 2) {
          Swal.mixin({
            showConfirmButton: false,
            timer: 1000,
          }).fire({
            title: 'Failed',
            text: 'Please select image size less than 3 MB',
            icon: 'error',
          })
          setFile('')
          setAvatar('')
          form.reset()
        } else {
          const res = await uploadImage(e.target.files[0])

          setFile(res.data.data._id)
          setAvatar(res.data.data.name)
        }
      } else {
        Swal.mixin({
          showConfirmButton: false,
          timer: 1000,
        }).fire({
          title: 'Failed',
          text: 'Please select image file',
          icon: 'error',
        })
        setFile('')
        setAvatar('')
        form.reset()
      }
    }
  }

  const handleDialogChange = (isOpen) => {
    setOpen(isOpen)
    if (!isOpen) {
      form.reset()
      setFile('')
      setAvatar('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <SButtonComponent
          size='sm'
          className='me-2 bg-blue-700 hover:bg-blue-800'
        >
          Add Payment
        </SButtonComponent>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Create New Payment</DialogTitle>
          <DialogDescription>
            Create a new payment and add it to your event.
          </DialogDescription>
        </DialogHeader>
        <PaymentForm
          avatar={avatar}
          isLoading={isLoading}
          form={form}
          handleChange={handleChange}
          handleCreate={onCreate}
        />
      </DialogContent>
    </Dialog>
  )
}
