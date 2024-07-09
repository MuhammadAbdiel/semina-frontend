import SButtonComponent from '@/components/SButtonComponent'
import TextInputLabelComponent from '@/components/TextInputLabelComponent'
import { Form } from '@/components/ui/form'

export default function StatusForm({ edit, form, handleCreate, isLoading }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-8'>
        <TextInputLabelComponent
          form={form}
          name='statusEvent'
          label='Status Event'
          id='statusEvent'
          type='text'
          placeholder='Status Event'
        />

        <SButtonComponent disabled={isLoading} type='submit' className='w-full'>
          {edit ? 'Update' : 'Submit'}
        </SButtonComponent>
      </form>
    </Form>
  )
}
