const target_local = window.location.hostname.indexOf('kicker') !== -1;

const apiUrl = target_local ?
    `${window.origin}/api` :
    `http://kicker.lan:8888/api`;
const socketUrl = target_local ?
    `${window.origin}` :
    `http://kicker.lan:8889`;

export default {
    api_url: apiUrl,
    socket_url: socketUrl
};
