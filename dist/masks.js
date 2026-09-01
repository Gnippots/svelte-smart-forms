function toNumber(value) {
    if (typeof value === 'number') {
        return Number.isNaN(value) ? null : value;
    }
    if (value === null || value === undefined || value === '') {
        return null;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
}
function clamp(value, min, max) {
    if (min !== null && value < min) {
        return min;
    }
    if (max !== null && value > max) {
        return max;
    }
    return value;
}
export function createMoneyMask({ locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US', prefixText = '$', min = null, max = null, minimumFractionDigits = 0, maximumFractionDigits = 0, allowNegative = false } = {}) {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits,
        maximumFractionDigits
    });
    const allowsDecimals = maximumFractionDigits > 0;
    return {
        prefixText,
        inputmode: allowsDecimals ? 'decimal' : 'numeric',
        format(value) {
            const numericValue = toNumber(value);
            return numericValue === null ? '' : formatter.format(numericValue);
        },
        parse(inputValue, currentValue) {
            const expression = allowNegative || allowsDecimals ? /[^0-9.-]/g : /[^0-9]/g;
            const cleaned = inputValue.replace(expression, '');
            if (cleaned === '' || cleaned === '-' || cleaned === '.') {
                return null;
            }
            const parsed = allowsDecimals ? Number(cleaned) : parseInt(cleaned, 10);
            return Number.isNaN(parsed) ? currentValue : parsed;
        },
        normalizeOnBlur(currentValue) {
            const numericValue = toNumber(currentValue);
            return numericValue === null ? null : clamp(numericValue, min, max);
        }
    };
}
export function createPercentageMask({ suffixText = '%', min = 0, max = 100 } = {}) {
    return {
        suffixText,
        inputmode: 'decimal',
        format(value) {
            return value === null || value === undefined ? '' : String(value);
        },
        parse(inputValue, currentValue) {
            const cleaned = inputValue.replace(/[^0-9.-]/g, '');
            if (cleaned === '' || cleaned === '-' || cleaned === '.') {
                return null;
            }
            const parsed = Number(cleaned);
            return Number.isNaN(parsed) ? currentValue : parsed;
        },
        normalizeOnBlur(currentValue) {
            const numericValue = toNumber(currentValue);
            return numericValue === null ? null : clamp(numericValue, min, max);
        }
    };
}
