import "react-router-dom";

export const ROUTES = {
    HOME: "/",
    // LOGIN: "/login",
    // REGISTER: "/register",
    EMPLOYEES: "/employees",
    EMPLOYEE: "/employees/:employeeId",
    HIRING: "/hiring",
} as const;

export type PathParams = {
    [ROUTES.EMPLOYEE]: {
        employeeId: string;
    };
};

declare module "react-router-dom" {
    interface Register {
        params: PathParams;
    }
}