import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findedUser = await this.ormRepository.findOne(id);

    return findedUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findedUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findedUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const createdUser = this.ormRepository.create(userData);

    await this.ormRepository.save(createdUser);

    return createdUser;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
