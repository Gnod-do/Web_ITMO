import { NextApiRequest, NextApiResponse } from "next"
import User from "../../../models/user"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" })
    return
  }

  const { email, testNumber, percent, speed, coefficient } = req.body

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { [`result.${testNumber}`]: { percent, speed, coefficient } } },
      { new: true, maxTimeMS: 30000 }
    )

    if (!user) {
      res.status(404).json({ message: "User not found" })
      return
    }

    res.status(200).json({ message: "Result updated successfully", user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}
