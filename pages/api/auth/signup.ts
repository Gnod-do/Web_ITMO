import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import { connectToMongoDB } from "../../../lib/mongodb"
import User from "../../../models/user"
import { IUser } from "../../../types"
import mongoose from "mongoose"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ error: "Data is missing" })

        const { fullName, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(409).json({ error: "User Already exists" })
        }
        else {
            if (password.length < 6)
                return res.status(409).json({ error: "Password should be 6 characters long" })

            const hashedPassword = await hash(password, 12)

            User.create({
                fullName,
                email,
                password: hashedPassword,
                result: {
                    test1: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test2: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test3: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test4: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test5: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test6: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test7: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test8: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test9: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test10: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test11: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    },
                    test12: {
                        percent: "",
                        speed: "",
                        coefficient: 0
                    }
                }
            }, (error: unknown, data: IUser) => {
                if (error && error instanceof mongoose.Error.ValidationError) {
                    //mongo db will return array
                    // but we only want to show one error at a time

                    for (let field in error.errors) {
                        const msg = error.errors[field].message
                        return res.status(409).json({ error: msg })
                    }
                }

                const user = {
                    email: data.email,
                    fullName: data.fullName,
                    _id: data._id,
                    result: data.result
                }

                return res.status(201).json({
                    success: true,
                    user
                })
            })
        }
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler