import 'bootstrap';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
// import Echo from 'laravel-echo';
// import io from 'socket.io-client'; // вот это нужно для socket.io
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// window.io = io;
//
// window.Echo = new Echo({
//     broadcaster: 'socket.io',
//     host: "localhost" + ':6001',
//     logToConsole: true,
//     transports: ['websocket', 'polling', 'flashsocket'],
// });
// console.log(window.Echo);
// window.Echo.connector.socket.on('connect', () => {
//     console.log('Socket connected 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
// });
// window.Echo.channel('some-channel')
//     .listen('SomeTestEvent', (e) => {
//         console.log('📡📡📡📡📡📡📡📡 Received event:', e);
//     });
//
// window.Echo.connector.socket.on('message', (msg) => {
//     console.log('📩 Message from Echo Server:', msg);
// });
// window.Echo.connector.socket.on('connect_error', (err) => {
//     console.log('Socket connection error:', err);
// });


import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY, // должен совпадать с PUSHER_APP_KEY
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
});



window.Echo.connector.pusher.connection.bind('connected', () => {
    console.log('✅ Pusher подключен! 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀');
});
window.Echo.connector.pusher.connection.bind('error', (err) => {
    console.error('❌ Ошибка подключения к Pusher:', err);
});

window.Echo.connector.pusher.connection.bind('state_change', (states) => {
    console.log('📡📡📡📡📡📡📡📡 Состояние Pusher:', states);
});
window.Echo.channel('some-channel')
    .listen('.SomeTestEvent', (e) => {
        console.log('Получено событие SomeTestEvent:', e);
        alert('Новое событие с данными: 📡📡📡📡📡📡📡📡📡📡📡📡📡📡📡📡 ' + JSON.stringify(e.data));
    });
