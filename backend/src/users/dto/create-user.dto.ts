import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Marko', description: 'Username of the user' })
    @IsNotEmpty({ message: 'Usernam is required' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'marko@gmail.com', description: 'Email of the user' })
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password of the user' })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
