import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  if (method === 'GET') {
    const items = await prisma.items.findMany()
    return res.status(200).json(items)
  }
}
