function prikaziStranu(id) {
	var maxStrana = 20;
	for ( i = 1; i < maxStrana; i++ ) {
		if(document.getElementById("strana"+i))
			document.getElementById("strana"+i).style.display='none';
		}
		if (document.getElementById("strana"+id)) 
			document.getElementById("strana"+id).style.display='block';	
}

document.getElementById('text').addEventListener('keyup', trazi);
function trazi() {
var offsetVrednost = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 204];
	$("#bla").children('li').remove();
	$("#strane").nextAll('div').remove();
	var pretraga = new XMLHttpRequest();
	var pretrazivac = document.getElementById("text").value;
	var url = "http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=3912be687c89f571e89351c2ffb553d2&hash=3a08d56d5470a38378ad1df45e07b065";
	pretraga.open('GET', url + "&nameStartsWith=" + pretrazivac + "&limit=12" + "&offset=" + offsetVrednost[0], true);
	pretraga.onreadystatechange = function(){
		if(this.readyState == 2 && this.status === 200) {
		document.getElementById("poruka").innerHTML = "Ucitavam...";
		}
	}
	pretraga.onreadystatechange = function(){
		if(this.readyState == 3 && this.status === 200) {
		document.getElementById("poruka").innerHTML = "Uspesno ucitavanje!";
		}
	}
	pretraga.onload = function(){
		if(this.status === 200){
			var rezultati = JSON.parse(this.responseText);
			document.getElementById("footer").innerHTML = rezultati.attributionHTML;
			document.getElementById("info").innerHTML = "Pronadjeni su " + rezultati.data.total + " rezultata. ";
			 var brojstrana = rezultati.data.total / 12;
			 if ( brojstrana > 0 ) {
				for ( g = 0; g < brojstrana; g++ ) {
					pretraga.open('GET', url + "&nameStartsWith=" + pretrazivac + "&limit=12" + "&offset=" + offsetVrednost[g], false);
					pretraga.onload = function(){
					if(this.status === 200){
						var rezultati1 = JSON.parse(this.responseText);
						console.log(rezultati1.data.total);
						var strana = "strana" + [g+1];
						var string = "";
						string += "<div class='nema' id='" + strana + "'>";
						string += "<div class='row'>";
						for(var i = 0; i<rezultati1.data.results.length; i++) {
							var element = rezultati1.data.results[i];
						string += "<div class='col-md-3 col-sm-6 kartica'>";
						string += "<div class='card'>";
						string += "<a href='"+element.urls[1].url+"'target='_blank'>";
						string += "<img src='"+element.thumbnail.path +"/portrait_fantastic."+element.thumbnail.extension+"'/>";
						string += "</a>";
						string += "<h5>" + element.name + "</h5>";
						string += "</div>";
						string += "</div>";
						if (( i+1 ) % 4 == 0) {
						string += "</div>";
						string += "<div class='row'>" 
							}
						}
						string += "<div>";
						document.getElementById('bla').insertAdjacentHTML( 'beforeend', "<li class='page-item'><a class='page-link' href='javascript: onClick=prikaziStranu(\""+ [g+1] +"\");'>"+ [g+1] +"</a></li>");
						document.getElementsByClassName('page-item')[0].classList.add("active");
						document.getElementById('strane').insertAdjacentHTML( 'afterend', string);
						document.getElementById('strana1').style.display = 'block';
						if ( brojstrana < 1  ) {
							document.getElementsByClassName('page-item')[0].style.display = 'none';
										}
									}
								}
							pretraga.send();
							}
						}
					}
					var oznaci = document.getElementsByClassName("page-item");
					for(var i = 0; i < oznaci.length; i++) {
        				oznaci[i].onclick = function(){
        				var ovo = oznaci[0];
        				while(ovo) {
            			if(ovo.tagName === "LI"){
                			ovo.classList.remove("active");
                			}
                		ovo = ovo.nextSibling;
            		}
        		this.classList.add("active");  
    		};
		}
	}
	pretraga.send();
}

function pali() {
   document.getElementsByClassName('jumbotron').fadein
}