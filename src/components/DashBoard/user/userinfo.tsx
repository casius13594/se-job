import { UUID } from 'crypto';

export interface employeeCompany {
    id: number;
    job_id: UUID;
    employee_id: UUID;
    name: string;
    email: string;
    phone: string;
    cv_path: string;
    propo_letter: string;
    status: string;
}

const CardEmployeeOfCompany:React.FC<employeeCompany> = ({id,job_id, 
    employee_id, name, email, phone,cv_path,propo_letter,status}) =>{
        return (
            <h1>employee</h1>
        )
    }