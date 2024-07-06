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
import CategoryForm from './CategoryForm'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { postData } from '@/utils/fetch'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { fetchCategories } from '@/redux/categories/action'

const createSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(50, {
    message: 'Name must be less than 50 characters',
  }),
})

export default function CreatePage() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: '',
    },
  })

  const onCreate = async ({ name }) => {
    setIsLoading(true)

    const res = await postData('/cms/categories', {
      name,
    })

    if (res?.data?.data) {
      Swal.fire({
        title: 'Success',
        text: 'Category Created Successfully',
        icon: 'success',
      })
      dispatch(fetchCategories())
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SButtonComponent
          size='sm'
          className='me-2 bg-blue-700 hover:bg-blue-800'
        >
          Add Category
        </SButtonComponent>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
          <DialogDescription>
            Create a new category and add it to your event.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          isLoading={isLoading}
          form={form}
          handleCreate={onCreate}
        />
      </DialogContent>
    </Dialog>
  )
}
