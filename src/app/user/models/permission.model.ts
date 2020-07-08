export class Permission {
    id: number;
    name: string;
}

export class RoleModel {
    id: number;
    name: string;
    key: string;
    permissions: Permission[];
}