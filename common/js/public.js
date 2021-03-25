const localTime = function (date) {
    const D = new Date(date);
    const y = D.getFullYear();
    const m = D.getMonth() + 1 < 10 ? ('0'+(D.getMonth() + 1)) : D.getMonth() + 1;
    const d = D.getDate() < 10 ? ('0'+D.getDate()) : D.getDate();
    const h = D.getHours() < 10 ? ('0'+D.getHours()) : D.getHours();
    const s = D.getMinutes() < 10 ? ('0'+D.getMinutes()) : D.getMinutes();
    const ss = D.getSeconds() < 10 ? ('0'+D.getSeconds()) : D.getSeconds();

    return `${y}-${m}-${d}`;
}

export {localTime}