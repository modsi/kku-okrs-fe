export function getAmountPattern(values) {
    if (values > 0 && values != undefined && values != "" && values != null) {
        const rePattern = String(values).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return rePattern;
    } if (values === 0 || values === undefined || values === "") {
        return 0;
    } else if (values < 0) {
        const rePattern = String(values).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return rePattern;
    } else {
        return null;
    }
};
export function getDecimalPattern(values, fixed = 2) {
    if (values != undefined && values != "" && values != null) {
        var amount = parseFloat(values).toFixed(fixed);
        var cast = amount.split(".");
        var formattedString = cast[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + cast[1];
        return formattedString;
    } else if (values === "0" || values === 0 || values === "" || values === undefined) {
        return parseFloat("0").toFixed(fixed);
    } else {
        return null;
    }
};

export function formatCurrency(values) {
    // > 0
    if (values && values != undefined && values != "" && values != null) {
        var cast = values.split(".");
        var prefixSet = cast[1] !== undefined ? "." + cast[1] : ""
        var formattedString = cast[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + prefixSet;
        return formattedString;
    }
};

export function getCurrencyPattern(values, dot) {
    if (values != undefined && values != "" && values != null) {
        var amount = parseFloat(values).toFixed(dot);
        var cast = amount.split(".");
        var formattedString = cast[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + cast[1];
        return formattedString;
    } else if (values === "0" || values === 0 || values === "" || values === undefined) {
        return 0;
    } else {
        return null;
    }
};

export function addBusinessDays(originalDate, numDaysToAdd) {
    const Sunday = 0;
    const Saturday = 6;
    let daysRemaining = numDaysToAdd;

    let newDate = originalDate.clone();

    while (daysRemaining > 0) {
        newDate = newDate.add(1, 'days');
        if (newDate.day() !== Sunday && newDate.day() !== Saturday) {
            daysRemaining--;
        }
    }

    return newDate;
};

export function OnchangeFormatCurrency(e) {
    let value = allowNumberOnly(e)
    if (value > 0) {
        value = new Intl.NumberFormat('th-TH', {
            minimumFractionDigits: 2,
        }).format(value)

    } else {
        value = ''
    }

    return value
}

export function OnchangeFormatShares(e) {
    let value = allowNumberOnly(e)
    if (value || value !== '') {
        value = new Intl.NumberFormat('th-TH', {
            minimumFractionDigits: 10,
        }).format(value)

    } else {
        value = ''
    }
    return value
}



export function allowNumberOnly(e) {
    let value = null
    if (/^[0-9.\b]+$/.test(e)) {
        value = e
    }
    return value
}

export function removeCurrency(e) {
    return e.replace(/,/g, '')
}
