/**
 * 将一个具有树形结构属性的数组转为树形对象
 * 1.数组中的结构拥有唯一的id
 * 2.数组中的结构有parentID
 * 3.如果parendID为空或undefined则视为根元素
 * 4.每个元素根据其id和parentId建立父子或祖先与后代的关系
 *
 */
interface Util {
    transformArray2Tree: (Array: any[], IDKey: string, parentIDKey: string) => object;
    transformTree2Array: (TreeObject: any, IDKey: string, parentIDKey: string, rootID: string) => any[];
}
declare const util: Util;
export default util;
