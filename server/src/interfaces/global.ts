export interface ScheduleItem {
    weekday: number;
    from: string;
    to: string
};

export interface Filters {
    weekday: number;
    subject: string;
    time: string
};