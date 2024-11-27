import BaseRepository from "@/common/interfaces/base.repository.interface";
import { UserEntity } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/config/prisma/prisma.service";

@Injectable() 
export default class UserRepository implements BaseRepository<UserEntity> {
  constructor(private readonly prisma: PrismaService) {}
  
  async getAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany(); // Prisma의 findMany 메서드 사용
  }

  async getById(id: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { id } }); // Prisma의 findUnique 사용
  }

  async create(data: UserEntity): Promise<UserEntity> {
    return this.prisma.user.create({ data }); // Prisma의 create 메서드 사용
  }

  async update(id: string, data: UserEntity): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data,
    }); // Prisma의 update 메서드 사용
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.prisma.user.delete({ where: { id } });
    return !!result; // 성공적으로 삭제된 경우 true 반환
  }

}