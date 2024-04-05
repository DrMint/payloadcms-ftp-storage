import type { Adapter } from "@payloadcms/plugin-cloud-storage/dist/types";
export interface FTPAdapterConfig {
    host: string;
    user: string;
    password: string;
    secure: boolean;
    endpoint: string;
}
export declare const ftpAdapter: ({ endpoint, host, password, secure, user }: FTPAdapterConfig) => Adapter;
