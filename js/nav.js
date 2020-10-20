document.addEventListener("DOMContentLoaded", function(){
	let elems = document.querySelectorAll(".sidenav");
	M.Sidenav.init(elems);

	let page = window.location.hash.substr(1);
	if(page === "") page = "kelasemen";

	loadPage();
	loadNav();

	function loadNav(){
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4){
				if(this.status != 200) return;

				//Muat daftar tautan menu
				document.querySelectorAll(".topnav, .sidenav").forEach(function(elm){
					elm.innerHTML = xhttp.responseText;
				});

				//Daftarkan event listener untuk setiap tautan menu
				document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm){
					elm.addEventListener('click', function(event){

						//Tutup sidenav
						let sidenav = document.querySelector(".sidenav");
						M.Sidenav.getInstance(sidenav).close();

						//Memuat konten halaman yang dipanggil
						page = event.target.getAttribute("href").substr(1);
						loadPage();
					});
				});
			}
		};

		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}

	function loadPage(){
		let xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function(){
			if(this.readyState == 4){
				let content = document.querySelector("#body-content");

				if(page === "kelasemen"){
					getStandings();

				}else if(page === "jadwal"){
					getMatch();

				}	
				else if(page === "tim"){
					getTeams();
				
				}	

				else if(page === "save-jadwal"){
					getSavedMatches();
				}

				else if(page === "save-tim"){
					getSavedTeams();
				}

				if(this.status == 200){
					content.innerHTML = xhttp.responseText;

				}else if(this.status == 404){
					content.innerHTML = "<p>Halaman tidak ditemukan</p>";
				}else{
					content.innerHTML = "<p>Ups halaman tidak dapat di akses</p>";

				}
			}
		};

		xhttp.open("GET", "pages/" + page + ".html", true);
		xhttp.send();
	}
});

