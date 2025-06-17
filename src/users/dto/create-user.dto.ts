import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    id: number;

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "The email of the user",
        example: "test@gmail.com"
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: "1234567890",
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        description:"The password confirmation of the user",
        example: "1234567890",
    })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
    
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    
}
