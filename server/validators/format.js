module.exports = function({msg, param, value}) {
    return {
        param: `${param}`,
        value: `${value}`,
        msg: `${msg}`
    }
}