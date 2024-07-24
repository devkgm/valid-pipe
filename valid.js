const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_LENGTH_5: /^.{5,}$/,
    MIN_LENGTH_8: /^.{8,}$/,
    MAX_LENGTH_10: /^.{0,10}$/,
    ONLY_NUMBERS: /^\d+$/,
    ONLY_LETTERS: /^[a-zA-Z]+$/,
    ONLY_LOWERCASE: /^[a-z]+$/,
    ONLY_UPPERCASE: /^[A-Z]+$/,
    ALPHA_NUMERIC: /^[a-zA-Z0-9]+$/,
    NO_WHITESPACE: /^\S+$/,
    NO_SPECIAL_CHARS: /^[^!@#$%^&*(),.?":{}|<>]+$/,
    DATE_YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DATE_DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    TIME_24_HOUR: /^([01]\d|2[0-3]):([0-5]\d)$/,
    TIME_12_HOUR: /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/,
    URL: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
    POSTAL_CODE_US: /^\d{5}(-\d{4})?$/,
    POSTAL_CODE_CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    CREDIT_CARD:
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
    IP_ADDRESS_V4:
        /^(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})(\.(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})){3}$/,
    IP_ADDRESS_V6:
        /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){6}|:):([0-9a-fA-F]{1,4}|:){0,5}((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})|(([0-9a-fA-F]{1,4}:){5}|:):([0-9a-fA-F]{1,4}|:){0,4}((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})|(([0-9a-fA-F]{1,4}:){4}|:):([0-9a-fA-F]{1,4}|:){0,3}((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})|(([0-9a-fA-F]{1,4}:){3}|:):([0-9a-fA-F]{1,4}|:){0,2}((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})|(([0-9a-fA-F]{1,4}:){2}|:):([0-9a-fA-F]{1,4}|:){0,1}((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})|(([0-9a-fA-F]{1,4}:){1}|:):((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})|(:((25[0-5]|2[0-4]\d|[0-1]?\d{1,2})\.){3}(25[0-5]|2[0-4]\d|[0-1]?\d{1,2})|(([0-9a-fA-F]{1,4}:){0,7}|:)([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,7}|:)))$/,
    HEX_COLOR: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    PHONE_US: /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/,
    PHONE_INTL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    PASSWORD_STRONG:
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=\[\]{};:'",.<>?/\\|`~])[A-Za-z\d@$!%*?&^#()_\-+=\[\]{};:'",.<>?/\\|`~]*$/,
};
const getRegexName = (regex) => {
    for (const [name, value] of Object.entries(REGEX)) {
        if (regex.toString() === value.toString()) {
            return name;
        }
    }
    return null;
};
const defaultErrorCallback = (data, regex) => {
    const regexName = getRegexName(regex);
    if (regexName) {
        console.error(
            `Validation failed for data: "${data}" with regex constant: ${regexName}`
        );
    } else {
        console.error(
            `Validation failed for data: "${data}" with regex: ${regex}`
        );
    }
};
const createValidator = () => {
    let dataSet = [];

    const setData = (newData, ...regexAndCallbacks) => {
        const regexes = [];
        let i = 0;

        while (i < regexAndCallbacks.length) {
            const regex = regexAndCallbacks[i];
            const errorCallback =
                typeof regexAndCallbacks[i + 1] === "function"
                    ? regexAndCallbacks[i + 1]
                    : defaultErrorCallback;
            regexes.push({ regex, errorCallback });
            i += 2;
        }

        dataSet.push({ data: newData, regexes });
        return createValidatorInstance();
    };

    const addTest = (regex, errorCallback = defaultErrorCallback) => {
        if (dataSet.length === 0) {
            throw new Error("setData를 먼저 호출해야 합니다.");
        }
        dataSet[dataSet.length - 1].regexes.push({ regex, errorCallback });
        return createValidatorInstance();
    };

    const check = () => {
        for (let { data, regexes } of dataSet) {
            for (let { regex, errorCallback } of regexes) {
                if (!regex.test(data)) {
                    errorCallback(data, regex);
                    return false;
                }
            }
        }
        return true;
    };

    const createValidatorInstance = () => ({
        setData,
        addTest,
        check,
    });

    return createValidatorInstance();
};
