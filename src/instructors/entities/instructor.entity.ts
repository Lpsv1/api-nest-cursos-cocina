import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Branch } from '../../branches/entities/branch.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('instructores')
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  telefono: string;

  @Column({ type: 'text', nullable: true })
  especialidad: string;

  @Column()
  sucursal_id: number;

  @Column()
  curso_id: number;

  @ManyToOne(() => Branch, (branch) => branch.instructores)
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Branch;

  @ManyToOne(() => Course, (course) => course.instructores)
  @JoinColumn({ name: 'curso_id' })
  curso: Course;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  estado: boolean;
}
