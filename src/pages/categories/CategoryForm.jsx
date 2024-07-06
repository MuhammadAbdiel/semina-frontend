import SButtonComponent from '@/components/SButtonComponent'
import TextInputLabelComponent from '@/components/TextInputLabelComponent'
import { Form } from '@/components/ui/form'

export default function CategoryForm({ edit, form, handleCreate, isLoading }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-8'>
        <TextInputLabelComponent
          form={form}
          name='name'
          label='Name'
          id='name'
          type='name'
          placeholder='Name'
        />
        <SButtonComponent disabled={isLoading} type='submit' className='w-full'>
          {edit ? 'Update' : 'Submit'}
        </SButtonComponent>
      </form>
    </Form>
  )
}
