import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('signup')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiBody({ type: SignUpDto })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string, user: any }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiBody({ type: LoginUserDto })
  login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string, user: any }> {
    return this.authService.login(loginUserDto);
  }
}