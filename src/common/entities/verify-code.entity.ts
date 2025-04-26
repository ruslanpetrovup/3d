import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum VerifyCodeType {
  FORGOT_PASSWORD = 'forgot_password',
  VERIFY_EMAIL = 'verify_email',
}

@Entity('verify_codes')
export class VerifyCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  type: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
