/* eslint-disable prettier/prettier */
import {
    Injectable,
    ConflictException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepo.create({
            username,
            password: hashedPassword,
        });

        try {
            await this.userRepo.save(user);
            return user;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { username } });
    }
    async findOne(options: FindOneOptions<User>): Promise<User | null> {
        return this.userRepo.findOne(options);
    }
}
