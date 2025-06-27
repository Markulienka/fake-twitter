import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty({ message: 'Username is required' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}