export const saveClicks = (value) => {
    localStorage.setItem('Usuarios', value)
}

export const getClicks = () => {
    const clicks = localStorage.getItem('Usuarios')
    if (!clicks) return 0
    return clicks
}