/// <reference types="react" />
declare const _default: {
    component: import("react").FunctionComponent<void>;
    someStyle: string;
    settled: <T>(args: Promise<T>[]) => Promise<{
        data?: T | undefined;
        error?: any;
        isRejected: boolean;
    }[]>;
};
export default _default;
