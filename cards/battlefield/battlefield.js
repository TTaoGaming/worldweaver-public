"use strict";

import {classifyTruthStatus} from "./truth-status.js";

(() => {
  const ZONES = ["battlefield", "hand", "deck", "graveyard", "exile"];
  const $ = (id) => document.getElementById(id);
  const state = { world: null, cards: [], byId: new Map(), lastTrigger: null };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function text(value, fallback = "UNKNOWN") {
    if (value === undefined || value === null || value === "") return fallback;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value)) return value.map((item) => text(item, "")).filter(Boolean).join(" · ");
    return Object.entries(value).map(([key, item]) => `${key.replaceAll("_", " ")}: ${text(item)}`).join("\n");
  }

  function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, location.href);
      return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  function truthClass(value) {
    return classifyTruthStatus(value);
  }

  function truthBadge(value) {
    return el("span", `truth ${truthClass(value)}`, text(value));
  }

  function abilityText(ability) {
    if (typeof ability === "string") return ability;
    if (!ability || typeof ability !== "object") return "Ability not recorded.";
    return [ability.name, ability.text].filter(Boolean).join(" — ");
  }

  function miniCard(card, detail = false) {
    const article = el("article", "mini-card");
    article.dataset.zone = card.zone;
    const button = el("button", "card-face");
    button.type = "button";
    button.setAttribute("aria-label", `Inspect ${card.name || card.card_id}`);
    const top = el("div", "face-top");
    top.append(el("span", "face-name", card.name || card.card_id), el("span", "face-cost", text(card.cost, "COST UNKNOWN")));
    const art = el("div", "face-art");
    art.setAttribute("aria-hidden", "true");
    const abilities = el("div", "face-abilities");
    const maxAbilities = detail ? 4 : 3;
    const rows = Array.isArray(card.abilities) ? card.abilities.slice(0, maxAbilities) : [];
    if (rows.length) rows.forEach((ability) => abilities.append(el("span", "face-ability", abilityText(ability))));
    else abilities.append(el("span", "face-ability", "No ability text is recorded in this projection."));
    const bottom = el("div", "face-bottom");
    const stats = el("span", "face-stats");
    (Array.isArray(card.stats) ? card.stats.slice(0, detail ? 6 : 2) : []).forEach((stat) => stats.append(el("span", "stat", `${text(stat.label, "stat")}: ${text(stat.value)}`)));
    bottom.append(el("span", "face-zone", `${text(card.zone)} · ${text(card.play_readiness)}`), stats);
    button.append(top, art, el("div", "face-type", text(card.type_line, "Type not recorded")), abilities, el("p", "face-flavor", text(card.flavor, "No flavor text recorded.")), bottom);
    button.addEventListener("click", () => openCard(card.card_id, button));
    article.append(button);
    return article;
  }

  function definitionList(value) {
    const list = el("dl");
    const entries = value && typeof value === "object" && !Array.isArray(value) ? Object.entries(value) : [];
    if (!entries.length) {
      list.append(el("dt", "", "Status"), el("dd", "", "Not recorded in this projection."));
      return list;
    }
    entries.forEach(([key, item]) => list.append(el("dt", "", key.replaceAll("_", " ")), el("dd", "", text(item))));
    return list;
  }

  function evidenceList(evidence) {
    const list = el("ul", "evidence-list");
    const rows = Array.isArray(evidence) ? evidence : [];
    if (!rows.length) list.append(el("li", "", "No evidence reference is included. The claim ceiling remains UNKNOWN."));
    rows.forEach((item) => {
      const row = el("li");
      const label = typeof item === "string" ? item : text(item.label || item.title || item.kind || item.url, "Evidence reference");
      const href = safeUrl(typeof item === "string" ? item : item.url);
      if (href) {
        const link = el("a", "", label);
        link.href = href; link.target = "_blank"; link.rel = "noopener noreferrer";
        row.append(link);
        if (item && typeof item === "object" && item.note) row.append(` — ${text(item.note)}`);
      } else row.textContent = typeof item === "string" ? item : text(item);
      list.append(row);
    });
    return list;
  }

  function openCard(id, trigger, observation = null) {
    const card = state.byId.get(id);
    if (!card) return;
    state.lastTrigger = trigger || null;
    const detail = el("div", "detail");
    const face = miniCard(card, true);
    const content = el("div", "detail-content");
    content.append(el("span", "detail-kicker", `${text(card.zone).toUpperCase()} / ${card.card_id}`));
    const heading = el("h2", "", card.name || card.card_id); heading.id = "detail-name";
    content.append(heading, truthBadge(card.play_readiness), el("p", "detail-ceiling", `Claim ceiling: ${text(card.claim_ceiling)}`));
    if (observation) {
      const instance = el("section", "detail-section");
      instance.append(el("h3", "", "Observed instance"), definitionList({
        title: observation.title,
        status: observation.status,
        scope: observation.scope,
        observed_utc: observation.observed_utc,
        note: observation.note
      }), evidenceList(observation.evidence));
      content.append(instance);
    }
    const engineering = el("section", "detail-section");
    engineering.append(el("h3", "", "Engineering view"), definitionList(card.engineering));
    const placement = el("section", "detail-section");
    placement.append(el("h3", "", "Placement and limits"), definitionList({ zone: card.zone, zone_scope: card.zone_scope, play_readiness: card.play_readiness, cost: card.cost }));
    const evidence = el("section", "detail-section");
    evidence.append(el("h3", "", "Evidence"), evidenceList(card.evidence));
    content.append(engineering, placement, evidence);
    detail.append(face, content);
    $("card-detail").replaceChildren(detail);
    $("card-dialog").showModal();
    $("close-dialog").focus();
  }

  function normalizeCard(card) {
    return {
      ...card,
      card_id: String(card.card_id || ""),
      name: String(card.name || card.title || card.card_id || "Unnamed card"),
      zone: String(card.zone || "").toLowerCase(),
      hand: card.hand === true
    };
  }

  function validate(world) {
    if (!world || typeof world !== "object" || !Array.isArray(world.cards)) throw new Error("The projection has no cards array.");
    const ids = new Set();
    const cards = world.cards.map(normalizeCard);
    for (const card of cards) {
      if (!card.card_id || ids.has(card.card_id)) throw new Error("A card identity is missing or duplicated.");
      if (!ZONES.includes(card.zone)) throw new Error(`Card ${card.card_id} has an unsupported zone.`);
      if (!Array.isArray(card.stats) || !Array.isArray(card.abilities) || !Array.isArray(card.evidence)) throw new Error(`Card ${card.card_id} has an invalid compact-face contract.`);
      ids.add(card.card_id);
    }
    const hand = cards.filter((card) => card.hand);
    if (hand.length !== 8) throw new Error(`The curated hand must contain exactly eight cards; received ${hand.length}.`);
    return cards;
  }

  function zoneMeta(zone) {
    const rows = Array.isArray(state.world.zones) ? state.world.zones : [];
    return rows.find((item) => String(item.id || item.zone || item.name || "").toLowerCase() === zone) || {};
  }

  function renderHand() {
    const cards = state.cards.filter((card) => card.hand).slice(0, 8);
    $("hand-count").textContent = `${cards.length} / 8`;
    const fragment = document.createDocumentFragment();
    cards.forEach((card) => fragment.append(miniCard(card)));
    $("hero-hand").replaceChildren(fragment);
    $("hero-hand").setAttribute("aria-busy", "false");
  }

  function renderZones() {
    const fragment = document.createDocumentFragment();
    ZONES.forEach((zone) => {
      const meta = zoneMeta(zone);
      const observations = Array.isArray(meta.observations) ? meta.observations : [];
      const cards = zone === "hand" ? state.cards.filter((card) => card.hand) : zone === "deck" ? state.cards.filter((card) => !card.hand) : [];
      const lane = el("article", "zone-lane"); lane.dataset.zone = zone;
      const head = el("div", "zone-lane-head");
      const copy = el("div");
      copy.append(el("h3", "", text(meta.label || meta.name, zone[0].toUpperCase() + zone.slice(1))), el("p", "", text(meta.meaning || meta.summary, "No zone meaning recorded.")), el("span", "zone-truth", `SCOPE: ${observations.length ? "OBSERVED INSTANCES" : zone === "hand" || zone === "deck" ? "REUSABLE DEFINITIONS" : "NO VERIFIED PLACEMENT"}`));
      const total = observations.length || cards.length;
      head.append(copy, el("span", "zone-total", zone === "deck" ? `${total} featured / 138 catalog` : String(total).padStart(2, "0")));
      const list = el("div", "zone-cards");
      if (!observations.length && !cards.length) list.append(el("div", "zone-empty", text(meta.empty_note, "No instances are placed here in this projection. Empty does not mean retired or removed.")));
      observations.forEach((observation) => {
        const card = state.byId.get(observation.card_id);
        const button = el("button", "zone-chip", `${text(observation.title)} · ${text(observation.status)}`);
        button.type = "button";
        button.addEventListener("click", () => openCard(observation.card_id, button, observation));
        if (!card) button.disabled = true;
        list.append(button);
      });
      cards.forEach((card) => {
        const button = el("button", "zone-chip", `${card.name} · ${text(card.play_readiness)}`);
        button.type = "button"; button.addEventListener("click", () => openCard(card.card_id, button)); list.append(button);
      });
      lane.append(head, list); fragment.append(lane);
    });
    $("zone-board").replaceChildren(fragment); $("zone-board").setAttribute("aria-busy", "false");
  }

  function rowsFrom(value) {
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") return Object.entries(value).map(([name, item]) => typeof item === "object" ? { name, ...item } : { name, value: item });
    if (value !== undefined && value !== null && value !== "") return [value];
    return [];
  }

  function renderDataPanel(id, value, emptyText) {
    const rows = rowsFrom(value); const list = el("div", "data-list");
    if (!rows.length) list.append(el("p", "pending", emptyText));
    rows.forEach((row) => {
      const item = el("div", "data-item");
      if (typeof row === "string" || typeof row === "number") item.append(el("p", "", text(row)));
      else {
        const heading = row.name || row.label || row.title || row.id || row.phase || "Observation";
        item.append(el("b", "", text(heading)));
        const body = { ...row }; delete body.name; delete body.label; delete body.title; delete body.id;
        if (Object.keys(body).length) item.append(el("p", "", text(body)));
      }
      list.append(item);
    });
    $(id).replaceChildren(list);
  }

  function renderBattleRhythm(value) {
    const panel = el("div", "data-list");
    if (!value || typeof value !== "object") panel.append(el("p", "pending", "No battle rhythm imported."));
    else {
      if (value.title) panel.append(el("div", "data-item", value.title));
      if (value.interpretation) panel.append(el("div", "data-item", value.interpretation));
      for (const beat of Array.isArray(value.beats) ? value.beats : []) {
        const item = el("div", "data-item");
        item.append(el("b", "", text(beat.name, "Beat")), el("p", "", text(beat.engineering, "Engineering step not recorded.")));
        panel.append(item);
      }
      if (value.claim_ceiling) {
        const limit = el("div", "data-item");
        limit.append(el("b", "", "Claim ceiling"), el("p", "", text(value.claim_ceiling)));
        panel.append(limit);
      }
    }
    $("battle-rhythm").replaceChildren(panel);
  }

  function renderChampions(value) {
    const rows = Array.isArray(value) ? value : [];
    const panel = el("div", "data-list");
    if (!rows.length) panel.append(el("p", "pending", "No champion observations imported."));
    rows.forEach((champion) => {
      const item = el("div", "data-item");
      item.append(el("b", "", text(champion.name, "Champion observation")), truthBadge(champion.status));
      const stats = Array.isArray(champion.stats) ? champion.stats.map(stat => `${text(stat.label)}: ${text(stat.value)}`).join(" · ") : "";
      if (stats) item.append(el("p", "", stats));
      if (champion.claim_ceiling) item.append(el("p", "", `Claim ceiling: ${text(champion.claim_ceiling)}`));
      const href = safeUrl(champion.artifact_url);
      if (href) {
        const link = el("a", "", "Inspect public artifact ↗");
        link.href = href; link.target = "_blank"; link.rel = "noopener noreferrer";
        item.append(link);
      }
      panel.append(item);
    });
    $("champions").replaceChildren(panel);
  }

  function renderWorld() {
    const overview = state.world.overview || {};
    $("world-summary").textContent = text(overview.summary || state.world.summary, "No world summary is recorded.");
    const truth = text(overview.truth_label || state.world.truth_label || (overview.active_worker_count === null ? "ACTIVE WORKER COUNT UNKNOWN" : overview.active_worker_count_status), "ACTIVE COUNT UNKNOWN");
    $("world-truth").textContent = truth; $("world-truth").className = `truth ${truthClass(truth)}`;
    $("world-as-of").textContent = text(overview.observed_utc || overview.observed_at || overview.as_of || state.world.observed_utc || state.world.updated_utc || state.world.generated_at, "Observation time UNKNOWN");
    $("source-line").textContent = text(state.world.source_revision || state.world.revision || state.world.generated_at, "Source revision UNKNOWN");
    $("footer-ceiling").textContent = `Public projection · ${text(overview.claim_ceiling || state.world.claim_ceiling || state.world.evidence_ceiling || overview.proof_gap)}`;
    $("footer-permaweb").textContent = `Permaweb · ${text(state.world.permaweb?.status)} · ${text(state.world.permaweb?.snapshot_sha256, "snapshot hash UNKNOWN")}`;
    renderHand(); renderZones();
    renderBattleRhythm(state.world.battle_rhythm);
    renderChampions(state.world.champions);
    renderDataPanel("inheritance", state.world.inheritance, "No inheritance record imported.");
  }

  async function loadWorld() {
    $("load-error").hidden = true;
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("../battlefield-world-state.json", { credentials: "same-origin", signal: controller.signal });
      if (!response.ok) throw new Error(`World-state request returned HTTP ${response.status}.`);
      const world = await response.json(); const cards = validate(world);
      state.world = world; state.cards = cards; state.byId = new Map(cards.map((card) => [card.card_id, card]));
      renderWorld();
    } catch (error) {
      $("load-error").hidden = false;
      $("load-error-message").textContent = `${error.name === "AbortError" ? "The request timed out." : error.message} No card placement or runtime status has been assumed.`;
    } finally { clearTimeout(timeout); }
  }

  $("retry-load").addEventListener("click", loadWorld);
  $("close-dialog").addEventListener("click", () => $("card-dialog").close());
  $("card-dialog").addEventListener("click", (event) => {
    if (event.target !== $("card-dialog")) return;
    const box = $("card-dialog").getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) $("card-dialog").close();
  });
  $("card-dialog").addEventListener("close", () => { if (state.lastTrigger?.isConnected) state.lastTrigger.focus(); state.lastTrigger = null; });
  loadWorld();
})();
