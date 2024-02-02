export interface Exam {
    eid: number;
    sem: number;
    is_supplementary: boolean;
    paper_submission_deadline: Date;
    scheme: number;
}

export interface Course {
    syllabus_doc_url: string;
    code: string;
    name: string;
    department: string;
    sem: number;
    scheme: number;
}

export interface Department {
    code: string;
    name: string;
    hod: number;
}

export interface Teacher {
    id: number;
    name: string;
    is_external: boolean;
    gender: string;
    dob: Date;
    mobile_no: string;
    address: string;
    designation: string;
    qualification: string;
    bank_account_no: string;
    bank_ifsc: string;
    bank_name: string;
    pan_no: string;
    user: number;
}

export interface User {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}
