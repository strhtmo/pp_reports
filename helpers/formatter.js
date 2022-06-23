function formatDate(date) {
    return date.toLocaleString('id-ID', { weekday:"long", month:"long", day:"numeric", year: "numeric"})
}

module.exports = formatDate