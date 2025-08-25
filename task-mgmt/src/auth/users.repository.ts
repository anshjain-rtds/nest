import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export const UserRepository = (dataSource: DataSource) =>
    dataSource.getRepository(User).extend({
        async createUser(
            authCredentialsDto: AuthCredentialsDto,
        ): Promise<void> {
            const { username, password } = authCredentialsDto;

            const user = this.create({ username, password });
            await this.save(user);
        },
    });
//not using this file more