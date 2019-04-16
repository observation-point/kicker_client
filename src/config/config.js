const target_local = window.location.hostname.indexOf('kicker') !== -1;

const apiUrl = target_local ?
    `http://${window.location.hostname}/api` :
    `http://${window.location.hostname}:8888/api`;
const socketUrl = target_local ?
    `http://${window.location.hostname}` :
    `http://${window.location.hostname}:8889`;

export default {
    api_url: apiUrl,
    socket_url: socketUrl
};
