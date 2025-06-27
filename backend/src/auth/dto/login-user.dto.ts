import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty({ message: 'Username is required' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}