export const checkType = (str) => {
    const numericPattern = /^[0-9]+\.{0,1}[0-9]*$/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const dateTimePattern = /^\d{4}-\d{2}-\d{2}(T|\s)\d{2}:\d{2}:\d{2}(\.\d{6}Z{0,1}){0,1}$/;
    const jsonPattern = /^\[\{.+\}\]$/;
    if (numericPattern.test(str)) {
        return `${str}`;
    } else if (datePattern.test(str)) {
        return `'${str}'`;
    } else if (dateTimePattern.test(str)) {
        return `'${str}'`;
    } else if (jsonPattern.test(str)) {
        return `'${str}'`;
    }
    return `'${str}'`;
}