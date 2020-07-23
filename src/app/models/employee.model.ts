export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    gender: Gender;
    email: string;
    jobTitle: string;
    company: string;
    department: string;
    location: string;
}

export enum Gender {
    Male = 'Male',
    Female = 'Female'
}
