import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('ctl_estado_curso')
export class CourseStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  estado: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.estadoCurso)
  inscripciones: Enrollment[];
}
