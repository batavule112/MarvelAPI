// povezivanje nav bara i selektora strana
function prikaziStranu(id) {
	var maxStrana = 20;
	for ( i = 1; i < maxStrana; i++ ) {
		if($("#strana"+i))
			$("#strana"+i).css('display', 'none');
	}
	if ($("#strana"+id))
		$("#strana"+id).css('display', 'block');
}
// plugin da kasni search
var zakasnjenje = null;  
$('#text').keyup(function(){
  if(zakasnjenje != null) clearTimeout(zakasnjenje);  
  zakasnjenje =setTimeout(trazi,500);  
});
// pretraga (glavno)
function trazi() {
	zakasnjenje = null;
	var offsetVrednost = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 204]; // mrzelo me da includujem underscore range
	$("#bla").children('li').remove();
	$("#strane").nextAll('div').remove();
	var pretraga = new XMLHttpRequest();
	var pretrazivac = document.getElementById("text").value;
	var url = "http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=3912be687c89f571e89351c2ffb553d2&hash=3a08d56d5470a38378ad1df45e07b065";
	function info (){
	return $.get(url+"&nameStartsWith="+pretrazivac+"&limit=12"+"&offset="+offsetVrednost[0]);}
	info().done(function(data){
			document.getElementById("footer").innerHTML = data.attributionHTML;
			document.getElementById("info").innerHTML = "Pronadjeni su " + data.data.total + " rezultata. ";
			 var brojstrana = data.data.total / 12;
			 if ( brojstrana > 0 ) {
				for ( g = 0; g < brojstrana; g++ ) {
					// dodavanje nav i strana
					$('#bla').append("<li class='page-item'><a class='page-link' href='javascript: onClick=prikaziStranu(\""+ [g+1] +"\");'>"+ [g+1] +"</a></li>");
						$('.page-item:first-child').addClass('active');
						if ( brojstrana <= 1  ) {
							$('.page-item:first-child').css('display', 'none');
						}
						try{throw g}
						catch(g) {
						$.ajax({
							url: url + "&nameStartsWith=" + pretrazivac + "&limit=12" + "&offset=" + offsetVrednost[g],
							type: "GET",
							success: function(rezultati1) {
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
							$('.right').append(string);
							$('#strana1').css('display', 'block');
										}
									});
    							}
							}
						}			
$(".page-item").click(function() {
	if ($('.page-item').hasClass("active")) {
		$('.page-item').removeClass("active");
		$(this).addClass("active");
	}
	else $(this).addClass("active");
		});
	});
}
// jumbotron slidein
function pali() {
	$('.jumbotron, .obavestenje').hide();
	$(".jumbotron, .obavestenje").fadeIn(3000);
}

$('#text, .zatvori').click(function(){
	$('.obavestenje').hide();
});
