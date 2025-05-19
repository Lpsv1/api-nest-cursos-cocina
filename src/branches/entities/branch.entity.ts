import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Instructor } from '../../instructors/entities/instructor.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('sucursales')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('text')
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  ciudad: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Instructor, (instructor) => instructor.sucursal)
  instructores: Instructor[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.sucursal)
  inscripciones: Enrollment[];
}
