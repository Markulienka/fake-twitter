import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ example: 'Marko', description: 'Username of the user' })
    @IsNotEmpty({ message: 'Username is required' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'password123', description: 'Password of the user' })
    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string;
}