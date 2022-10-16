export interface User {
    id: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
    claimsCount: number;
    claims: Array<number>;
}
