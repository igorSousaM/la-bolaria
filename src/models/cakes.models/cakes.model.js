import joi from "joi";

const postCakesSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required.min(1),
    description: joi.string().required().min(1),
    image: joi.string().uri()
})

export {postCakesSchema}