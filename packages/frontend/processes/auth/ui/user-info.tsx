import { useTranslation } from 'next-i18next'

import { authSelectors } from '#/entities'
import { tokenService } from '#/shared/api/services'
import { FormButton } from '#/shared/ui'

export const UserInfo = () => {
  const user = authSelectors.use.user()
  const logout = authSelectors.use.logout()
  const { t } = useTranslation()

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
            await logout(user.id)
              .then(() => tokenService.clearData())
              .catch(e => console.log(e))
          }
        }}
      >
        {t('Logout')}
      </FormButton>
    </div>
  )
}
