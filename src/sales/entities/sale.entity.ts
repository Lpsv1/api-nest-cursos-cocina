import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import { PaymentMethod } from '../../catalogs/entities/payment-method.entity';

@Entity('ventas')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inscripcion_id: number;

  @Column()
  usuario_id: number;

  @Column()
  cliente_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column()
  forma_pago_id: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_pago: Date;

  @Column({ nullable: true })
  numero_referencia: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.ventas)
  @JoinColumn({ name: 'inscripcion_id' })
  inscripcion: Enrollment;

  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => Client, (client) => client.ventas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Client;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.ventas)
  @JoinColumn({ name: 'forma_pago_id' })
  formaPago: PaymentMethod;
}
