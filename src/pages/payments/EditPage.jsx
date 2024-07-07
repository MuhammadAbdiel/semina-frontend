import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import SButtonComponent from '@/components/SButtonComponent'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOnePayment } from '@/redux/payment/action'
import Swal from 'sweetalert2'
import { postData } from '@/utils/fetch'
import PaymentForm from './PaymentForm'
import { fetchEditPayment } from '@/redux/payments/action'

const editSchema = z.object({
  type: z.string().min(1, { message: 'Type is required' }).max(50, {
    message: 'Type must be less than 50 characters',
  }),
})

export default function EditPage({ paymentId }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState('')
  const [avatar, setAvatar] = useState('')
  const payment = useSelector((state) => state.payment)

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      type: '',
      avatar: '',
    },
  })

  const onUpdate = async ({ type }) => {
    setIsLoading(true)
    dispatch(fetchEditPayment(paymentId, type, file))
    setIsLoading(false)
    setOpen(false)
    form.reset()
  }

  useEffect(() => {
    if (open) {
      dispatch(fetchOnePayment({ id: paymentId }))
    }
  }, [open, dispatch, paymentId])

  useEffect(() => {
    if (payment.data) {
      form.setValue('type', payment.data.type)
      setFile(payment.data?.image?._id)
      setAvatar(payment.data?.image?.name)
    }
  }, [payment.data, form])

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
          className='mx-1 bg-yellow-300 hover:bg-yellow-400'
        >
          <Pencil className='h-5 w-5' />
        </SButtonComponent>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Edit Payment</DialogTitle>
          <DialogDescription>
            Edit Payment and update it to your event.
          </DialogDescription>
        </DialogHeader>
        <PaymentForm
          avatar={avatar}
          edit
          isLoading={isLoading}
          form={form}
          handleChange={handleChange}
          handleCreate={onUpdate}
        />
      </DialogContent>
    </Dialog>
  )
}
