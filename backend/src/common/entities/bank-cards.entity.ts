import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BankCards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  cardName: string;

  @Column({ nullable: true })
  cardNumber: string;

  @Column({ nullable: true })
  cardExp: string;

  @Column({ nullable: true })
  cardCvc: string;

  @Column({ nullable: true })
  countryOrRegion: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
