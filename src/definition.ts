export type NavigationItem = {
    hrefOrCallback: string|(() => void);
    name: string;
};


export enum ButtonKind {
    REGULAR = "regular",
    DANGER = "danger"
}