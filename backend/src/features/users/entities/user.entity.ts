import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  username: string;

  @Column()
  password: string;
}

export default UserEntity;
