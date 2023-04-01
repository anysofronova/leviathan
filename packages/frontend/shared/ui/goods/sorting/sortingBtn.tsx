interface Props {
  value: string
  handleSort: (value: string) => Promise<void>
  className: string
}
export const SortingBtn = ({ value, handleSort, className }: Props) => {
  return (
    <button className={className} onClick={() => handleSort(value)}>
      {value}
    </button>
  )
}
