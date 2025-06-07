import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Links {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  priceId: string;

  @Column()
  userId: string;

  @Column()
  fileName: string;

  @Column()
  link: string;

  @Column()
  price: string;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0, type: 'decimal', precision: 10, scale: 2 })
  earnings: number;

  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  category: string;
}