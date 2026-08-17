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
		"    <div class='geo-block-brand'>Renux</div>",
		"    <p class='geo-block-title'>N&atilde;o dispon&iacute;vel na sua regi&atilde;o</p>",
		"    <p class='geo-block-body'>Renux &eacute; um sistema descentralizado, conduzido pela",
		"    comunidade e sem autoridade central. Devido a exig&ecirc;ncias governamentais da sua",
		"    regi&atilde;o, este site n&atilde;o est&aacute; dispon&iacute;vel aqui.</p>",
		"    <p class='geo-block-body'>O c&oacute;digo-fonte permanece aberto &mdash; qualquer",
		"    pessoa pode obt&ecirc;-lo, hosped&aacute;-lo e construir o seu pr&oacute;prio Renux, em",
		"    qualquer lugar.</p>",
		"    <p class='geo-block-src'><code>github.com/renuxproject/src</code></p>",
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
				"justify-content:center;padding:24px;",
				"background:linear-gradient(135deg,#1f3f0a 0%,#3f6e10 38%,#7da31d 72%,#d9c92f 100%);}",
				".geo-block-card{max-width:540px;background:#fff;border:1px solid #e2e9d7;",
				"border-radius:22px;padding:40px 44px;box-shadow:0 18px 44px rgba(15,30,8,.35);}",
				".geo-block-brand{font-family:Georgia,'Times New Roman',serif;font-style:italic;",
				"font-size:30px;font-weight:700;letter-spacing:2px;color:#1d3306;margin-bottom:14px;}",
				".geo-block-title{font-weight:800;font-size:20px;color:#1f2a17;margin:0 0 12px;",
				"padding-bottom:10px;border-bottom:2px solid #e2e9d7;",
				"border-image:linear-gradient(90deg,#3f7d16,#e3d43a) 1;}",
				".geo-block-body{font-size:15px;line-height:1.7;color:#1f2a17;margin:10px 0;}",
				".geo-block-src{margin:18px 0 0;}",
				".geo-block-src code{font-family:'SF Mono',Menlo,Consolas,monospace;font-size:13px;",
				"background:#eef1e4;color:#3f7d16;padding:3px 8px;border-radius:6px;}",
				".geo-block-foot{margin-top:20px;color:#66725c;font-size:12.5px;}"
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
