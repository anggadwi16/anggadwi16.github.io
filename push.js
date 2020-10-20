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

	"endpoint" : " https://fcm.googleapis.com/fcm/send/d7exMWtiu_k:APA91bHgw2b-nfBWwZYLrn1qqO_z_ZJlC4dti-yf4Siv9kc7X9KVNiBfIsnsQlNyrAGyP5oGANL6hYYiCl7_72IE_gfnd6cARbR-Kl4hdNRm1BntFWo-HqBQjgfZ-djrfR6VXwnzW6a1",
	"keys" : {

		"p256dh" : "BDCeZ7kspMcNTgVM/D22pjH5Ql0cYB1kXpgbK4vhDYcuDXoDIYdyPmea8UIUN+R5Ad1zNykKATp36rohSarFJ0A=",
		"auth" : "wdC8fJWMaVwjDngTKTtm+A=="
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