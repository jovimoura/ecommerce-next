export type ItemProps = {
  id: string
  imageUrl: string
  title: string
  type: string
  price: string | number
  onEdit?: () => void
  onDelete?: () => Promise<void>
}