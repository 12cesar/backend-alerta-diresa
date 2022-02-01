const admin = require("firebase-admin");

function initFirebase() {
    const serviceAccount = require('../keys/alerta-diresa-firebase-adminsdk-g43t2-b1eb5d8b2e.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

initFirebase();

function sendPushToOneUser(notification) {
    const message = {
        token: notification.tokenId,
        data: {
            title: notification.titulo,
            body: notification.mensaje
        }
    }
    sendMessage(message);
}

function sendPushToTopic(notification) {
    const message = {
        topic: notification.topic,
        data: {
            title: notification.titulo,
            body: notification.mensaje
        }
    }
    sendMessage(message);
}



function sendMessage(message) {
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        })
}
module.exports = { sendPushToOneUser, sendPushToTopic }