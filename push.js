let webPush = require('web-push');

const vapidKeys = {
	"publicKey" : "BIJjZAVel1bnCgcSjw2r0twvkd8YCujQlOB50Su4JxfaDITv-o2zOgfIvMA57K7p7ymhhTlStSZS3ToIl5saukY",
	"privateKey" : "LTFEp2CbdHBKhG59OPy-MQo9dH2nF7BnQluo5Xha1qs"
};

webPush.setVapidDetails(

	'mailto:a123aku@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)

let pushSubcription = {

	"endpoint" : " https://fcm.googleapis.com/fcm/send/cb1A6VlC6Oc:APA91bFChJxcDsyuC8-j6pyht-xing252fcgdz3ruEvlwO2m3yLV6dVr8pRWLvsPxoDYG6L_q7fZ2JtLxue4LAAuqeJGdvjM6IP2DaFm2z8oBPbU1YtKxgAct7JqnHAXO6uhpo91epKe",
	"keys" : {

		"p256dh" : "BBbXD6EEApAYY/2W5+bEj6S+NVHUrLi511F5cYj1VMdWuCu1BdGDfM/5ZNME6votwtIGKWRO9KM+Bp6N00UB6EM=",
		"auth" : "gi9Z3V3oxkn04noUlIVXtA=="
	}

};

let payload = "Selamat! Aplikasi anda sudah dapat menerima push notifikasi!";

let options = {
	gcmAPIKey : "1052665705674",
	TTL : 60
};

webPush.sendNotification(

	pushSubcription,
	payload,
	options
);