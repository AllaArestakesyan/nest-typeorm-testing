import { ApiProperty } from "@nestjs/swagger";
import { JoiPipeModule, JoiSchema, JoiSchemaOptions, CREATE, UPDATE } from 'nestjs-joi';
import * as Joi from 'joi';
import { Role } from "../entities/user.role.enum";

export class CreateUserDto {

    @ApiProperty({ description: "The first name of a user", default: "Anna", type: String })
    @JoiSchema([CREATE], Joi.string().alphanum().required())
    @JoiSchema([UPDATE], Joi.string().alphanum().optional())
    firstName: string;

    @ApiProperty({ description: "The last name of a user", default: "Anyan", type: String })
    @JoiSchema([CREATE], Joi.string().alphanum().required())
    @JoiSchema([UPDATE], Joi.string().alphanum().optional())
    lastName: string;

    @ApiProperty({ description: "The email of a user", default: "anna.anyan@gmail.com", type: String })
    @JoiSchema([CREATE], Joi.string().email().required())
    @JoiSchema([UPDATE], Joi.string().email().optional())
    email: string;

    @ApiProperty({ description: "The age of a user", default: 18,type:Number})
    @JoiSchema([CREATE], Joi.number().integer().min(0).max(100).required())
    @JoiSchema([UPDATE], Joi.number().integer().min(0).max(100).optional())
    age: number;


    @ApiProperty({ description: "The age of a user", default: 0,enum: ['ADMIN', 'USER']})
    @JoiSchema([CREATE], Joi.number().integer().min(0).max(1).required())
    @JoiSchema([UPDATE], Joi.number().integer().min(0).max(1).optional())
    role: Role;
}
