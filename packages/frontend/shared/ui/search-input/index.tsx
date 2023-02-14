import { IoMdSearch } from 'react-icons/io'

import { FormInput } from '#/shared/ui'

export const SearchInput = () => (
  <div className='relative col-span-2 row-start-3 flex w-full min-w-[260px] lg:col-auto lg:row-start-auto lg:block lg:max-w-[620px]'>
    <FormInput type='text' placeholder='Page for products...' label='Search' name='search' />
    <button type='button' className='absolute right-3 top-2.5'>
      <IoMdSearch size={22} />
    </button>
  </div>
)
