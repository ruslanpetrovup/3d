import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  stripeCustomerId?: string;

// verification
  @Column({ default: false })
  isVerifiedEmail: boolean;

  @Column({ nullable: true, default: false })
  isVerificationPassport: boolean;

  @Column({ nullable: true, default: false })
  isVerificationFace: boolean;

  @Column({ default: new Date() })
  createdAt: Date;

  // social login
  @Column({ nullable: true })
  googleId?: string;

  @Column({ nullable: true })
  appleId?: string;

  @Column({ nullable: true })
  facebookId?: string;

  @Column({ default: false })
  isBanned: boolean;
}
