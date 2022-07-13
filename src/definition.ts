export class NavigationItem  {
    hrefOrCallback: string|(() => void);
    name: string;
    
    constructor (name: string, hrefOrCallback: string|(() => void)) {
      this.hrefOrCallback = hrefOrCallback;
      this.name = name;
    }

    isButton(): boolean {
      return typeof this.hrefOrCallback === 'function'
    }
};

export enum ButtonKind {
    REGULAR = "regular",
    DANGER = "danger"
}