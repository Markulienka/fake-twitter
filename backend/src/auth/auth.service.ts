import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto;
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await this.usersService.create({
      username,
      email,
      password: passwordHash,
    })
    
    const token = this.jwtService.sign({ sub: user.id, username: user.username });

    return { token }
   
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { username, password } = loginUserDto;

    const user = await this.usersService.findByUsernameWithPassword(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    const token = this.jwtService.sign({ sub: user.id, username: user.username });

    return { token }
  }
}
