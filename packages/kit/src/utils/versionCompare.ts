const isStrOrNumber = (value) =>
    typeof value === "number" || typeof value === "string";

function times(num, val) {
    const result = [];
    for (let i = 0; i < num; i++) {
        result.push(val);
    }
    return result;
}

/**
*
* @param v1 旧版本号
* @param v2 新版本号
* @returns {boolean} is v1 bigger than v2
* true  版本过低
* false 版本相等，或者更高
*/

function versionCompare(v1: string, v2: string) {
    if (!v1 || !v2) {
        throw new Error("lack the version when compare the versions");
    }
    if (!isStrOrNumber(v1) || !isStrOrNumber(v2)) {
        throw new TypeError("param must be string or number");
    }
    const arr1 = String(v1).split(".");
    const arr2 = String(v2).split(".");
    const len1 = arr1.length;
    const len2 = arr2.length;

    if (len1 !== len2) {
        len1 > len2
            ? arr2.push(...times(len1 - len2, 0))
            : arr1.push(...times(len2 - len1, 0));
    }
    let res = false;
    for (let i = 0; i < Math.max(len1, len2); i++) {
        if (arr1[i] < arr2[i]) {
            res = true;
            break;
        }
    }
    return res;
}
export default versionCompare;