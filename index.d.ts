interface Util {
    transformArray2Tree: (Array: any[], IDKey: string, parentIDKey: string) => object;
    transformTree2Array: (TreeObject: any, IDKey: string, parentIDKey: string, rootID: string) => any[];
}
declare const util: Util;
export default util;
