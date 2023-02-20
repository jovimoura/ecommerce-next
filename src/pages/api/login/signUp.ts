import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handleCreateAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password, avatarUrl } = req.body;

  try {
    await prisma.users.create({
      data: {
        name,
        email,
        password,
        avatarUrl: avatarUrl || "",
        isAdmin: false,
      },
    });

    return res.status(201).json({ message: "User created!", name });
  } catch (error) {
    return res.status(500).json({ message: "Error creating account", error });
  }
}
