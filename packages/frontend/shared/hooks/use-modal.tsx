import { useState } from 'react'

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  const show = () => {
    setIsShowing(true)
  }

  const hide = () => {
    setIsShowing(false)
  }

  return {
    isShowing,
    show,
    hide
  }
}
