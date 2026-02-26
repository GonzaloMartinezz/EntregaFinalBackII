import { transport } from '../config/nodemailer.config.js';

export const sendRecoveryMail = async (email, link) => {
    return await transport.sendMail({
        from: 'Ecommerce Backend <noreply@ecommerce.com>',
        to: email,
        subject: 'Restablecer contraseña',
        html: `
            <h1>Recuperación de Contraseña</h1>
            <p>Haz clic en el siguiente botón para restablecer tu clave. Este enlace expira en 1 hora.</p>
            <a href="${link}" style="padding: 10px; background: blue; color: white;">Restablecer Contraseña</a>
        `
    });
};