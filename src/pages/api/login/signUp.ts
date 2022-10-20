import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password, avatarUrl } = req.body

  await prisma.users.create({
    data: {
      name,
      email,
      password,
      avatarUrl: avatarUrl || '',
      isAdmin: false
    }
  })

  return res.status(201).json({ message: 'User created!' })
}
