import { StateProvider } from "./state-provider";

// state-ref.ts
export class StateRef<T extends object = any> {
    constructor(
        private sp: StateProvider,
        public masterKey: string,
        public componentKey: string
    ) { }

    get(): T | null { return this.sp.getChild<T>(this.masterKey, this.componentKey); }
    set(value: T, linkedTo?: string) { this.sp.setChild(this.masterKey, this.componentKey, value, linkedTo); }
    patch(p: Partial<T>) { this.sp.updateChildValue(this.masterKey, this.componentKey, p); }
    linkTo(path: string) { this.sp.updateChildLinkedTo(this.masterKey, this.componentKey, path); }
    linked<U = any>(): U | null { return this.sp.getLinked<U>(this.masterKey, this.componentKey); }

    // ====================================================================
    // ADICIONE ESTE MÉTODO
    // ====================================================================
    /**
     * Remove este estado (child) do StateProvider.
     */
    remove(): void {
        console.log(`🗑️ Removendo estado: [Master: ${this.masterKey}, Component: ${this.componentKey}]`);
        this.sp.removeChild(this.masterKey, this.componentKey);
    }
}