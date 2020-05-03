import currencyFormatter from "currency-formatter"

export const formatCurrencyWithRate = ({ value, rate, currency }) => {
    return currencyFormatter.format(rate * value, {
        code: currency,
    })
}

export const formatCurrency = ({ value, currency }) => {
    return currencyFormatter.format(value, {
        code: currency,
    })
}