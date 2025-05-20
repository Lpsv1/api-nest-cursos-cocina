import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('auth_sessions')
export class AuthSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: number;

  @Column()
  refresh_token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  token_creado: Date;

  @Column({ type: 'timestamp' })
  token_expira: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ultimo_acceso: Date;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}
