import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('download_links')
export class DownloadLinks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  fileName: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  expiresAt: Date;

  @Column({ nullable: true })
  sessionId: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  paidAt: Date;
}