import SButtonComponent from '@/components/SButtonComponent'
import TextInputLabelComponent from '@/components/TextInputLabelComponent'
import { Form } from '@/components/ui/form'

export default function SignInForm({ form, onSignin, isLoading }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignin)} className='space-y-8'>
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
        <SButtonComponent disabled={isLoading} type='submit' className='w-full'>
          Sign In
        </SButtonComponent>
      </form>
    </Form>
  )
}
