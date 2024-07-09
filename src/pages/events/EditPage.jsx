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
import { getData, postData, putData } from '@/utils/fetch'
import Swal from 'sweetalert2'
import EventForm from './EventForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '@/redux/events/action'
import { Pencil } from 'lucide-react'
import { fetchListCategories, fetchListTalents } from '@/redux/lists/action'
import moment from 'moment'

const editSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(50, {
    message: 'Title must be less than 50 characters',
  }),
  date: z.string().min(1, { message: 'Date is required' }),
  about: z.string().min(1, { message: 'About is required' }),
  venueName: z.string().min(1, { message: 'Venue Name is required' }),
  tagline: z.string().min(1, { message: 'Tagline is required' }),
  keyPoint: z.array(z.string().min(1, { message: 'Key Point is required' })),
  tickets: z.array(
    z.object({
      type: z.string().min(1, { message: 'Type is required' }),
      stock: z.union([
        z.string().min(1, { message: 'Stock is required' }),
        z.number().min(1, { message: 'Stock is required' }),
      ]),
      price: z.union([
        z.string().min(1, { message: 'Price is required' }),
        z.number().min(1, { message: 'Price is required' }),
      ]),
    }),
  ),
  category: z.string().min(1, { message: 'Category is required' }),
  talent: z.string().min(1, { message: 'Talent is required' }),
})

export default function EditPage({ eventId }) {
  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      title: '',
      date: '',
      avatar: '',
      about: '',
      venueName: '',
      tagline: '',
      keyPoint: [''],
      tickets: [
        {
          type: '',
          stock: '',
          price: '',
        },
      ],
      category: '',
      talent: '',
    },
  })

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState('')
  const [avatar, setAvatar] = useState('')
  const lists = useSelector((state) => state.lists)

  const fetchOneEvent = async () => {
    const res = await getData(`/cms/events/${eventId}`)

    if (res?.data?.data) {
      setFile(res?.data?.data?.image._id)
      setAvatar(res?.data?.data?.image.name)
      form.setValue('title', res?.data?.data?.title)
      form.setValue(
        'date',
        moment(res?.data?.data?.date).format('DD-MM-YYYY, h:mm:ss a'),
      )
      form.setValue('about', res?.data?.data?.about)
      form.setValue('venueName', res?.data?.data?.venueName)
      form.setValue('tagline', res?.data?.data?.tagline)
      form.setValue('keyPoint', res?.data?.data?.keyPoint)
      form.setValue('category', res?.data?.data?.category._id)
      form.setValue('talent', res?.data?.data?.talent._id)
      form.setValue('tickets', res?.data?.data?.tickets)
    }
  }

  const onUpdate = async () => {
    setIsLoading(true)
    const payload = {
      date: form.getValues('date'),
      image: file,
      title: form.getValues('title'),
      about: form.getValues('about'),
      venueName: form.getValues('venueName'),
      tagline: form.getValues('tagline'),
      keyPoint: form.getValues('keyPoint'),
      category: form.getValues('category'),
      talent: form.getValues('talent'),
      tickets: form.getValues('tickets'),
    }

    const res = await putData(`/cms/events/${eventId}`, payload)
    if (res?.data?.data) {
      Swal.fire({
        title: 'Success',
        text: 'Event Updated Successfully',
        icon: 'success',
      })

      dispatch(fetchEvents())
    } else {
      Swal.fire({
        title: 'Failed',
        text: res?.response?.data?.msg ?? 'Internal Server Error',
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

  useEffect(() => {
    fetchOneEvent()
  }, [eventId, open])

  useEffect(() => {
    dispatch(fetchListTalents())
    dispatch(fetchListCategories())
  }, [dispatch])

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
      <DialogContent
        className={'lg:max-w-screen-lg overflow-y-scroll max-h-screen'}
      >
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Edit your event and update it to your list.
          </DialogDescription>
        </DialogHeader>
        <EventForm
          edit
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
          handleCreate={onUpdate}
        />
      </DialogContent>
    </Dialog>
  )
}
