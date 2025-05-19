import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity('ctl_modalidad')
export class Modality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  modalidad: string;

  @OneToMany(() => Course, (course) => course.modalidad)
  cursos: Course[];
}
