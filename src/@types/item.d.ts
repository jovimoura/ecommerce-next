export type ItemProps = {
  imageUrl: string
  title: string
  price: string | number
  onEdit?: () => Promise<void>
  onDelete?: () => Promise<void>
}