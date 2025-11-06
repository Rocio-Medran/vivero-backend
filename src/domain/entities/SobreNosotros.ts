import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('SobreNosotros')
export class SobreNosotros {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    nuestro_origen!: string;

    @Column({ type: 'text' })
    produccion_historica!: string;

    @Column({ type: 'text' })
    nuevas_producciones!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    ultima_actualizacion!: Date;

    @Column( { nullable: true } )
    imagen_url?: string;

    @Column( { nullable: true } )
    imagen2_url?: string;

    @Column( { nullable: true } )
    imagen3_url?: string;

    @Column( { nullable: true } )
    imagen4_url?: string;

    @Column( { nullable: true } )
    imagen5_url?: string;
}