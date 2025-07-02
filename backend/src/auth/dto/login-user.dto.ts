import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty({ message: 'Username is required' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string;
}