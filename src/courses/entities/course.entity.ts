import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Level } from '../../catalogs/entities/level.entity';
import { Modality } from '../../catalogs/entities/modality.entity';
import { Shift } from '../../catalogs/entities/shift.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';
import { Instructor } from '../../instructors/entities/instructor.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('cursos_catalogo')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column()
  nivel_id: number;

  @Column()
  modalidad_id: number;

  @Column()
  turno_id: number;

  @Column()
  total_horas: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column()
  especialidad_id: number;

  @ManyToOne(() => Level)
  @JoinColumn({ name: 'nivel_id' })
  nivel: Level;

  @ManyToOne(() => Modality)
  @JoinColumn({ name: 'modalidad_id' })
  modalidad: Modality;

  @ManyToOne(() => Shift)
  @JoinColumn({ name: 'turno_id' })
  turno: Shift;

  @ManyToOne(() => Specialty)
  @JoinColumn({ name: 'especialidad_id' })
  especialidad: Specialty;

  @OneToMany(() => Instructor, (instructor) => instructor.curso)
  instructores: Instructor[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.curso)
  inscripciones: Enrollment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  estado: boolean;
}
