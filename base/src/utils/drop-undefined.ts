export function dropUndefined<T extends object = object>(record: T) {
    const entries = Object.entries(record).filter(
        ([, v]) => typeof v !== 'undefined'
    );
    const result = Object.fromEntries(entries) as T;
    return result;
}
