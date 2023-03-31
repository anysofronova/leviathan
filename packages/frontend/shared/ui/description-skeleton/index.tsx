export const DescriptionSkeleton = () => {
  return (
    <div role='status' className='mb-6 animate-pulse'>
      <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
