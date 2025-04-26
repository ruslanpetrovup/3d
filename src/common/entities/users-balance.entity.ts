import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Min, IsNumber } from 'class-validator';

@Entity()
export class UsersBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('decimal', { precision: 20, scale: 2 })
  @Min(0)
  @IsNumber()
  balance: number;

  @Column('decimal', { precision: 20, scale: 2 })
  @Min(0)
  @IsNumber()
  pendingBalance: number;

  @Column({ nullable: true })
  lastTransactionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @VersionColumn()
  version: number;

  @Column({ default: false })
  isFrozenBalance: boolean;
}