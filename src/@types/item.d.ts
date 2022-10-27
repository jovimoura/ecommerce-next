export type ItemProps = {
  id: string
  imageUrl: string
  title: string
  type: string
  price: string | number
  onEdit?: () => Promise<void>
  onDelete?: () => Promise<void>
}