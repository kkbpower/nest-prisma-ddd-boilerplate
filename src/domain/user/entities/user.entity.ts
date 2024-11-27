import { IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';
import IUser from '../interfaces/user.interface';

export class UserEntity implements IUser {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  phoneNumber: string;
  
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
