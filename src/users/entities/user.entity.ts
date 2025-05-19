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
import { Exclude } from 'class-transformer';
import { Role } from '../../roles/entities/role.entity';
import { AuthSession } from '../../auth/entities/auth-session.entity';
import { Sale } from '../../sales/entities/sale.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  DUI: string;

  @Column()
  @Exclude({ toPlainOnly: true }) // No incluir en las respuestas
  password_hash: string;

  @Column()
  rol_id: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'rol_id' })
  rol: Role;

  @OneToMany(() => AuthSession, (session) => session.usuario)
  sessions: AuthSession[];

  @OneToMany(() => Sale, (sale) => sale.usuario)
  sales: Sale[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  estado: boolean;
}
