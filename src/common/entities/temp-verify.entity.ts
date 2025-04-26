import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TempVerify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  passportImage: string;

  @Column()
  faceImage: string;

  @Column()
  deletedAt: Date; // записывается дата и время когда будет удален
}