import AgoraRTM from 'agora-rtm-sdk'

import { AGORA_APP_ID } from '@env'

var instance = null;

class AgoraChat {
    constructor() {
        this._channel = null;
        this._chat = null
    }
    async connect() {
        this._chat = AgoraRTM.createInstance(AGORA_APP_ID)
    }

    async login(token, currentUser) {
        await this._chat.login({
            uid: currentUser.objectId,
            token
        })
        await this._chat.setLocalUserAttributes({
            id: currentUser.objectId,
            imageUrl: currentUser.imageUrl.url,
            username: currentUser.username
        })
        console.log('logged in ===>>')
    }

    getChannel() {
        return this._channel
    }

    async getChannelMemberCount(channelId) {
        let result = await this._chat.getChannelMemberCount([channelId])
        return result ? result[channelId] : 0
    }

    getChatInstance() {
        return this._chat
    }

    getUserDetails(userId) {
        return this._chat.getUserAttributes(userId)
    }

    async sendMessage({ message, description }) {
        await this._channel.sendMessage({ text: message, messageType: "TEXT", description });
    }

    async joinChannel(channelId) {
        this._channel = this._chat.createChannel(channelId)
        if (this._channel) {
            await this._channel.join()
        }
    }

    async leaveChannel() {
        if (this._channel) {
            await this._channel.leave()
            this._channel = null
        }
    }

    static init() {
        if (!instance) {
            instance = new AgoraChat();
            return instance.connect();
        }
    }

    static getInstance() {
        if (!instance) {
            throw new Error("no active instance");
        }
        return instance;
    }
}


export default {
    connect: AgoraChat.init,
    instance: AgoraChat.getInstance
}