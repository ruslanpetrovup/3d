import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  photo_id: string;

  @Column({default: 'pending'})
  status_order: string;

  @Column({default: 'unpaid'})
  status_payment: string;

  @Column()
  shipping_address: string;
}
