import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Contact} from '../interface/contact';

@Entity()
export default class ContactEntity implements Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    @Column()
    name: string;

    @PrimaryColumn()
    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;

}
