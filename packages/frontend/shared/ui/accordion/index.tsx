import { useState } from 'react'
import { TfiAngleRight } from 'react-icons/tfi'

type Section = {
  title: string
  content?: string
}

type AccordionProps = {
  sections: Section[]
}

export const Accordion = ({ sections }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleSectionClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} className='border-b'>
          <button
            className='flex w-full items-center p-4 text-left text-lg font-medium'
            onClick={() => handleSectionClick(index)}
          >
            <span className='mr-4'>
              <TfiAngleRight
                size={20}
                className={
                  activeIndex === index ? 'duration-400 rotate-90 transition-all' : 'duration-400 transition-all'
                }
              />
            </span>
            {section.title}
          </button>
          <div className={`overflow-hidden ${activeIndex === index ? 'max-h-screen px-4 pb-4' : 'max-h-0 px-4 pb-0'}`}>
            <div>{section.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
