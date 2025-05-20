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
import { Client } from '../../clients/entities/client.entity';
import { Course } from '../../courses/entities/course.entity';
import { Specialty } from '../../specialties/entities/specialty.entity';
import { Branch } from '../../branches/entities/branch.entity';
import { CourseStatus } from '../../catalogs/entities/course-status.entity';
import { Sale } from '../../sales/entities/sale.entity';

@Entity('inscripciones')
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @Column()
  cursos_catalogo_id: number;

  @Column()
  especialidades_id: number;

  @Column()
  sucursal_id: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_inscripcion: Date;

  @Column()
  estado_curso_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Client, (client) => client.inscripciones)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Client;

  @ManyToOne(() => Course, (course) => course.inscripciones)
  @JoinColumn({ name: 'cursos_catalogo_id' })
  curso: Course;

  @ManyToOne(() => Specialty, (specialty) => specialty.inscripciones)
  @JoinColumn({ name: 'especialidades_id' })
  especialidad: Specialty;

  @ManyToOne(() => Branch, (branch) => branch.inscripciones)
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Branch;

  @ManyToOne(() => CourseStatus)
  @JoinColumn({ name: 'estado_curso_id' })
  estadoCurso: CourseStatus;

  @OneToMany(() => Sale, (sale) => sale.inscripcion)
  ventas: Sale[];
}
