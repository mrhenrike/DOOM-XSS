// Função que injeta DOOM e modifica a URL
function inject() {
	console.log("Stager: Injecting iframe...");

	// Modifica o título da aba
	document.title = "DOOM > DOM";

	// Substitui o conteúdo da página pelo jogo DOOM
	document.body.innerHTML = '<iframe src="https://almroot.github.io/doom/" allowfullscreen style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"></iframe>';

	// Modifica a URL sem recarregar a página
	window.history.pushState({}, "", "/doombyandre.py");
}

// Verifica se o DOM já está pronto ou precisa esperar eventos
if (document.readyState === "complete" || document.readyState === "interactive") {
	console.log("Stager: DOM ready");
	inject();
} else if (window.attachEvent) {
	console.log("Stager: Attaching to onload");
	window.attachEvent('onload', inject);
} else if (window.addEventListener) {
	console.log("Stager: Attaching to load");
	window.addEventListener('load', inject, false);	
} else {
	console.log("Stager: Fallback to iframe count");
	let fc = document.getElementsByTagName('iframe').length;
	setInterval(
		function() {
			if (document.getElementsByTagName('iframe').length != fc) {
				return;
			} else {
				inject();
			}
		},
		300
	);
}
