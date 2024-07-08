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
import { postData } from '@/utils/fetch'
import Swal from 'sweetalert2'
import EventForm from './EventForm'
import { useSelector } from 'react-redux'

const createSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(50, {
    message: 'Title must be less than 50 characters',
  }),
  price: z.string().min(1, { message: 'Price is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  avatar: z.string().min(1, { message: 'Avatar is required' }),
  about: z.string().min(1, { message: 'About is required' }),
  venueName: z.string().min(1, { message: 'Venue Name is required' }),
  tagline: z.string().min(1, { message: 'Tagline is required' }),
  keyPoint: z.array(z.string().min(1, { message: 'Key Point is required' })),
  tickets: z.array(
    z.object({
      type: z.string().min(1, { message: 'Type is required' }),
      status: z.string().min(1, { message: 'Status is required' }),
      stock: z.string().min(1, { message: 'Stock is required' }),
      price: z.string().min(1, { message: 'Price is required' }),
    }),
  ),
  category: z.string().min(1, { message: 'Category is required' }),
  talent: z.string().min(1, { message: 'Talent is required' }),
  stock: z.string().min(1, { message: 'Stock is required' }),
})

export default function CreatePage() {
  const form = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      title: '',
      price: '',
      date: '',
      avatar: '',
      about: '',
      venueName: '',
      tagline: '',
      keyPoint: [''],
      tickets: [
        {
          type: '',
          status: '',
          stock: '',
          price: '',
        },
      ],
      category: '',
      talent: '',
      stock: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState('')
  const [avatar, setAvatar] = useState('')
  const lists = useSelector((state) => state.lists)

  const onCreate = async () => {
    setIsLoading(true)
    const res = await postData('/cms/events', {
      ...form.getValues(),
      avatar: file,
    })

    if (res.data.data) {
      Swal.fire({
        title: 'Success',
        text: 'Event Created Successfully',
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: 'Failed',
        text: res.response.data.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    }
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

  const handleChangeKeyPoint = (e, i) => {
    let _temp = form.getValues('keyPoint')

    _temp[i] = e.target.value

    form.setValue('keyPoint', _temp)
  }

  const handlePlusKeyPoint = () => {
    let _temp = form.getValues('keyPoint')
    _temp.push('')

    form.setValue('keyPoint', _temp)
  }

  const handleMinusKeyPoint = (index) => {
    let _temp = form.getValues('keyPoint')
    let removeIndex = _temp
      .map(function (_, i) {
        return i
      })
      .indexOf(index)

    _temp.splice(removeIndex, 1)
    form.setValue('keyPoint', _temp)
  }

  const handlePlusTicket = () => {
    let _temp = form.getValues('tickets')
    _temp.push({
      type: '',
      status: '',
      stock: '',
      price: '',
    })

    form.setValue('tickets', _temp)
  }
  const handleMinusTicket = (index) => {
    let _temp = form.getValues('tickets')
    let removeIndex = _temp
      .map(function (_, i) {
        return i
      })
      .indexOf(index)

    _temp.splice(removeIndex, 1)
    form.setValue('tickets', _temp)
  }

  const handleChangeTicket = (e, i) => {
    let _temp = form.getValues('tickets')

    _temp[i][e.target.name] = e.target.value

    form.setValue('tickets', _temp)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <SButtonComponent
          size='sm'
          className='me-2 bg-blue-700 hover:bg-blue-800'
        >
          Add Event
        </SButtonComponent>
      </DialogTrigger>
      <DialogContent
        className={'lg:max-w-screen-lg overflow-y-scroll max-h-screen'}
      >
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Create a new event and add it to your list.
          </DialogDescription>
        </DialogHeader>
        <EventForm
          avatar={avatar}
          isLoading={isLoading}
          form={form}
          lists={lists}
          handleChangeKeyPoint={handleChangeKeyPoint}
          handlePlusKeyPoint={handlePlusKeyPoint}
          handleMinusKeyPoint={handleMinusKeyPoint}
          handleChangeTicket={handleChangeTicket}
          handlePlusTicket={handlePlusTicket}
          handleMinusTicket={handleMinusTicket}
          handleChange={handleChange}
          handleCreate={onCreate}
        />
      </DialogContent>
    </Dialog>
  )
}
