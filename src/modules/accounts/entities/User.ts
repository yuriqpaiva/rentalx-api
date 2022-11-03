import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column("boolean", { default: false })
  isAdmin = false;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (this.id === undefined) {
      this.id = uuidV4();
    }
  }
}

export { User };
