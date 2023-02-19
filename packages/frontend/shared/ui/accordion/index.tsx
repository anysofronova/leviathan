'use client'

import { useState } from 'react'
import { TfiAngleDown, TfiAngleRight } from 'react-icons/tfi'

type Section = {
  title: string
  content?: string
}

type AccordionProps = {
  sections: Section[]
}

export function Accordion({ sections }: AccordionProps) {
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
            <span className='mr-4 transform transition-transform'>
              {activeIndex === index ? <TfiAngleDown size={20} /> : <TfiAngleRight size={20} />}
            </span>
            {section.title}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeIndex === index ? 'max-h-screen px-4 pb-4' : 'max-h-0'
            }`}
          >
            <div className={`transition-opacity ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
              {section.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
