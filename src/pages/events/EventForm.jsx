import SButtonComponent from '@/components/SButtonComponent'
import SelectBoxLabelComponent from '@/components/SelectBoxLabelComponent'
import TextInputGroupComponent from '@/components/TextInputGroupComponent'
import TextInputLabelComponent from '@/components/TextInputLabelComponent'
import { Form, FormLabel } from '@/components/ui/form'
import { config } from '@/configs'
import { X } from 'lucide-react'

export default function EventForm({
  avatar,
  edit,
  form,
  lists,
  handlePlusKeyPoint,
  handleChangeKeyPoint,
  handleMinusKeyPoint,
  handlePlusTicket,
  handleMinusTicket,
  handleChangeTicket,
  handleChange,
  handleCreate,
  isLoading,
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreate)}>
        <div className='grid grid-cols-2 gap-4 mb-5'>
          <TextInputLabelComponent
            form={form}
            name='title'
            label='Title'
            id='title'
            type='text'
            placeholder='Title'
          />
          <TextInputLabelComponent
            form={form}
            name='tagline'
            label='Tagline'
            id='tagline'
            type='text'
            placeholder='Tagline'
          />
        </div>
        <div className='grid grid-cols-2 gap-4 mb-5'>
          <TextInputLabelComponent
            form={form}
            name='date'
            label='Name'
            id='date'
            type='datetime-local'
            placeholder='Date'
          />
          <SelectBoxLabelComponent
            form={form}
            label={'Category'}
            placeholder={'Category'}
            name='category'
            value={form.getValues('category')}
            options={lists.categories}
            isClearable={true}
          />
        </div>
        <div className='grid grid-cols-2 gap-4 mb-5'>
          <TextInputLabelComponent
            form={form}
            name='about'
            label='About'
            id='about'
            type='text'
            placeholder='About'
          />
          <TextInputLabelComponent
            form={form}
            name='venueName'
            label='Venue Name'
            id='venueName'
            type='text'
            placeholder='Venue Name'
          />
        </div>

        <FormLabel>Key Point</FormLabel>
        <div className='grid grid-cols-2 gap-4 mt-2 mb-5'>
          {form.getValues('keyPoint').map((key, index) => (
            <div className='flex rounded-lg' key={index}>
              <TextInputGroupComponent
                form={form}
                name={`key.${index}`}
                label='Key Point'
                id={`key.${index}`}
                type='text'
                placeholder='Key Point'
              />
              {index !== 0 && (
                <SButtonComponent onClick={() => handleMinusKeyPoint(index)}>
                  <X className='h-4 w-4' />
                </SButtonComponent>
              )}
            </div>
          ))}
        </div>

        <SButtonComponent className='mb-5' onClick={handlePlusKeyPoint}>
          Add Key Point
        </SButtonComponent>

        <div className='grid grid-cols-2 gap-4 mb-5'>
          <SelectBoxLabelComponent
            form={form}
            label={'Talent'}
            placeholder={'Talent'}
            name='talent'
            value={form.getValues('talent')}
            options={lists.talents}
            isClearable={true}
          />
          <div>
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
          </div>
        </div>

        <FormLabel>Ticket</FormLabel>
        {form.getValues('tickets').map((ticket, index) => (
          <div className='grid grid-cols-2 gap-4 mb-5' key={index}>
            <TextInputLabelComponent
              form={form}
              name='about'
              label='About'
              id='about'
              type='text'
              placeholder='About'
            />
            <TextInputLabelComponent
              form={form}
              name='about'
              label='About'
              id='about'
              type='text'
              placeholder='About'
            />
            <TextInputLabelComponent
              form={form}
              name='about'
              label='About'
              id='about'
              type='text'
              placeholder='About'
            />
            <TextInputLabelComponent
              form={form}
              name='about'
              label='About'
              id='about'
              type='text'
              placeholder='About'
            />
            {index !== 0 && (
              <SButtonComponent onClick={() => handleMinusTicket(index)}>
                Remove
              </SButtonComponent>
            )}
          </div>
        ))}

        <SButtonComponent className='mb-5' onClick={handlePlusTicket}>
          Add Ticket
        </SButtonComponent>

        <SButtonComponent disabled={isLoading} type='submit' className='w-full'>
          {edit ? 'Update' : 'Submit'}
        </SButtonComponent>
      </form>
    </Form>
  )
}
