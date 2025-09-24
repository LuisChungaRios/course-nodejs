import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../database/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const created = new this.userModel({
      ...createUserDto,
      born_date: new Date(createUserDto.born_date),
    });
    return created.save();
  }

  async findAll() {
    return this.userModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    console.log('Update DTO:', updateUserDto, id);
    if (updateUserDto.born_date) {
      // ensure Date type
      (updateUserDto as any).born_date = new Date(updateUserDto.born_date);
    }
    const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  async remove(id: string) {
    const removed = await this.userModel.findByIdAndDelete(id).exec();
    if (!removed) throw new NotFoundException('User not found');
    return { deleted: true };
  }
}
