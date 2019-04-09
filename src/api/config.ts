const apiUrl = window.location.hostname === 'kicker.lan' ?
    `http://${window.location.hostname}/api` :
    `http://${window.location.hostname}:8888/api`;

export default {
    api_url: apiUrl,
    socket_url: `http://${window.location.hostname}:8889`
}
