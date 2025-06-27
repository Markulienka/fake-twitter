import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto;
    
    if (!password || typeof password !== 'string') {
      throw new Error('Password must be a valid string');
    }
    
    if (!username || typeof username !== 'string') {
      throw new Error('Username must be a valid string');
    }
    
    if (!email || typeof email !== 'string') {
      throw new Error('Email must be a valid string');
    }
    
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await this.userService.create({
      username,
      email,
      password: passwordHash,
    })
    
    const token = this.jwtService.sign({ id: user.id, username: user.username });

    return { token }
   
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { username, password } = loginUserDto;

    const user = await this.userService.findByUsernameWithPassword(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    const token = this.jwtService.sign({ id: user.id, username: user.username });

    return { token }
  }
}
