import { Injectable } from '@nestjs/common';


export type Person = any;


@Injectable()
export class UsersService {

 private readonly people = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  async findOneUser(username : string) : Promise<Person | undefined>{
      return this.people.find(ppl => ppl.username === username);
  }
}
