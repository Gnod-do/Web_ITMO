import { Schema, model, models } from "mongoose"

const CriteriasSchema = new Schema({
    criteria1: {
        type: String,
    },
    criteria2: {
        type: String,
    },
    criteria3: {
        type: String,
    },
    criteria4: {
        type: String,
    },
    criteria5: {
        type: String,
    },
    criteria6: {
        type: String,
    },
    criteria7: {
        type: String,
    },
    criteria8: {
        type: String,
    },
    criteria9: {
        type: String,
    },
    criteria10: {
        type: String,
    },
    criteria11: {
        type: String,
    },
    criteria12: {
        type: String,
    },
    criteria13: {
        type: String,
    },
    criteria14: {
        type: String,
    },
    criteria15: {
        type: String,
    },
})

const Criterias = models.Criterias || model("Criterias", CriteriasSchema)

export default Criterias