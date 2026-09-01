type TextInputValue = string | number | null | undefined;
type InputMode = 'numeric' | 'decimal';
export interface TextInputMask {
    prefixText?: string;
    suffixText?: string;
    inputmode?: InputMode;
    format: (value: TextInputValue) => string;
    parse: (inputValue: string, currentValue: TextInputValue) => TextInputValue;
    normalizeOnBlur?: (currentValue: TextInputValue) => TextInputValue;
}
export interface MoneyMaskOptions {
    locale?: string;
    prefixText?: string;
    min?: number | null;
    max?: number | null;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    allowNegative?: boolean;
}
export interface PercentageMaskOptions {
    suffixText?: string;
    min?: number | null;
    max?: number | null;
}
export declare function createMoneyMask({ locale, prefixText, min, max, minimumFractionDigits, maximumFractionDigits, allowNegative }?: MoneyMaskOptions): TextInputMask;
export declare function createPercentageMask({ suffixText, min, max }?: PercentageMaskOptions): TextInputMask;
export {};
