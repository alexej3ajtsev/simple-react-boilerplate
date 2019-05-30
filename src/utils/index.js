export function formatMoney(price) {
    return onlyNumbers(price).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export function compareValue(minVAlue, maxValue, value) {
    let min = parseInt(onlyNumbers(minVAlue)) || 0
    let max = parseInt(onlyNumbers(maxValue)) || 0
    let val = parseInt(onlyNumbers(value)) || 0

    return ( (val < min) || (val > max) ) ?
        false :
        true

}

export function onlyNumbers(str) {
    if (!str)
        return ""

    return str.toString().replace(/[^0-9.]/g, "")
}