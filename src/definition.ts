export class NavigationItem  {
    hrefOrCallback: string|(() => void);
    name: string;
    button: boolean;
    
    constructor (name: string, hrefOrCallback: string|(() => void), button=  false) {
      this.hrefOrCallback = hrefOrCallback;
      this.name = name;
      this.button = button
    }
}

export enum ButtonKind {
    REGULAR = "regular",
    DANGER = "danger"
}