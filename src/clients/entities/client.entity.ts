import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { Sale } from '../../sales/entities/sale.entity';

@Entity('clientes')
export class Client {
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
  direccion: string;

  @Column({ unique: true })
  DUI: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.cliente)
  inscripciones: Enrollment[];

  @OneToMany(() => Sale, (sale) => sale.cliente)
  ventas: Sale[];
}
