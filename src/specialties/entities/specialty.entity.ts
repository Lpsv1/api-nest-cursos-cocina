import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('especialidades')
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Course, (course) => course.especialidad)
  cursos: Course[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.especialidad)
  inscripciones: Enrollment[];
}
