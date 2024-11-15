// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Parameter0<T extends (x0: any) => any> = T extends (x0: infer X0) => unknown
    ? X0
    : never;

export interface AbstractReactComponentProps {
    classes?: {
        root?: string;
    };
    className?: string;
}

export type NonFalse<T> = T extends undefined | null ? never : T;
