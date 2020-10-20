let dbPromised = idb.open("premier-league",1, function(upgradeDb){
	let matchesObjectStore = upgradeDb.createObjectStore("matches", {
		keyPath : "id"
	});

	let teamsObjectStore = upgradeDb.createObjectStore("teams", {
		keyPath : "id"
	});

	teamsObjectStore.createIndex("name", "name", {unique : false});

	
	matchesObjectStore.createIndex("home", "home", {unique : false});
});

function saveTeams(teams){
	dbPromised
		.then(function(db){
			let transaction = db.transaction("teams", "readwrite");
			let store = transaction.objectStore("teams");

			console.log(teams);

			store.put(teams);

			return transaction.complete;
		})
		.then(function(){
			console.log("Tim berhasil disimpan");
			M.toast({html: 'Tim berhasil disimpan', classes: 'rounded'});

		})
		.catch(function(error){
			M.toast({html: 'Sudah disimpan', classes: 'rounded'});
			
		})
}

function saveMatches(matches){
	dbPromised
		.then(function(db){
			let transaction = db.transaction("matches", "readwrite");
			let store = transaction.objectStore("matches");

			console.log(matches);

			store.put(matches);
			return transaction.complete;
		})
		.then(function(){
			console.log("Jadwal pertandingan berhasil disimpan!");
			M.toast({html: 'Jadwal pertandingan berhasil disimpan!', classes: 'rounded'});
			
		})
		.catch(function(error){
			M.toast({html: 'Sudah disimpan', classes: 'rounded'});
		
		});
}

function getAllMatches(){
	return new Promise(function(resolve, reject){
		dbPromised
			.then(function(db){
				let transaction = db.transaction("matches", "readonly");
				let store = transaction.objectStore("matches");
				return store.getAll();
			})
			.then(function(match){
				resolve(match);
			});
	});
}

function getAllTeams(){
	return new Promise(function(resolve, reject){
		dbPromised
			.then(function(db){
				let transaction = db.transaction("teams","readonly");
				let store = transaction.objectStore("teams");
				return store.getAll();
			})
			.then(function(team){
				resolve(team);
			});
	});
}

function getTeamById(id){
	return new Promise(function(resolve, reject){
		dbPromised
			.then(function(db){
				let transaction = db.transaction("teams", "readonly");
				let store = transaction.objectStore("teams");
				return store.get(id);
			})
			.then(function(tean){
				resolve(team);
			});
	});
}

function deleteSaveMatch(id){
	dbPromised.then(function(db){
		let transaction = db.transaction("matches", "readwrite");
		let store = transaction.objectStore("matches");
		store.delete(id);
		return transaction.complete;
	})
	.then(function(){
		console.log("berhasil dihapus");
		
		M.toast({html: 'Jadwal berhasil dihapus', classes: 'rounded', completeCallback: function(){
			location.reload();
		}});
		
	});
}

function deleteSaveTeam(id){
	dbPromised.then(function(db){
		let transaction = db.transaction("teams", "readwrite");
		let store = transaction.objectStore("teams");
		store.delete(id);
		return transaction.complete;
	})
	.then(function(){
		console.log("berhasil dihapus");
		M.toast({html: 'Tim berhasil dihapus', classes: 'rounded', completeCallback: function(){
			location.reload();

		}});
		
	});
}