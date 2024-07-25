import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const usersServiceMock = {
    create: jest.fn(),
    // findAll: jest.fn(),
    // findOne: jest.fn(),
    // update: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .compile();

    controller = app.get<UsersController>(UsersController);
    service = app.get<UsersService>(UsersService);
  });

  it('.create() should call UsersService.create', async () => {
    const createUserDto = { email: 'email@email.com' } as CreateUserDto;
    const user = {
      id: 0,
      email: 'email@email.com',
    } as User;

    jest.spyOn(usersServiceMock, 'create').mockReturnValue(user);

    const result = await controller.create(createUserDto);

    expect(result).toEqual(user);
    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith({
      email: 'email@email.com',
    });
  });
});
