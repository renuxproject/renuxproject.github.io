/*
 * geo-block.js - Renux geo availability notice.
 *
 * The Renux site is a static GitHub Pages site with no server component, so
 * region availability is checked on the client via a free IP geolocation
 * lookup.  If the visitor is in a region the project does not serve (due to
 * governmental requirements), the normal content is replaced with a notice.
 *
 * Privacy note: this sends the visitor's IP to the geolocation service.  It
 * is the only way to geo-restrict a static site without fronting it with
 * infrastructure (e.g. Cloudflare).  If the lookup fails, the site loads
 * normally (we never break the site on a check failure).
 */
(function () {
	"use strict";

	var BLOCKED = { BR: true }; /* Brazil - governmental requirements */

	var notice = [
		"<div class='geo-block' role='alert'>",
		"  <div class='geo-block-card'>",
		"    <h1>Renux</h1>",
		"    <p class='geo-block-title'>N&atilde;o dispon&iacute;vel na sua regi&atilde;o</p>",
		"    <p>Renux &eacute; um sistema descentralizado, conduzido pela comunidade e sem",
		"    autoridade central. Devido a exig&ecirc;ncias governamentais da sua regi&atilde;o,",
		"    este site n&atilde;o est&aacute; dispon&iacute;vel aqui.</p>",
		"    <p>O c&oacute;digo-fonte permanece aberto. Qualquer pessoa pode obt&ecirc;-lo,",
		"    hosped&aacute;-lo e construir o seu pr&oacute;prio Renux &mdash; em qualquer lugar.",
		"    <code>github.com/renuxproject/src</code></p>",
		"    <p class='geo-block-foot'>Descentralizado por design. Seu dispositivo, suas regras.</p>",
		"  </div>",
		"</div>"
	].join("");

	function show() {
		if (!document.getElementById("geo-block-style")) {
			var s = document.createElement("style");
			s.id = "geo-block-style";
			s.textContent = [
				".geo-block{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;",
				"justify-content:center;background:#0f130a;color:#eef0e0;padding:24px;}",
				".geo-block-card{max-width:520px;background:#171c10;border:1px solid #2b3320;",
				"border-left:5px solid #c78f00;border-radius:14px;padding:32px 36px;",
				"box-shadow:0 18px 44px rgba(0,0,0,.5);}",
				".geo-block h1{font-family:Georgia,serif;font-style:italic;font-size:30px;",
				"color:#fff;letter-spacing:2px;margin:0 0 14px;}",
				".geo-block-title{font-weight:700;font-size:18px;color:#e3d43a;margin:0 0 10px;}",
				".geo-block p{font-size:14.5px;line-height:1.7;margin:8px 0;}",
				".geo-block code{background:#202616;padding:2px 6px;border-radius:6px;",
				"font-size:12.5px;}",
				".geo-block-foot{margin-top:16px;color:#98a386;font-size:12.5px;}"
			].join("");
			document.head.appendChild(s);
		}
		document.documentElement.innerHTML = notice;
	}

	function check() {
		var url = "https://ipwho.is/";
		var ctrl = ("AbortController" in window) ? new AbortController() : null;
		var opts = { method: "GET" };
		if (ctrl) { opts.signal = ctrl.signal; setTimeout(function () { ctrl.abort(); }, 5000); }
		fetch(url, opts)
			.then(function (r) { return r.json(); })
			.then(function (d) {
				var cc = (d.country_code || "").toUpperCase();
				if (BLOCKED[cc]) show();
			})
			.catch(function () { /* lookup failed: load normally */ });
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", check);
	} else {
		check();
	}
})();
