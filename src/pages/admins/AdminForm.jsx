import SButtonComponent from '@/components/SButtonComponent'
import TextInputLabelComponent from '@/components/TextInputLabelComponent'
import { Form } from '@/components/ui/form'

export default function AdminForm({ edit, form, handleCreate, isLoading }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)} className='space-y-8'>
        <TextInputLabelComponent
          form={form}
          name='name'
          label='Name'
          id='name'
          type='text'
          placeholder='Name'
        />
        <TextInputLabelComponent
          form={form}
          name='email'
          label='Email'
          id='email'
          type='email'
          placeholder='Email'
        />
        <TextInputLabelComponent
          form={form}
          name='password'
          label='Password'
          id='password'
          type='password'
          placeholder='Password'
        />
        <TextInputLabelComponent
          form={form}
          name='confirmPassword'
          label='Password Confirmation'
          id='confirmPassword'
          type='password'
          placeholder='Password Confirmation'
        />
        <SButtonComponent disabled={isLoading} type='submit' className='w-full'>
          {edit ? 'Update' : 'Submit'}
        </SButtonComponent>
      </form>
    </Form>
  )
}
