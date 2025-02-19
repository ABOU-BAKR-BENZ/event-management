export interface ContextPropsTypes {
    user: string | null;
    token: string | null;
    userRole: string | null;
    setUser: (user: string) => void;
    setToken: (token: string | null) => void;
    setUserRole: (role: string) => void;
}

export interface Pagination {
    current_page: number;
    first_item: number;
    has_more_pages: boolean;
    last_item: number;
    last_page: number;
    next_page_url: string;
    on_first_page: boolean;
    per_page: number;
    prev_page_url: boolean | null;
    total: number;
}

export interface Event {
    id: number;
    title: string;
    start: string;
    end: string;
    duration: number;
    location: string;
    capacity: number;
    waitlist_capacity: number;
    status: string;
    is_joined: boolean;
}

export interface UserStatistics {
    allEvents: number;
    createdEvents: number;
    allUsers: number;
}
