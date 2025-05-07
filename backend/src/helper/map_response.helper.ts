export function parseResponseData(res: any) {
    const parsed = res.toJSON();
    if (parsed.data) {
        parsed.data = JSON.parse(parsed.data);
    }
    return parsed;
}
