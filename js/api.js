const standingsUrl = "https://api.football-data.org/v2/competitions/2021/standings";
const matchUrl = "https://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED";
const teamUrl = "https://api.football-data.org/v2/teams/";

const fetchApi = url => {
	return fetch(url, {
		method: "GET",
		headers : {
			"X-Auth-Token": "d39071d91e2f45dcb3676528f6225a1f",
		}
	});
};


function status(response){
	if(response.status !== 200){
		console.log("Error : "+ response.status);

		return Promise.reject(new Error(response.statusText));
	}else{

		return Promise.resolve(response);
	}
}

function json(response){
	return response.json();
}

function error(error){
	console.log("Error : "+ error);
}

function getStandings(){

	fetchApi(standingsUrl)
	.then(status)
	.then(json)
	.then(function(data){
		
		let card = document.getElementById("card");
		let loader  = document.getElementById("loader-kelasemen");
		loader.style.display = 'none';
		card.style.display = 'block';


		let seasonHTML = "";

		let standingsHTML = "";

		let startDate = new Date(data.season.startDate);
		let endDate = new Date(data.season.endDate);
		
		seasonHTML += `
			<h6><b>Season ${startDate.getFullYear()} - ${endDate.getFullYear()}<b></h6>
		`;

		document.getElementById("season").innerHTML = seasonHTML;

		data.standings.forEach(function(standings){
			//ambil type
			let type = standings.type;
			
			standings.table.forEach(function(table){
				
				//type total
				if(type == "TOTAL"){
					standingsHTML += `
					<tr>
			          	<td>${table.position}.</td>
			            <td><img src="${table.team.crestUrl}" alt="team" width="30"/></td>
			            <td>${table.team.name}</td>
			            <td>${table.playedGames}</td>
			            <td>${table.won}</td>
			            <td>${table.draw}</td>
			            <td>${table.lost}</td>
			            <td>${table.points}</td>
			            <td>${table.goalsFor}</td>
			            <td>${table.goalsAgainst}</td>
			            <td>${table.goalDifference}</td>
		            </tr>
						         
				`;
				}
				
			});

		});

		document.getElementById("kelasemen").innerHTML = standingsHTML;


	})
	.catch(error);
}

function getMatch(){

	fetchApi(matchUrl)
	.then(status)
	.then(json)
	.then(function(data){

		let loader  = document.getElementById("loader-jadwal");
		
		loader.style.display = 'none';

		let matchHTML = "";

		data.matches.forEach(function(match){
			

			let startDate = new Date(match.utcDate);
			let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			matchHTML += `
					
					<div class="col s12 m6 card">
						<div class="card-content center">
							<span class="card-title">
							${days[startDate.getDay()]}, ${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}
							<br>
							${(startDate.getHours()<10) ? "0"+startDate.getHours() : startDate.getHours()} : ${(startDate.getMinutes()<10) ? "0"+startDate.getMinutes() : startDate.getMinutes()}
							</span>

							<span style="text-size:12px;">
								${match.homeTeam.name} VS ${match.awayTeam.name}
							</span>
							<br>
							<br>
							<a class="btn waves-effect waves-light black" id="save" onclick="saveMatch('${match.id}','${match.utcDate}','${match.homeTeam.name}', '${match.awayTeam.name}')"><i class="material-icons left">save</i>Simpan</a>
						</div>

					</div>
				
			`;

		});


		document.getElementById("jadwal").innerHTML = matchHTML;
	})
	.catch(error);
}


function getTeams(){

	fetchApi(standingsUrl)
	.then(status)
	.then(json)
	.then(function(data){

		let loader  = document.getElementById("loader-tim");

		loader.style.display = 'none';

		let teamHTML = "";

		data.standings.forEach(function(standings){
			//ambil type
			let type = standings.type;
			
			standings.table.forEach(function(table){
				
				//type total
				if(type == "TOTAL"){
					teamHTML += `
					<div class="col s12 m6 card">
						<div class="card-content center">

							<div class="card-image waves-effect waves-block waves-light tim">
								<a href="../pages/detail-tim.html?id=${table.team.id}">
									<img src="${table.team.crestUrl}" alt="logo tim"/>
								</a>
							</div>
							<span class="card-title truncate">
								${table.team.name}
							</span>

							
						</div>

					</div>
						         
				`;
				}
				
			});

		});

		document.getElementById("tim").innerHTML = teamHTML;


	})
	.catch(error);
}

function getTeamsById(){

	return new Promise(function(resolve, reject){

		let urlParams = new URLSearchParams(window.location.search);
		let idParams = urlParams.get("id");

		fetchApi(teamUrl+idParams)
		.then(status)
		.then(json)
		.then(function(data){

			let loader  = document.getElementById("loader-detail-tim");
			loader.style.display = 'none';

			console.log(data);
			
			let detailTeamHTML = "";

			detailTeamHTML += `
				<div class="card">
					<div class="card-image">
						<img src="${data.crestUrl}" alt="team" class="tim"/>
					</div>
					<div class="card-content">
						<span class="card-title center">${data.name}</span>
						<div class="row center">
			`;

			data.squad.forEach(function(squad){
				detailTeamHTML += `
							
							<div class="col s12 m3 box-player">
								<span>${squad.position ?? "Player"}</span>
								<h6>
								<b>${squad.name}</b>
								</h6>
							</div>
							
				`;
			})

			detailTeamHTML += `
						</div>
					</div>
				</div>
			`;

			document.getElementById("body-content").innerHTML = detailTeamHTML;
			resolve(data);
		});
	});

}

function getSavedMatches(){
	getAllMatches().then(function(match){

		let matchHTML = "";
		let i ;
		
		for(i in match){
			console.log(match[i]);

			

			let startDate = new Date(match[i].date);

			let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			matchHTML += `
					
				<div class="col s12 m6 card">
					<div class="card-content center">
						<span class="card-title">
						${days[startDate.getDay()]}, ${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}
						<br>
						${(startDate.getHours()<10) ? "0"+startDate.getHours() : startDate.getHours()} : ${(startDate.getMinutes()<10) ? "0"+startDate.getMinutes() : startDate.getMinutes()}
						</span>

						<span style="text-size:12px;">
							${match[i].home} VS ${match[i].away}
						</span>
						<br>
						<br>
						<a class="btn waves-effect waves-light black" onclick="deleteSaveMatch('${match[i].id}')"><i class="material-icons left">delete</i>Hapus</a>

					</div>

				</div>
				
			`;
		}

		let loader  = document.getElementById("loader-save-jadwal");
		loader.style.display = 'none';

		

		if(!match.length == 0){
			document.getElementById("save-jadwal").innerHTML = matchHTML;

		}

	});

}

function getSavedTeams(){
	getAllTeams().then(function(team){

		let teamHTML = "";
		let loader  = document.getElementById("loader-save-tim");
		loader.style.display = 'none';

		let i;

		for(i in team){
			// console.log(team[i]);

			teamHTML += `
				<div class="col s12 m6 card">
					<div class="card-content center">

						<div class="card-image waves-effect waves-block waves-light tim">
							<a href="../pages/detail-tim.html?id=${team[i].id}&saved=true">
								<img src="${team[i].crestUrl}" alt="logo tim"/>
							</a>
						</div>
						<span class="card-title truncate">
							${team[i].name}
						</span>

						<a class="btn waves-effect waves-light black" onclick="deleteSaveTeam(${team[i].id})"><i class="material-icons left">delete</i>Hapus</a>

					</div>

				</div>
					         
			`;
		}

		document.getElementById("save-tim").innerHTML = teamHTML;
	});
}

function getSavedTeamsById(){
	let urlParams = new URLSearchParams(window.location.search);
	let idParams = urlParams.get("id");

	getTeamsById(idParams).then(function(data){
		console.log(data);

		let detailTeamHTML = "";

			detailTeamHTML += `
				<div class="card">
					<div class="card-image">
						<img src="${data.crestUrl}" alt="team" class="tim"/>
					</div>
					<div class="card-content">
						<span class="card-title center">${data.name}</span>
						<div class="row center">
			`;

			data.squad.forEach(function(squad){
				detailTeamHTML += `
							
							<div class="col s12 m3 box-player">
								<span>${squad.position ?? "Player"}</span>
								<h6>
								<b>${squad.name}</b>
								</h6>
							</div>
							
				`;
			})

			detailTeamHTML += `
						</div>
					</div>
				</div>
			`;

			document.getElementById("body-content").innerHTML = detailTeamHTML;
	});
}

