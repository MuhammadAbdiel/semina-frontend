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
import { getData, putData } from '@/utils/fetch'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { fetchEvents } from '@/redux/events/action'
import { NotebookPen } from 'lucide-react'
import StatusForm from './StatusForm'

const statusSchema = z.object({
  statusEvent: z.enum(['Draft', 'Published']),
})

export default function StatusPage({ eventId }) {
  const form = useForm({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      statusEvent: '',
    },
  })

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchOneEvent = async () => {
    const res = await getData(`/cms/events/${eventId}`)

    if (res?.data?.data) {
      form.setValue('statusEvent', res?.data?.data?.statusEvent)
    }
  }

  const onStatusUpdate = async ({ statusEvent }) => {
    setIsLoading(true)

    const res = await putData(`/cms/events/${eventId}/status`, {
      statusEvent,
    })
    if (res?.data?.data) {
      Swal.fire({
        title: 'Success',
        text: 'Status Event Updated Successfully',
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

  const handleDialogChange = (isOpen) => {
    setOpen(isOpen)
    if (!isOpen) {
      form.reset()
    }
  }

  useEffect(() => {
    fetchOneEvent()
  }, [eventId, open])

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <SButtonComponent
          size='sm'
          className='mx-1 bg-green-500 hover:bg-green-600'
        >
          <NotebookPen className='h-5 w-5' />
        </SButtonComponent>
      </DialogTrigger>
      <DialogContent
        className={'lg:max-w-screen-lg overflow-y-auto max-h-screen'}
      >
        <DialogHeader>
          <DialogTitle>Edit Status Event</DialogTitle>
          <DialogDescription>
            Edit your status event and update it to your list.
          </DialogDescription>
        </DialogHeader>
        <StatusForm
          edit
          isLoading={isLoading}
          form={form}
          handleCreate={onStatusUpdate}
        />
      </DialogContent>
    </Dialog>
  )
}
