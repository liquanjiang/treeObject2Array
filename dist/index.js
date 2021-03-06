"use strict";
/**
 * 将一个具有树形结构属性的数组转为树形对象
 * 1.数组中的结构拥有唯一的id
 * 2.数组中的结构有parentID
 * 3.如果parendID为空或undefined则视为根元素
 * 4.每个元素根据其id和parentId建立父子或祖先与后代的关系
 *
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var R = __importStar(require("ramda"));
var es_map_1 = __importDefault(require("core-js/modules/es.map"));
var array_1 = __importDefault(require("core-js/es/array"));
var util = {
    /**
     * 将数组转化为树形结构对象的方法
     * @param array
     * @param IDKey
     * @param parentIDKey
     * @return object
     *
     */
    transformArray2Tree: function (array, IDKey, parentIDKey) {
        if (IDKey === void 0) { IDKey = 'id'; }
        if (parentIDKey === void 0) { parentIDKey = 'parent_id'; }
        if (!array || !array_1.default.isArray(array) || array.length === 0) {
            console.error('数组不存在或为空');
            return {};
        }
        // 首先创建一个空的Map
        var tempMap = new es_map_1.default();
        // 创建需要需要返回的树形对象
        var treeObject = {};
        // 遍历数组，根据IDKey获取每个元素
        array.forEach(function (item) {
            tempMap.set(item[IDKey], item);
        });
        // 遍历后将得到一个Map，这个Map所有的key都是数组元素的ID，而value则是对应的object
        // 遍历tempMap对象，将当前的节点与其父节点简历链接
        tempMap.forEach(function (value, IDKey, map) {
            var pID = value[parentIDKey];
            if (pID === 'root' || !pID) {
                treeObject[IDKey] = value;
            }
            else {
                var parent_1 = map.get(pID);
                if (!array_1.default.isArray(parent_1.children)) {
                    parent_1.children = [];
                }
                parent_1.children.push(value);
            }
        });
        return treeObject;
    },
    /**
     * 将树形结构的对象，转为扁平化的数组，数组包含所有的元素及其子元素
     * 将TreeObject中的所有对象，放入一个数组中，要求某对象在另一个对象的children中时，其parentID是对应的另一个对象的id
     * 其原理实际上是数据结构中的广度优先遍历
     *
     * @param TreeObject
     * @param IDKey
     * @param parentIDKey
     * @param parentID
     */
    transformTree2Array: function (TreeObject, IDKey, parentIDKey, parentID) {
        if (IDKey === void 0) { IDKey = 'id'; }
        if (parentIDKey === void 0) { parentIDKey = 'parent_id'; }
        if (parentID === void 0) { parentID = ''; }
        if (!TreeObject || typeof TreeObject !== 'object' || array_1.default.isArray(TreeObject)) {
            console.error('请输入树形对象，若无将返回空数组');
            return [];
        }
        // 定义输出数组
        var outArray = [];
        // 深拷贝TreeObject,将拷贝后的TreeObject的属性放入outArray中
        var obj = R.clone(TreeObject);
        delete obj.children;
        var children = R.clone(TreeObject.children);
        // 如果没有传根元素，则定义根元素为root,如果传了根元素，说明用户定义了根元素，则使用该根元素
        obj[parentIDKey] = parentID ? parentID : 'root';
        outArray.push(obj);
        // 如果这个对象有children且children长度大于0，则递归调用处理方法
        if (children && array_1.default.isArray(children) && children.length > 0) {
            children.forEach(function (item) {
                outArray = outArray.concat(util.transformTree2Array(item, IDKey, parentIDKey, obj[IDKey]));
            });
        }
        return outArray;
    }
};
exports.default = util;
