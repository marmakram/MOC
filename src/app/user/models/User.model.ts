export class UserModel {
    id: any;
    arabicName: string;
    englishName: string;
    primePhone: string;
    email: string;
    password: string;
    nationalId: any;
    churchId: any;
    job: string;
    userNumber: string;
  churches: { id: any; }[];
  roles: any;
    //emailConfirmed: boolean;
}