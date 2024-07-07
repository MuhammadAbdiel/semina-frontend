import SButtonComponent from '@/components/SButtonComponent'
import TextInputLabelComponent from '@/components/TextInputLabelComponent'
import { Form } from '@/components/ui/form'
import { config } from '@/configs'

export default function TalentForm({
  avatar,
  edit,
  form,
  handleChange,
  handleCreate,
  isLoading,
}) {
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
          name='role'
          label='Role'
          id='role'
          type='text'
          placeholder='Role'
        />
        {avatar !== '' && (
          <div className='mt-2'>
            <img
              src={`${config.api_image}/${avatar}`}
              alt='Avatar'
              className='w-32 h-32 object-cover rounded-md'
            />
          </div>
        )}
        <TextInputLabelComponent
          form={form}
          name='avatar'
          label='Avatar'
          id='avatar'
          type='file'
          placeholder='Avatar'
          handleChange={handleChange}
        />
        <SButtonComponent disabled={isLoading} type='submit' className='w-full'>
          {edit ? 'Update' : 'Submit'}
        </SButtonComponent>
      </form>
    </Form>
  )
}
