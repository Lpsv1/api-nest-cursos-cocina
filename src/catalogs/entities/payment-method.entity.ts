import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';

@Entity('ctl_forma_pago')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  forma_pago: string;

  @OneToMany(() => Sale, (sale) => sale.formaPago)
  ventas: Sale[];
}
