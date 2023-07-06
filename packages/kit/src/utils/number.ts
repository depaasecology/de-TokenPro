export const floatPrecision = (num: number, precision = 12) => {
    return +parseFloat(num.toPrecision(precision));
}