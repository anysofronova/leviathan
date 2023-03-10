'use client'

import { logout, removeUser } from '#/entities'
import { tokenService } from '#/shared/api/services'
import { useAppDispatch, useAuth } from '#/shared/hooks'
import { FormButton } from '#/shared/ui'

export const UserInfo = () => {
  const user = useAuth()
  const dispatch = useAppDispatch()
  return (
    <div className='mb-10 text-sm text-black dark:text-gray-300'>
      <div className='mb-4'>
        <h2 id='full-name' className='text-2xl font-bold'>
          {user?.fullName}
        </h2>
        <p id='user-email' className='text-xl'>
          {user?.email}
        </p>
      </div>
      <FormButton
        id='logout-btn'
        onClick={async () => {
          if (user?.id) {
            await dispatch(logout(user.id))
              .then(() => tokenService.clearData())
              .catch(e => console.log(e))
            await dispatch(removeUser())
          }
        }}
      >
        Logout
      </FormButton>
    </div>
  )
}
