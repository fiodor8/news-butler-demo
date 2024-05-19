import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {    
    if (!password) {
        return false;
    }
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}
