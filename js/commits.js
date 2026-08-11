/*!
 * SPDX-License-Identifier: BSD-2-Clause
 * Copyright (c) 2026 The Renux Project.  All rights reserved.
 * See LICENSE for full license text.
 *
 * commits.js -- fetch the latest Renux OS commits from the GitHub API
 * and render them into #commit-list in real time.
 *
 * Uses an unauthenticated request to the public GitHub REST API
 * (rate-limited to 60 requests/hour per IP), cached for CACHE_TTL
 * to avoid exhausting the quota.
 */
(function () {
  "use strict";

  var REPO = "renuxproject/src";
  var PER_PAGE = 15;
  var CACHE_KEY = "renux-commits";
  var CACHE_TTL = 5 * 60 * 1000; /* 5 minutes */

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
      }[c];
    });
  }

  function timeAgo(date) {
    var seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    var minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + " minute" + (minutes === 1 ? "" : "s") + " ago";
    var hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + " hour" + (hours === 1 ? "" : "s") + " ago";
    var days = Math.floor(hours / 24);
    if (days < 30) return days + " day" + (days === 1 ? "" : "s") + " ago";
    return date.toISOString().slice(0, 10);
  }

  function render(list, container, status) {
    var frag = document.createDocumentFragment();
    list.forEach(function (commit) {
      var li = document.createElement("li");
      var subject = escapeHtml(commit.commit.message.split("\n")[0]);
      var sha = commit.sha.slice(0, 7);
      var author = commit.commit.author.name;
      var when = timeAgo(new Date(commit.commit.author.date));
      li.innerHTML =
        '<a class="commit-sha" href="' + commit.html_url + '" title="' + sha + '">' + sha + "</a>" +
        '<span class="commit-msg"><a href="' + commit.html_url + '">' + subject + "</a></span>" +
        '<span class="commit-meta">' + escapeHtml(author) + " &middot; " + when + "</span>";
      frag.appendChild(li);
    });
    container.appendChild(frag);
    status.textContent = "Fetched live from the GitHub API.";
  }

  function fail(status) {
    status.className += " error";
    status.textContent =
      "No commits to show yet, or the source repository is not public. " +
      "The Renux OS source tree is being mirrored to github.com/renuxproject/src.";
  }

  function load() {
    var container = document.getElementById("commit-list");
    var status = document.getElementById("commit-status");
    if (!container || !status) return;

    var cached = null;
    try { cached = JSON.parse(localStorage.getItem(CACHE_KEY)); } catch (e) { /* ignore */ }
    if (cached && Array.isArray(cached.list) && Date.now() - cached.t < CACHE_TTL) {
      render(cached.list, container, status);
      return;
    }

    fetch("https://api.github.com/repos/" + REPO + "/commits?per_page=" + PER_PAGE)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (list) {
        if (!Array.isArray(list) || list.length === 0) throw new Error("empty");
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), list: list }));
        } catch (e) { /* storage unavailable */ }
        render(list, container, status);
      })
      .catch(function () { fail(status); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
