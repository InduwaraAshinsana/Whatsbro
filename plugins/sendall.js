const Asena = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const Language = require('../language');
const config = require('../config');
const {DataTypes} = require('sequelize');

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
        return false;
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

Asena.addCommand({pattern: 'set_sendall (.*)', fromMe: true, desc: "Set chatids for sendall"}, (async (message, match) => {
    var conn=new WAConnection()
    await message.sendMessage("got it");
    console.log(message.jid)
    await conn.sendMessage(message.jid,"hello",MessageType.text)
    console.log(match)
    console.log(message)

}));
