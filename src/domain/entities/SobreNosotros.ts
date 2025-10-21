import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('SobreNosotros')
export class SobreNosotros {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 250 })
    titulo!: string;

    @Column('text')
    contenido!: string;

    @Column({ type: 'text', nullable: true })
    mision?: string;

    @Column({ type: 'text', nullable: true })
    vision?: string;

    @Column({ type: 'text', nullable: true })
    valores?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    ultima_actualizacion!: Date;

    @Column( { default: true } )
    esta_activo!: boolean;

    @Column( { nullable: true } )
    imagen_url?: string;

    @Column( { nullable: true } )
    imagen2_url?: string;
}