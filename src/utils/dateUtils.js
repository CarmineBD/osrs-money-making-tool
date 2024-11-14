export function convertUnixToDate(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Europe/Madrid"
    };
    const formattedDate = date.toLocaleDateString("es-ES", options);
    return formattedDate;
}

export function convertUnixToTime(milliseconds) {
    const units = [
        { label: 'meses', duration: 30 * 24 * 60 * 60 * 1000 },
        { label: 'sem', duration: 7 * 24 * 60 * 60 * 1000 },
        { label: 'd', duration: 24 * 60 * 60 * 1000 },
        { label: 'h', duration: 60 * 60 * 1000 },
        { label: 'm', duration: 60 * 1000 },
        // { label: 's', duration: 1000 }
    ];

    let timeString = '';

    for (const unit of units) {
        const value = Math.floor(milliseconds / unit.duration);
        milliseconds %= unit.duration;
        if (value > 0) {
            timeString += `${value}${unit.label}, `;
        }
    }

    return timeString.replace(/,\s$/, '');
}

export function convertUnixToTimeAgo(milliseconds) {
    const units = [
        { label: 'meses', duration: 30 * 24 * 60 * 60 * 1000 },
        { label: 'sem', duration: 7 * 24 * 60 * 60 * 1000 },
        { label: 'd', duration: 24 * 60 * 60 * 1000 },
        { label: 'h', duration: 60 * 60 * 1000 },
        { label: 'm', duration: 60 * 1000 },
        { label: 's', duration: 1000 }
    ];

    let timeString = '';

    for (const unit of units) {
        const value = Math.floor(milliseconds / unit.duration);
        milliseconds %= unit.duration;
        if (value > 0) {
            timeString += `${value} ${unit.label}, `;
        }
    }

    return timeString.replace(/,\s$/, '');
}

