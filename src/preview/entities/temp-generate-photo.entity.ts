import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('temp_generate_photo')
export class TempGeneratePhoto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    file_name: string;

    @Column()
    file_path: string;

    @CreateDateColumn()
    created_at: Date;
}