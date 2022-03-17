import {AbstractRepository, Connection, EntityRepository, Repository} from 'typeorm'
import { UserEntity } from 'src/users/entity/user.entity'

@EntityRepository(UserEntity)
export class UserRepository extends AbstractRepository<UserEntity> {

  public async findOne({ id, email, name }: UserFindOneOptions = {}) {

    console.log("id : ", {id});

    const user = await  this.repository.findOne(1, {
      relations : ['user_auth']
    });

    console.log(user);

    return user;

  }

  public async findCheckQuery(){
    const result = this.repository.createQueryBuilder('user')
    .select(['user.name', 'user.id', 'user.email'])
    .where('user.id = :id', {id:123456})
    .getRawMany()

    return result
  }


}

export interface UserFindOneOptions {
  id?: string
  email?: string
  name?: string
}