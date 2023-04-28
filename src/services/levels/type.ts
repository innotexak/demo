export interface ISessionsInterface {
    levels: ISession[];
    processToken: string;
}

export interface ISession {
    label: string,
    value: string
}

export interface ISessionUpdate { levelName: string, processToken: string, providers: string[] }