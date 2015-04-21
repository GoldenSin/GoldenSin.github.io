/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
   %% Portfolio-sivun skriptit (JavaScript/jQuery) %%
   %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

$(document).ready(function() {							// Sivun latautuminen, ennen kuin mitään tapahtuu. :3

/************************
 * Globaaleja muuttujia */

var today = new Date();									// Tämän päivän päivämäärä on muuttuja "today".
var latest = new Date(document.lastModified);			// Päivämäärä, jolloin index.html-tiedostoa on viimeksi muokattu, on muuttuja "latest".
var menuNapit = $("body > header nav a");				// Menunapit tallennettu muuttujaan.



/******************************************
 * Viimeksi muokattu (päivämäärä ja aika) */

// Määritellään kellonajan muotoilut:
var latestTimeFi;										// Suomalainen aikamuoto on nyt asia.
var latestTimeEn;										// Englanninkielinen aikamuoto on myös asia.
	var min = latest.getMinutes();						// latestin minuutit tallennettu muuttujaan
	var h = latest.getHours();							// Samoin sen tunnit
	if (min < 10) {										// Jos kello on vähemmän kuin kymmenen yli, niin...
		min = "0" + min;								// ... minuuttien edessä on nolla. Vrt. 9.05 vs. 9.5 (eng. 9:05 vs. 9:5)
	}
	latestTimeFi = h + "." + min;						// latestTimeFi on suomalainen aikamuoto. Eli (h)h.mm
	if (h > 12) {										// Mikäli kello on enemmän kuin kaksitoista päivällä, niin...
		latestTimeEn = (h - 12) + ":" + min + " PM";	// ... otetaan 12 tunnin kello 24 tunnin kellon sijaan (eli vähennetään 24 tunnin ajasta 12, jolloin saadaan oikea aika). Ja PM perään (koska iltapäivä).
	} else {											// Muulloin...
		latestTimeEn = h + ":" + min + " AM";			// ... ei vähennetä mitään kellonajasta, koska aamulla se on sama kuin 24 tunnin kellossa. AM perään (koska aamu).
	}

// Ja aika on valmis. Nyt päiväys:
var latestDateFi = latest.getDate() + "." + (latest.getMonth() + 1) + "." + latest.getFullYear();			// Suomalainen päiväysmuoto (joka on helppo). Nimittäin "(d)d.(m)m.yyyy".
var latestDateEn;																							// Englannin vastaava on olemassa, mutta sen määrääminen onkin hankalampaa.
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]	// Kuukausi-array, jossa i. alkio on i+1:nnen kuukauden nimi kaikilla i = 0, 1, ..., 11.
	latestDateEn = "on " + months[latest.getMonth()] + " " + latest.getDate() + ", " + latest.getFullYear();		// Nyt englanninkielinen päivämäärä on "kuukaudennimi d, yyyy". Esimerkiksi November 5, 1605.

// Jos viimeksi muokattu tänään, ilmaistaan päivän sijaan "tänään".
var latestAsMs = latest.valueOf() - (latest.getMilliseconds() + 1000 * (latest.getSeconds() + 60 * (latest.getMinutes() + 60 * latest.getHours())));	// latestAsMs on viimeisen muokkauksen päivämäärä millisekunteina miinus tarkempi kellonaika
var todayAsMs = today.valueOf() - (today.getMilliseconds() + 1000 * (today.getSeconds() + 60 * (today.getMinutes() + 60 * today.getHours())));			// todayAsMs on sama mutta tälle päivälle
if (todayAsMs - latestAsMs == 0) {																														// Ja jos niiden erotus on nolla eli ne ovat sama luku, niin...
	latestDateFi = "tänään";																															// ... suomeksi sanotaan, että "tänään"...
	latestDateEn = "today";																																// ... ja enkuksi, että "today".
} else if (todayAsMs - latestAsMs == 86400000) {																										// Jos niiden erotus on yksi päivä (86400000 millisekuntia) eli tänään on yksi päivä viime muokkauksen jälkeen, niin...
	latestDateFi = "eilen";																																// ... suomeksi sanotaan, että "eilen"...
	latestDateEn = "yesterday";																															// ... ja enkuksi, että "yesterday".
}

/* Sivun viimeisin päivitysaika esille etusivulle */

$("p[lang='fi'] > .lmdate").append(latestDateFi);
$("p[lang='en'] > .lmdate").append(latestDateEn);
$("p[lang='fi'] > .lmtime").append(latestTimeFi);
$("p[lang='en'] > .lmtime").append(latestTimeEn);



/************************************************************************************************
 * Jos ruudun leveys on riittävän suuri, pääotsikon leveys on sama kuin navigaatiopalkin leveys */

function headB() {																																				// Määritellään funktiona, koska suoritus useammassa paikassa
	if (screen.width >= 960 && window.innerWidth >= 960) {																										// Ruudun leveys taikka ikkunan leveys
		if ($(":root").attr("lang") == "fi") {var x = "fi";} else {var x = "en";}																				// Jos suomi, niin suomi. Muulloin englanti. Problem?
		var n = $("header > nav > a").length;																													// n on navigaatiolinkkien määrä
		var w = 0;																																				// w on h1:n ja navigaatiopalkin lopullinen leveys, joka lähtee nollasta...
		for (var i = 1; i <= n; i++) {
			w += $("header > nav > a:nth-child(" + i + ") > span[lang='" + x + "'], header > nav > a:nth-child(" + i + ") > span[lang='la']").outerWidth(true);	// ... ja johon lisätään jokaisen navigaatiolinkin (sen hetkisen sisällön) (ulko)leveys (i käy 1:stä n:ään)...
		}
		w += n * ($("header > nav > a:first-child").outerWidth(true) - $("header > nav > a:first-child").innerWidth());											// ... sekä marginaalit.
//		if (x == "fi") {																																		// Mikäli nappulat ovat suomeksi, suoraan tapahtuu seuraavaa:
		if (w <= 640) {w = 640;}
		w *= 1.05; $("h1").width(w); // $("h1, header > nav").width(w);																														// h1:n ja navigaatipalkin leveys on w.
//		}
//		else {																																					// Jos taas englanniksi, niin...
//			w *= 1.2;																																			// ... kerrotaan ensin 1,2:lla (jotta nappuloita ei mene hetkellisesti väärälle riville), ja sitten vasta:
//			$("h1, header > nav").width(w);																														// h1:n ja navigaatipalkin leveys on w
//			setTimeout(function(){w /= 1.2; $("h1, header > nav").width(w)}, 200)																				// Sitten vielä perutaan 1,2:lla kertominen.
//		}
	} else {$("h1, header > nav").css("width", "100%");}																										// Jos ruudun tai ikkunan leveys on pienempi kuin 960 px, niin h1:n ja navigaatiopalkin leveys on 100 %.
}



/****************************
 * Sivunvaihdot (funktiona) */

function page(x) {														// Funktio nimeltä page...
	var x;																// ... jonka muuttuja on x
	$.scrollTo(0);														// Rullaa sivun yläreunaan
	$(".box").fadeOut(800, "linear");									// Laatikot häivyttyvät
	$(".box:nth-child(" + x + ")").delay(600).fadeIn(800, "linear");	// x. laatikko tulee näkyväksi
	$("body").removeClass();											// Bodyn classit pois
	$("body").addClass("theme" + x);									// Teemaksi x. teema (bodyn classiksi)
}

/* Ja osoitetaan sivut nappeihin */
menuNapit.each(function(){												// Jokaiselle oma funktio.
	$(this).click(function(event){										// Kun nappia klikkaa...
		event.preventDefault();											// ... niin ensin estetään linkin href...
		page($(this).index() + 1);										// ... ja sitten siirrytään oikealle sivulle.
	});
});

/* Sivunvaihdot leipätekstissä */

$(".box p a[href=#]").each(function(){									// Jokaiselle linkille, jonka href on #...
	$(this).click(function(event){										// ... suoritetaan klikattaessa seuraava funktio.
		for (var i = 1; i <= menuNapit.length; i++) {					// Jokaista menunappia i kohti...
			event.preventDefault();										// ... (ensin estetään href)...
			if ($(this).hasClass(i)) {									// ... jos linkillä on class i, niin... 
				page(i);												// ... siirrytään i:nnelle sivulle.
			}
		}
	});
});



/***************
 * Muuta kamaa */

$("header").ready(function() {
	setTimeout(headB(), 500);						// Headerin elementtien leveytys, kun header ladataan
})

$(window).resize(headB());							// Jos ikkunan kokoa muutetaan, headerin leveys lasketaan uusiksi.


/* Matematiikkaa sisältävien elementtien näkyminen */

$("#math").ready(function(){					// Kun MathJax on latautunut, niin...
	$(".kaava").css("visibility", "visible")	// ... kaikki matematiikka muuttuu näkyväksi (koska oletuksena se ei ole sitä)
});


/* Kieli */

$("#finnish").click(function() {													// Jos klikataan suomilinkkiä
	$(":root").attr("lang", "fi");													// Juurielementin (<html>) kieleksi suomi
	headB();																		// Lisäksi suoritetaan headB()
	$("[lang='en']:not(:root, .cv), [lang='la']").fadeOut(200, "linear");						// Kaikki englanninkieliset elementit piiloon (paitsi juuri itse ja CV-linkit)
	$("[lang='fi']:not(:root, .cv), [lang='la']").delay(180).fadeIn(200, "linear");				// Kaikki suomenkieliset elementit näkyviin (paitsi nuo kaksi poikkeusta)
});
$("#english").click(function() {													// Sama englanniksi
	$(":root").attr("lang", "en");
	headB();
	$("[lang='fi']:not(:root, .cv), [lang='la']").fadeOut(200, "linear");
	$("[lang='en']:not(:root, .cv), [lang='la']").delay(180).fadeIn(200, "linear");
});


/* Figure-elementtien marginaali */

for (var i = 0; i < $("figure").length; i++) {
	if ($("figure").eq(i).css("float") == "left") {
		$("figure").eq(i).css("margin-left", "0");
	}
	else if ($("figure").eq(i).css("float") == "right") {
		$("figure").eq(i).css("margin-right", "0");
	}
	else {
		$("figure").eq(i).css({"margin-left": "0", "margin-right": "0"});
	}
}


/* Mikäli figure on leveämpi kuin sen container */

$("figure").each(function(){												// Jokaiselle figurelle oma funktionsa.
	if($(this).outerWidth(true) >= $(this).parent().width()) {				// Jos figure on leveämpi kuin containerinsa, niin...
		var quot = $(this).parent().width() / $(this).outerWidth();			// ... lasketaan, miten iso osa container on figuresta.
		var diff = $(this).outerWidth() - $(this).parent().width();			// Ja samoin figuren ja containerin leveyksien erotus.
		diff /= 2;
		$(this).css({
			"transform": "scale(" + quot + "," + quot + ")",				// Ja sitten skaaalataan sitä figurea, niin, että sen leveys on se containerin leveys. :3
			"margin": "0 0 0 -" + diff + "px",								// ... ja sitten marginaalit uusiksi.
		});
	}
});


/* Copyrightin vuosi */

$(".year").append(today.getFullYear());			// Elementti, jonka class on "year", sisältää nyt tämänhetkisen vuoden.


/* Portfolion url */

if(window.location.pathname != "/") {											// Mikäli polku, jossa sivu sijaitsee, ei ole juuri, niin...
	$("#this").append(window.location.hostname + window.location.pathname);		// ... elementti, jonka id on "this", saa sisällön, jossa on sivun url ilman protokollaa, ja...
} else {																		// ... mikäli se on, niin...
	$("#this").append(window.location.hostname);								// ... "this" saa sisällön, jossa on pelkkä domain.
}
var url1 = "http://validator.w3.org/check?uri=" + window.location.href;			// Muuttuja "url1" saa arvon, joka on W3C:n validatorin linkki tähän sivuun
$("#validhtml").attr("href", url1);												// Validator-linkkielementin href-attribuutti on yllä mainittu url





/***********************************************************************************************************************************************************************************/

	/* Main-elementin korkeus (tarpeeton tällä hetkellä) [Ei käytössä] */
/*
	var h = [];														// h on tyhjä array
	for (var i = 0; i < 4; i++) {									// i käy nollasta kolmeen
		var j = i+1;												// j on yksi plus i (???)
		h[i] = $(".box:nth-child(" + j + ")").outerHeight();		// h:n i. alkio on j:nnen laatikon ulkoleveys
	}
	var maxHeight = Math.max.apply(Math, h) + 150;					// maxHeight on maksimi h:n alkioista + 150
	$("main").height(maxHeight);									// mainin korkeudeksi maxHeight
*/

	/* Sivunvaihdot (toteutettu tehokkaammin ylhäältä löytyvänä funktiona) [Ei käytössä] */
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