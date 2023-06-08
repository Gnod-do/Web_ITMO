import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        minLength: [4, "Full name should be atleast 4 characters long"],
        maxLength: [30, "Full name should be less than 30 characters"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    result: {
        type: Object,
        default: {
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
      }
})

const User = models.User || model("User", UserSchema)

export default User