import { isArray, isObject } from 'util';


export function getTitleOrder(order) {
    switch (order) {
        case '1':
            return 1
        case '2':
            return 2
        case '3':
            return 3
        case '4':
            return 4
        case '5':
            return 5
        case '6':
            return 6
        default:
            return 3
    }
}

export function displayErrors(form, errors, parentKey = null) {
    for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
            const key = parentKey ? `${parentKey}.${field}` : field;
            const value = errors[field];

            if (isArray(value)) {
                form.setFieldError(key, value?.join(", "))
            }
            else if (isObject(value)) {
                displayErrors(form, value, key);
            }
        }
    }
}


export function addFiltersToUrl(url, filters) {
    let updatedUrl = url;

    // Check if filters exist
    if (filters && Object.keys(filters).length > 0) {
        const params = new URLSearchParams();

        // Iterate over each filter and add it as a query parameter
        Object.entries(filters).forEach(([key, value]) => {
            params.append(key, value);
        });

        // Append the query parameters to the URL
        updatedUrl += `?${params.toString()}`;
    }

    return updatedUrl;
}


export function updatePageFilter(path, page) {
    const url = new URL(path, APP_URL); // Parse the existing URL

    // Get the existing query parameters as an object
    const params = Object.fromEntries(url.searchParams.entries());

    // Update the "page" filter
    params.page = page;

    // Create a new URL with the updated query parameters
    const updatedUrl = new URL(url.pathname, APP_URL);
    updatedUrl.search = new URLSearchParams(params).toString();

    return updatedUrl.toString();
}


export function getColor(level) {
    let color = 'blue'
    switch (level) {
        case 1:
            color = '#DCFFD6'
            break;
        case 2:
            color = '#97FF85'
            break;
        case 3:
            color = '#74FF5C'
            break;
        case 4:
            color = '#158F00'
            break;
        default:
            break;
    }
    return color
}

export function getTooltip(level) {
    let tip = 'New Request'
    switch (level) {
        case 1:
            tip = 'Awaiting Check'
            break;
        case 2:
            tip = 'Awaiting Approval'
            break;
        case 3:
            tip = 'Awaiting Disbursment'
            break;
        case 4:
            tip = 'Complete'
            break;
        default:
            break;
    }
    return tip
}