export const AppRoutes = {

    Auth: {
        full: "auth",
        main: "auth",
        sub: "",
        signIn: {
            full: "sign-in",
            main: "sign-in",
            sub: ""
        }
    },

    Todo: {
        full: "/todo-list",
        main: "todo-list",
        sub: "",
        details: {
            full: "todo/",
            main: ":id",
        },
        new: {
            full: "todo/new",
            main: "new",
            sub: ""
        },
    },
}