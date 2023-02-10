import { IoMdSearch } from 'react-icons/io'

import { FormInput } from '#/shared/ui'

export const SearchInput = () => (
  <div className='relative flex hidden w-[620px] md:block'>
    <FormInput type='text' placeholder='Page for products...' />
    <button type='button' className='absolute right-3 top-2.5'>
      <IoMdSearch size={22} />
    </button>
  </div>
)
