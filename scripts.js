/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   %% Portfolio-sivun skriptit (JavaScript/jQuery) %%
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* Jos ruudun leveys on riitt�v�n suuri, p��otsikon leveys on sama kuin navigaatiopalkin leveys */

function headB() {																																				// M��ritell��n funktiona, koska suoritus useammassa paikassa
	if (screen.width >= 960 && window.innerWidth >= 960) {																										// Ruudun leveys taikka ikkunan leveys
		if ($(":root").attr("lang") == "fi") {var x = "fi";} else {var x = "en";}																				// Jos suomi, niin suomi. Muulloin englanti. Problem?
		var n = $("header > nav > a").length;																													// n on navigaatiolinkkien m��r�
		var w = 0;																																				// w on h1:n ja navigaatiopalkin lopullinen leveys, joka l�htee nollasta...
		for (i = 1; i <= n; i++) {
			w += $("header > nav > a:nth-child(" + i + ") > span[lang='" + x + "'], header > nav > a:nth-child(" + i + ") > span[lang='la']").outerWidth(true);	// ... ja johon lis�t��n jokaisen navigaatiolinkin (sen hetkisen sis�ll�n) (ulko)leveys (i k�y 1:st� n:��n)...
		}
		w += n * ($("header > nav > a:first-child").outerWidth(true) - $("header > nav > a:first-child").innerWidth());											// ... sek� marginaalit.
//		if (x == "fi") {																																		// Mik�li nappulat ovat suomeksi, suoraan tapahtuu seuraavaa:
			w *= 1.05; $("h1").width(w); // $("h1, header > nav").width(w);																														// h1:n ja navigaatipalkin leveys on w.
//		}
//		else {																																					// Jos taas englanniksi, niin...
//			w *= 1.2;																																			// ... kerrotaan ensin 1,2:lla (jotta nappuloita ei mene hetkellisesti v��r�lle riville), ja sitten vasta:
//			$("h1, header > nav").width(w);																														// h1:n ja navigaatipalkin leveys on w
//			setTimeout(function(){w /= 1.2; $("h1, header > nav").width(w)}, 200)																				// Sitten viel� perutaan 1,2:lla kertominen.
//		}
	} else {$("h1, header > nav").css("width", "100%");}																										// Jos ruudun tai ikkunan leveys on pienempi kuin 960 px, niin h1:n ja navigaatiopalkin leveys on 100 %.
}


/* Sivunvaihdot (funktiona) */

function page(x) {														// Funktio nimelt� page...
	var x;																// ... jonka muuttuja on x
	$(".box").fadeOut(800, "linear");									// Laatikot h�ivyttyv�t
	$(".box:nth-child(" + x + ")").delay(600).fadeIn(800, "linear");	// x. laatikko tulee n�kyv�ksi
	$("body").removeClass();											// Bodyn classit pois
	$("body").addClass("theme" + x);									// Teemaksi x. teema (bodyn classiksi)
}


/* Matematiikkaa sis�lt�vien elementtien n�kyminen */

$("#math").ready(function(){					// Kun MathJax on latautunut, niin...
	$(".kaava").css("visibility", "visible")	// ... kaikki matematiikka muuttuu n�kyv�ksi (koska oletuksena se ei ole sit�)
});

$(document).ready(function(){		// Kun sivu on latautunut, suoritetaan seuraavat asiat

	setTimeout(headB(), 200);						// Headerin elementtien leveytys

	/* Kieli */
	
	$("#finnish").click(function() {													// Jos klikataan suomilinkki�
		$(":root").attr("lang", "fi");													// Juurielementin (<html>) kieleksi suomi
		headB();																		// Lis�ksi suoritetaan headB()
		$("[lang='en']:not(:root, .cv), [lang='la']").fadeOut(200, "linear");						// Kaikki englanninkieliset elementit piiloon (paitsi juuri itse ja CV-linkit)
		$("[lang='fi']:not(:root, .cv), [lang='la']").delay(180).fadeIn(200, "linear");				// Kaikki suomenkieliset elementit n�kyviin (paitsi nuo kaksi poikkeusta)
	});
	$("#english").click(function() {													// Sama englanniksi
		$(":root").attr("lang", "en");
		headB();
		$("[lang='fi']:not(:root, .cv), [lang='la']").fadeOut(200, "linear");
		$("[lang='en']:not(:root, .cv), [lang='la']").delay(180).fadeIn(200, "linear");
	});


	/* Portfolion url */

	$("#this").append(window.location.hostname + window.location.pathname);	// Elementti, jonka id on "this", saa sis�ll�n, jossa on sivun url ilman protokollaa
	var url1 = "http://validator.w3.org/check?uri=" + window.location.href;	// Muuttuja "url1" saa arvon, joka on W3C:n validatorin linkki t�h�n sivuun
	$("#validhtml").attr("href", url1);										// Validator-linkkielementin href-attribuutti on yll� mainittu url
	
	



	/* Main-elementin korkeus (tarpeeton t�ll� hetkell�) */
/*
	var h = [];														// h on tyhj� matriisi
	for (var i = 0; i < 4; i++) {									// i k�y nollasta kolmeen
		var j = i+1;												// j on yksi plus i (???)
		h[i] = $(".box:nth-child(" + j + ")").outerHeight();		// h:n i. alkio on j:nnen laatikon ulkoleveys
	}
	var maxHeight = Math.max.apply(Math, h) + 150;					// maxHeight on maksimi h:n alkioista + 150
	$("main").height(maxHeight);									// mainin korkeudeksi maxHeight
*/

	/* Sivunvaihdot (toteutettu tehokkaammin alhaalta l�ytyv�n� funktiona) */
/*
	$("#vaihto1").click(function() {
		$(".box").fadeOut(800, "linear");
		$(".box:first-child").delay(600).fadeIn(800, "linear");
		$("body").removeClass();
		$("body").addClass("theme1");
	});
	$("#vaihto2").click(function() {
		$(".box").fadeOut(800, "linear");
		$(".box:nth-child(2)").delay(600).fadeIn(800, "linear");
		$("body").removeClass();
		$("body").addClass("theme2");
	});
	$("#vaihto3").click(function() {
		$(".box").fadeOut(800, "linear");
		$(".box:nth-child(3)").delay(600).fadeIn(800, "linear");
		$("body").removeClass();
		$("body").addClass("theme3");
	});
	$("#vaihto4").click(function() {
		$(".box").fadeOut(800, "linear");
		$(".box:nth-child(4)").delay(600).fadeIn(800, "linear");
		$("body").removeClass();
		$("body").addClass("theme4");
	});
*/

});		// Sivun lataus loppu