export const AppRoutes = {

    Auth: {
        full: "auth",
        main: "auth",
        sub: "",
        signIn: {
            full: "sign-in",
            main: "sign-in",
            sub: ""
        },
        signUp: {
            full: "sign-up",
            main: "sign-up",
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
        edit: {
            full: "todo/edit/",
            main: "edit/:id",
            sub: ":id"
         }
    },
}
