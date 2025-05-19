import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity('ctl_turnos')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  turno: string;

  @OneToMany(() => Course, (course) => course.turno)
  cursos: Course[];
}
