import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity('ctl_nivel')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nivel: string;

  @OneToMany(() => Course, (course) => course.nivel)
  cursos: Course[];
}