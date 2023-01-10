import joi from "joi";

const clientsSchema = joi.object({
    name: joi.string().required().min(1),
    address: joi.string().required().min(1),
    phone: joi.string().required().min(10).max(11),
})

export {clientsSchema}