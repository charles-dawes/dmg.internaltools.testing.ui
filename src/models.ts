/* eslint-disable @typescript-eslint/no-explicit-any */
interface Payload {
    prev?: any;
    current: any;
}

export interface AuditActionOptions {
    action: string;
    payload: Payload;
}

export interface ModuleProps {
    recordActionForAuditing: (options: AuditActionOptions) => void;
}
