export const RoutePaths = {
    dashboard: "/",
    auth: {
        register: "/auth/register",
        login: "/auth/login",
    },
    group: {
        index: "/group",
        detail: (id: string) => `/group/${id}`,
    }
}