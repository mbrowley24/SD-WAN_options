

export function generateRandomIdString(identifier: string, length = 30): string {
    const alphaNumerical = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';

    for(let i = 0; i < length; i++) {
        result += alphaNumerical.charAt(Math.floor(Math.random() * alphaNumerical.length));
    }

    return `${identifier}-${result}`;
}