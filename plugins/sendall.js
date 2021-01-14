const Asena = require('../events');
const {WAConnection, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const Language = require('../language');
const config = require('../config');
const {DataTypes} = require('sequelize');
const conn=new WAConnection()
const SendallDB = config.DATABASE.define('s_chats', {
    chat_list: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


async function getSendall(jid = null) {
    var Wher = {chat_list: jid};
    var Msg = await SendallDB.findAll({
        where: Wher
    });

    if (Msg.length < 1) {
        return false;
    } else {
        return Msg;
    }
}

async function setSendall(jid = null) {
    var Msg = await SendallDB.findAll({
        where: {
            chat_list: jid
        }
    });
    if (Msg.length < 1) {
        return await SendallDB.create({chat_list: jid});
    } else {
        return await Msg[0].update({chat_list:jid});
    }
}

async function deleteSendall(jid = null) {
    var Msg = await SendallDB.findAll({
        where: {
            chat_list: jid
        }
    });

    if (Msg.length < 1) {
        return false;
    } else {
        return await Msg[0].destroy();
    }
}

Asena.addCommand({pattern: 'chatid', fromMe: true, desc: "find id of a chat"}, (async (message, match) => {
    await message.client.sendMessage(message.jid,message.jid,MessageType.text)
}));

Asena.addCommand({pattern: 'set_sendall (.*)', fromMe: true, desc: "Set chatids for sendall"}, (async (message, match) => {
    await message.sendMessage("got it");
    console.log(match[1])
    // ids=match[1]
    // for(i=0;i<ids.length;i++){
    //     await setSendall(ids[i]);
    // }
}));

Asena.addCommand({pattern: 'sendall (.*)', fromMe: true, desc: "send to all group members"}, (async (message, match) => {
    grup = await message.client.groupMetadata(message.jid);
    mesaj = '';
    if(match[1]) {
        grup['participants'].map(
            async (uye) => {
                u_jid = uye.id.replace('c.us', 's.whatsapp.net');
                await message.client.sendMessage(u_jid, match[1], MessageType.text)
            }
        );
    }

}));

