import { io } from 'socket.io-client'
import { SOCKET_URL, CHAT_SOCKET_URL } from '@env'

var connection = null
var chatConnection = null;

export const initSocket = (token) => {
    if (!connection) {
        connection = io('ws://192.168.1.45:1337', {
            autoConnect: true,
            extraHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    return connection
}

export const initChatSocket = (token) => {
    if (!chatConnection) {
        chatConnection = io('https://chat.clava.dev', {
            autoConnect: true,
            auth: { token: `Bearer ${token}` }
        })
    }
    return chatConnection
}

export const clearChatSocket = () => {
    if (chatConnection) {
        chatConnection.destroy();
        chatConnection = null
    }
}

export const clearSocket = () => {
    if (connection) {
        connection.destroy();
        connection = null
    }
}
