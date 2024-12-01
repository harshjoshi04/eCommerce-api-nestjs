import * as bcrypt from 'bcrypt'

const solt = 10;


export async function HashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, solt)
}

export async function comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
}

export function isNullOrUndefined(obj: any): boolean {
    return obj === null || obj === undefined;
}