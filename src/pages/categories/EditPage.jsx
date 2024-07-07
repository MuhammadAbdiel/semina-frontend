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
import CategoryForm from './CategoryForm'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneCategory } from '@/redux/category/action'
import { fetchEditCategory } from '@/redux/categories/action'

const editSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).max(50, {
    message: 'Name must be less than 50 characters',
  }),
})

export default function EditPage({ categoryId }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const category = useSelector((state) => state.category)

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: '',
    },
  })

  const onUpdate = async ({ name }) => {
    setIsLoading(true)
    dispatch(fetchEditCategory(categoryId, name))
    setIsLoading(false)
    setOpen(false)
    form.reset()
  }

  useEffect(() => {
    if (open) {
      dispatch(fetchOneCategory({ id: categoryId }))
    }
  }, [open, dispatch, categoryId])

  useEffect(() => {
    if (category.data) {
      form.setValue('name', category.data.name)
    }
  }, [category.data, form])

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
          className='mx-1 bg-yellow-300 hover:bg-yellow-400'
        >
          <Pencil className='h-5 w-5' />
        </SButtonComponent>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Edit category and update it to your event.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          edit
          isLoading={isLoading}
          form={form}
          handleCreate={onUpdate}
        />
      </DialogContent>
    </Dialog>
  )
}
