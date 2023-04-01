import { useState } from 'react'
import { TfiAngleRight } from 'react-icons/tfi'

export const FooterSelect = ({
  options,
  onClick,
  selectedOption
}: {
  options: string[]
  onClick?: (elem: string) => void
  selectedOption?: string
}) => {
  const [selected, setSelected] = useState(selectedOption ? selectedOption : options[0])
  const [showOptions, setShowOptions] = useState(false)
  return (
    <div className='relative mr-2 flex max-w-[150px]'>
      <button
        className='flex w-full items-center rounded border py-1 px-2 transition-all duration-300 hover:border-black dark:border-gray-600 dark:hover:border-white'
        onClick={() => setShowOptions(prevState => !prevState)}
      >
        <span className='mx-2 w-full'>{selected}</span>
        <TfiAngleRight
          size={20}
          className={showOptions ? 'duration-400 rotate-90 transition-all' : 'duration-400 transition-all'}
        />
      </button>
      {showOptions && (
        <div className='absolute left-0 top-10 w-full rounded border bg-white py-1 px-2 dark:bg-black'>
          {options.map(el => {
            if (el !== selected) {
              return (
                <button
                  key={el}
                  className='block w-full px-3 py-1 text-left'
                  onClick={() => {
                    setSelected(el)
                    setShowOptions(prevState => !prevState)
                    if (onClick) {
                      onClick(el)
                    }
                  }}
                >
                  {el}
                </button>
              )
            } else return null
          })}
        </div>
      )}
    </div>
  )
}
