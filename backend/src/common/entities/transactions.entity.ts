import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionStatus } from '../enums/transactions.enum';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ------------------------------ head info ------------------------------

  @Column()
  userId: string;

  @Column()
  stripeTransactionLinkId: string;

  @Column({ nullable: true })
  typeTransaction: string; // buy, withdraw, etc

  @Column({ nullable: true })
  typePayment: string; // card, bank, paypal, etc

  @Column('decimal', { precision: 20, scale: 2 })
  amount: number;

  // ------------------------ other data ------------------------

  @Column({ type: 'json', nullable: true })
  data: {[key: string]: any};

  // ------------------------------ status ------------------------------

  @Column()
  status: TransactionStatus; // pending, completed, failed, cancelled, refunded

  // ------------------------------ other fields ------------------------------

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
