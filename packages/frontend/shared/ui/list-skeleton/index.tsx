export const ListSkeleton = () => {
  return (
    <div role='status' className='flex animate-pulse'>
      <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
      <div className='m-1 min-h-[50px] min-w-[50px] cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700'></div>
    </div>
  )
}
