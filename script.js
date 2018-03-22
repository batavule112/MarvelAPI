var offset = 0;
var limit = 12;
var url = "https://gateway.marvel.com/v1/public/characters?&ts=1&apikey=3912be687c89f571e89351c2ffb553d2&hash=3a08d56d5470a38378ad1df45e07b065&limit="+ limit +"&nameStartsWith=";
// plugin da kasni search
var zakasnjenje = null;
$('#text').keyup(function(){
  if(zakasnjenje != null) clearTimeout(zakasnjenje);  
  zakasnjenje = setTimeout(function(){
  	traziPagi();
  	trazi();
  }, 1000);  
});
function traziPagi() {
	zakasnjenje = null;
	$("#bla").children('li').remove();
	var pretrazivac = document.getElementById("text").value;
	$.ajax({
		url: url + pretrazivac,
		type: "GET",
		success: function(pagi) {
			// pagination stranice
		var brojstrana = pagi.data.total / limit;
		for ( g = 0; g < brojstrana; g++ ) {
			$('#bla').append("<li class='page-item'><a class='page-link'>"+ [g+1] +"</a></li>");
		}
		$('.page-item:first-child').addClass('active');
		$(".page-item").click(function() {
		if ($('.page-item').hasClass("active")) {
			$('.page-item').removeClass("active");
			$(this).addClass("active");
		}
		else $(this).addClass("active");
			});
		}
	})
}
$('body').on('click', '#bla li a', function(){
	var pagiBroj = $(this).text();
    offset = (pagiBroj - 1) * limit;
    trazi();
});
function trazi() {
	zakasnjenje = null;
	$("#rezultati").children('div').remove();
	var pretrazivac = document.getElementById("text").value;
	$.ajax({
		url: url + pretrazivac + "&offset=" + offset,
		type: "GET",
		success: function(rezultati) {
		// info u jumb
		$('#footer').html(rezultati.attributionHTML);
		$('#info').html("Pronadjeni su " + rezultati.data.total + " rezultata. ");
		// sadrzaj u rezultatima
		var string = "";
		string += "<div class='row'>";
		for(var i = 0; i<rezultati.data.results.length; i++) {
		var element = rezultati.data.results[i];
		string += "<div class='col-md-3 col-sm-6 kartica'>";
		string += "<div class='card'>";
		string += "<a href='"+element.urls[0].url+"'target='_blank'>";
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
		$('#rezultati').append(string);
		$('#strana1').css('display', 'block');
		}
	});
}


