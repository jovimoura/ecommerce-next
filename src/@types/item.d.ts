export type ItemProps = {
  id: string
  imageUrl: string
  title: string
  price: string | number
  onEdit?: () => Promise<void>
  onDelete?: () => Promise<void>
}