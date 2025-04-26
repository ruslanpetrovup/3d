import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum LinkFilesCategory {
  PHOTO = 'photo',
  FILE = 'file',
  VIDEO = 'video',
  OTHER = 'other',
}

@Entity()
export class LinkFiles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @Column({ nullable: true })
  category: string;
}
