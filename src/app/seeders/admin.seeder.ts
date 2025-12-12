import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from '../../domain/entities/Admin';


dotenv.config();

export async function seedAdmin(dataSource: DataSource) {
    const adminRepo = dataSource.getRepository(Admin);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!adminPassword) {
        console.error('La variable INITIAL_ADMIN_PASSWORD no está definida en el archivo .env. Saltando seeder de Admin.');
        return;
    }

    const existingAdmin = await adminRepo.findOne({ where: { email: adminEmail } });

    const passwordHash = await bcrypt.hash(adminPassword, 10);
    if (!existingAdmin) {
        const newAdmin = adminRepo.create({
            email: adminEmail,
            passwordHash: passwordHash,
        });
        await adminRepo.save(newAdmin);
        console.log('Administrador inicial creado exitosamente.');
    } else {
        const isSamePassword = await bcrypt.compare(adminPassword, existingAdmin.passwordHash);
        if (!isSamePassword) {
            existingAdmin.passwordHash = passwordHash;
            await adminRepo.save(existingAdmin);
            console.log('Contraseña de administrador actualizada exitosamente.');
        } else {
            console.log('El administrador inicial ya existe y la contraseña es la misma. No se realizaron cambios.');
        }
    }
}