"use strict";

(() => {
  const HAND_LIMIT = 8;
  const STORAGE_KEY = "worldweaver:cards:hand:v1";
  const $ = (id) => document.getElementById(id);
  const state = { catalog: null, cards: [], byId: new Map(), hand: [], selected: null, loading: false };
  let announcementTimer;
  let lastTrigger = null;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function valueText(value, fallback = "Not recorded in this catalog.") {
    if (value === undefined || value === null || value === "") return fallback;
    if (typeof value === "string" || typeof value === "number") return String(value);
    if (Array.isArray(value)) return value.map((part) => valueText(part, "")).filter(Boolean).join("\n");
    return JSON.stringify(value, null, 2);
  }

  function humanStatus(status, fallback) {
    return valueText(status, fallback).replaceAll("_", " ").toLowerCase();
  }

  function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    if (!/^(https?:\/\/|\.{0,2}\/|#)/i.test(value.trim())) return null;
    try {
      const url = new URL(value, location.href);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
    } catch { return null; }
  }

  function sourceLink(label, url) {
    const href = safeUrl(url);
    if (!href) return el("span", "", label || "Source URL unavailable");
    const link = el("a", "", label || href);
    link.href = href;
    if (new URL(href).origin !== location.origin) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    return link;
  }

  function announce(message) {
    const node = $("announcement");
    node.textContent = message;
    node.hidden = false;
    clearTimeout(announcementTimer);
    announcementTimer = setTimeout(() => { node.hidden = true; }, 5500);
  }

  function defaultHand() {
    const source = Array.isArray(state.catalog.default_hand) ? state.catalog.default_hand : [];
    return [...new Set(source)].filter((id) => state.byId.has(id)).slice(0, HAND_LIMIT);
  }

  function restoreHand() {
    state.hand = defaultHand();
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) state.hand = [...new Set(parsed)].filter((id) => typeof id === "string" && state.byId.has(id)).slice(0, HAND_LIMIT);
      }
    } catch { announce("Browser storage is unavailable. Your hand will last for this visit."); }
  }

  function saveHand() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.hand)); }
    catch { announce("Your hand changed for this visit, but could not be saved in this browser."); }
  }

  function toggleHand(id) {
    if (!state.byId.has(id)) return;
    const index = state.hand.indexOf(id);
    let message;
    if (index >= 0) {
      state.hand.splice(index, 1);
      message = `${state.byId.get(id).name} removed from your hand.`;
    } else {
      if (state.hand.length >= HAND_LIMIT) {
        announce("Your hand holds eight cards. Remove one before adding another.");
        const detailFeedback = $("detail-feedback");
        if (detailFeedback) detailFeedback.textContent = "Your hand holds eight cards. Remove one before adding another.";
        return;
      }
      state.hand.push(id);
      message = `${state.byId.get(id).name} added to your hand.`;
    }
    announce(message);
    const feedback = $("detail-feedback");
    if (feedback) feedback.textContent = message;
    saveHand();
    renderHand();
    updateHandControls();
  }

  function visual(id, large = false) {
    const frame = el("div", "card-visual");
    frame.setAttribute("aria-hidden", "true");
    const sigil = el("div", "sigil");
    for (let index = 0; index < 3; index += 1) sigil.append(el("span"));
    frame.append(sigil, el("span", "visual-index", large ? "SOURCE-BOUND HANDLE" : "HFO / ATLAS"), el("span", "art-pending", "Art pending"));
    return frame;
  }

  function statusTags(card) {
    const row = el("div", "card-statuses");
    const full = card.definition_depth === "full";
    row.append(
      el("span", `status-tag ${full ? "full" : "index"}`, full ? "Full definition" : "Index entry"),
      el("span", "status-tag", `Behavior: ${humanStatus(card.behavior?.status, "NOT_TESTED")}`),
      el("span", "status-tag", `Runtime: ${humanStatus(card.runtime?.status, "UNVERIFIED")}`)
    );
    return row;
  }

  function setHandControl(button, id) {
    const included = state.hand.includes(id);
    button.textContent = included ? "− Remove from hand" : "+ Add to hand";
    button.setAttribute("aria-pressed", String(included));
    button.setAttribute("aria-label", `${included ? "Remove" : "Add"} ${state.byId.get(id)?.name || id} ${included ? "from" : "to"} your hand`);
    button.classList.toggle("in-hand-label", included);
  }

  function handButton(card, className = "text-button") {
    const button = el("button", className);
    button.type = "button";
    button.dataset.handId = card.id;
    setHandControl(button, card.id);
    button.addEventListener("click", () => toggleHand(card.id));
    return button;
  }

  function updateHandControls() {
    document.querySelectorAll("[data-hand-id]").forEach((button) => setHandControl(button, button.dataset.handId));
    document.querySelectorAll(".atlas-card").forEach((card) => card.classList.toggle("in-hand", state.hand.includes(card.dataset.cardId)));
  }

  function renderHand() {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < HAND_LIMIT; index += 1) {
      const card = state.byId.get(state.hand[index]);
      const slot = el("li", card ? "hand-slot" : "hand-empty");
      if (card) {
        const open = el("button", "hand-card-button");
        open.type = "button";
        open.setAttribute("aria-label", `Inspect ${card.name}`);
        open.append(el("span", "hand-number", String(index + 1).padStart(2, "0")), el("span", "hand-card-name", card.name), el("span", "hand-card-id", card.id));
        open.addEventListener("click", () => openCard(card.id, open));
        const remove = el("button", "remove-hand", "×");
        remove.type = "button";
        remove.setAttribute("aria-label", `Remove ${card.name} from your hand`);
        remove.addEventListener("click", () => {
          toggleHand(card.id);
          const remaining = $("hand-cards").querySelectorAll(".remove-hand");
          (remaining[Math.min(index, remaining.length - 1)] || $("reset-hand")).focus();
        });
        slot.append(open, remove);
      } else {
        const browse = el("a", "", "CHOOSE A CARD ↗");
        browse.href = "#library";
        slot.append(el("span", "", String(index + 1).padStart(2, "0")), browse);
      }
      fragment.append(slot);
    }
    $("hand-cards").replaceChildren(fragment);
    $("hand-count").textContent = `${state.hand.length} / ${HAND_LIMIT}`;
    $("nav-hand-count").textContent = `${state.hand.length}/${HAND_LIMIT}`;
    $("clear-hand").disabled = !state.hand.length;
  }

  function atlasCard(card) {
    const article = el("article", `atlas-card${state.hand.includes(card.id) ? " in-hand" : ""}`);
    article.dataset.cardId = card.id;
    const open = el("a", "card-open");
    open.href = `#card=${encodeURIComponent(card.id)}`;
    open.setAttribute("aria-label", `Inspect ${card.name}`);
    const top = el("div", "card-topline");
    top.append(el("span", "card-id", card.id), el("span", "card-kind", card.kind || "Card"));
    const body = el("div", "card-body");
    body.append(el("span", "card-deck", card.deck || "Unclassified"), el("h3", "", card.name), el("p", "card-summary", card.summary || "Index entry. Open the source to recover the full definition."));
    open.append(top, visual(card.id), body);
    open.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openCard(card.id, open);
    });
    const actions = el("div", "card-actions");
    actions.append(handButton(card), el("span", "inspect-label", "INSPECT ↗"));
    article.append(open, statusTags(card), actions);
    return article;
  }

  function filterCards() {
    if (!state.catalog) return;
    const query = $("search").value.trim().toLowerCase();
    const deck = $("deck-filter").value;
    const kind = $("type-filter").value;
    const depth = $("depth-filter").value;
    const terms = query.split(/\s+/).filter(Boolean);
    const matches = state.cards.filter((card) => {
      const haystack = [card.id, card.name, card.deck, card.kind, card.type_line, card.summary, valueText(card.engineering, "")].join(" ").toLowerCase();
      return (!deck || card.deck === deck) && (!kind || card.kind === kind) && (!depth || card.definition_depth === depth) && terms.every((term) => haystack.includes(term));
    });
    const fragment = document.createDocumentFragment();
    matches.forEach((card) => fragment.append(atlasCard(card)));
    $("card-grid").replaceChildren(fragment);
    $("results-count").textContent = `${matches.length} of ${state.cards.length} cards`;
    $("empty-results").hidden = matches.length > 0;
    $("clear-filters").hidden = !(query || deck || kind || depth);
  }

  function detailsSection(title, open = false) {
    const section = el("details", "detail-section");
    section.open = open;
    section.append(el("summary", "", title));
    return section;
  }

  function definitionList(rows) {
    const list = el("dl");
    rows.forEach(([label, value]) => list.append(el("dt", "", label), el("dd", "", valueText(value))));
    return list;
  }

  function behaviorContractSection(contract) {
    if (!contract || typeof contract !== "object" || Array.isArray(contract)) return null;
    const section = detailsSection("Use this card");
    section.classList.add("behavior-contract");
    const summaryLabel = el("span", "contract-summary-label", "Use this card");
    summaryLabel.append(el("span", "contract-status", "Proposed behavior • not yet evaluated"));
    section.querySelector("summary").replaceChildren(summaryLabel);

    const present = (value) => valueText(value, "").trim().length > 0;
    const textBlock = (title, value) => {
      if (!present(value)) return null;
      const block = el("div", "contract-block");
      block.append(el("h3", "", title), el("p", "", valueText(value)));
      return block;
    };
    const listBlock = (title, items, ordered = false) => {
      if (!Array.isArray(items)) return null;
      const entries = items.filter(present);
      if (!entries.length) return null;
      const block = el("div", "contract-block");
      const list = el(ordered ? "ol" : "ul", ordered ? "contract-procedure" : "");
      entries.forEach((item) => list.append(el("li", "", valueText(item))));
      block.append(el("h3", "", title), list);
      return block;
    };
    const appendBlocks = (parent, ...blocks) => blocks.filter(Boolean).forEach((block) => parent.append(block));

    appendBlocks(section, textBlock("Intent", contract.intent), textBlock("When to use", contract.when_to_use));
    appendBlocks(section, listBlock("Bring these inputs", contract.inputs), listBlock("Proposed procedure", contract.procedure, true), listBlock("Expected outputs", contract.outputs));

    const exampleRows = [
      ["Situation", contract.example?.situation],
      ["Proposed action", contract.example?.action],
      ["Evidence to seek", contract.example?.evidence]
    ].filter(([, value]) => present(value));
    if (exampleRows.length) {
      const example = el("div", "contract-block contract-example");
      example.append(el("h3", "", "Worked example"), definitionList(exampleRows));
      section.append(example);
    }

    const roles = el("div", "contract-role-grid");
    appendBlocks(roles, textBlock("Neural reasoning", contract.neurosymbolic?.neural), textBlock("Symbolic enforcement", contract.neurosymbolic?.symbolic));
    if (roles.childElementCount) section.append(roles);
    appendBlocks(section, listBlock("Failure modes to watch", contract.failure_modes));

    const evolution = el("div", "contract-evolution");
    appendBlocks(evolution, listBlock("What may evolve", contract.evolution?.mutable), listBlock("What remains frozen", contract.evolution?.frozen), textBlock("Fitness to evaluate", contract.evolution?.fitness));
    if (evolution.childElementCount) section.append(evolution);
    if (section.childElementCount === 1) section.append(el("p", "", "The proposed behavior contract has no instructions recorded yet."));
    return section;
  }

  function appendLinkList(parent, links, emptyText) {
    if (!Array.isArray(links) || !links.length) {
      parent.append(el("p", "", emptyText));
      return;
    }
    const list = el("ul");
    links.forEach((source) => {
      const entry = el("li");
      if (typeof source === "string" && state.byId.has(source)) {
        const card = state.byId.get(source);
        const link = el("a", "", `${source} · ${card.name}`);
        link.href = `#card=${encodeURIComponent(source)}`;
        link.addEventListener("click", (event) => {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          openCard(source, link);
        });
        entry.append(link);
      } else if (typeof source === "string") entry.append(sourceLink(source, source));
      else if (source && typeof source === "object") entry.append(sourceLink(source.label || source.title || source.name || source.url || "Source", source.url));
      list.append(entry);
    });
    parent.append(list);
  }

  function compactCapsule(card) {
    return JSON.stringify({
      schema: "hfo.card.reading-capsule.v1",
      id: card.id, name: card.name, deck: card.deck, kind: card.kind,
      summary: card.summary, summary_origin: card.summary_origin || "UNKNOWN",
      checks: card.checks || [], links: card.links || [],
      definition_status: card.definition_status,
      definition_depth: card.definition_depth,
      engineering: card.engineering,
      hyperstition: card.hyperstition || "",
      behavior_contract: card.behavior_contract || null,
      behavior: card.behavior || { status: "NOT_TESTED" },
      runtime: card.runtime || { status: "UNVERIFIED" },
      sources: card.sources || [], technology_refs: card.technology_refs || [],
      catalog_source: state.catalog.source, catalog_generated_at: state.catalog.generated_at,
      url: `${location.origin}${location.pathname}#card=${encodeURIComponent(card.id)}`,
      authority: "READING_ONLY. Selection grants no execution authority; engineering maturity is not runtime proof."
    }, null, 2);
  }

  async function copyCapsule(card) {
    const text = compactCapsule(card);
    const feedback = $("detail-feedback");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      if (state.selected !== card.id) return;
      feedback.textContent = "Reading capsule copied. Source and claim boundaries are included.";
    } catch {
      if (state.selected !== card.id) return;
      feedback.textContent = "Clipboard access is unavailable. Select and copy the capsule below.";
      let field = $("capsule-fallback");
      if (!field) {
        field = el("textarea", "capsule-fallback");
        field.id = "capsule-fallback";
        field.readOnly = true;
        field.setAttribute("aria-label", "Reading capsule; select and copy this text");
        feedback.after(field);
      }
      field.value = text;
      field.focus();
      field.select();
    }
  }

  function renderDetail(card) {
    const layout = el("div", "detail-layout");
    const sidebar = el("aside", "detail-sidebar");
    const copy = el("button", "button", "Copy reading capsule");
    copy.type = "button";
    copy.addEventListener("click", () => copyCapsule(card));
    sidebar.append(visual(card.id, true), handButton(card, "button primary"), copy, el("p", "detail-smallnote", "Your hand is a local reading choice. No selection runs a tool, grants authority, or verifies a runtime."));
    const content = el("div", "detail-content");
    const title = el("h2", "", card.name);
    title.id = "detail-name";
    const summary = el("p", "detail-summary", card.summary || "This card is indexed; its full definition has not been recovered into this catalog.");
    summary.id = "detail-summary";
    content.append(el("span", "card-deck", `${card.deck || "Unclassified"} / ${card.id}`), title, el("p", "detail-type", card.type_line || card.kind || "Card"), summary, statusTags(card));
    content.append(el("p", "detail-smallnote", `Summary provenance: ${humanStatus(card.summary_origin, "UNKNOWN")}. Definition depth and editorial provenance are separate.`));
    if (card.hyperstition) content.append(el("blockquote", "detail-myth", valueText(card.hyperstition)));
    const useCard = behaviorContractSection(card.behavior_contract);
    if (useCard) content.append(useCard);
    const engineering = detailsSection("Engineering", true);
    engineering.append(definitionList([
      ["Pattern", card.engineering?.pattern], ["Origin", card.engineering?.origin], ["Exemplar", card.engineering?.exemplar], ["Recorded maturity", card.engineering?.maturity]
    ]));
    engineering.append(el("p", "runtime-note", "Engineering maturity describes the pattern. It does not verify this card’s runtime."));
    appendLinkList(engineering, card.technology_refs, "No external technology references are recorded for this card.");
    const checks = detailsSection("Checks & definition");
    checks.append(definitionList([["Definition status", card.definition_status || "UNKNOWN"], ["Definition depth", card.definition_depth === "full" ? "Full definition in this snapshot" : "Index entry; full definition not recovered"]]));
    if (Array.isArray(card.checks) && card.checks.length) {
      const list = el("ul");
      card.checks.forEach((check) => list.append(el("li", "", valueText(check))));
      checks.append(list);
    } else checks.append(el("p", "", "No checks are recorded in this snapshot."));
    const behavior = detailsSection("Behavior & runtime");
    behavior.append(definitionList([["Behavior status", card.behavior?.status || "NOT_TESTED"], ["Target behavior", card.behavior?.target], ["Assay", card.behavior?.assay], ["Runtime status", card.runtime?.status || "UNVERIFIED"]]));
    behavior.append(el("p", "runtime-note", "No verified runtime binding for this card is imported into the battlefield."));
    const myth = detailsSection("Myth & mnemonic");
    myth.append(el("p", "", valueText(card.myth, "No expanded myth is recorded. The card’s name remains a mnemonic handle, not evidence of behavior.")));
    const art = detailsSection("Future art prompt");
    art.append(el("p", "", `Status: ${valueText(card.art?.status, "PROMPT_NOT_RECORDED")}. The geometric seal is a decorative placeholder; card art is pending.`));
    art.append(el("p", "art-prompt", valueText(card.art?.prompt, "No art prompt has been recorded for this card.")));
    if (card.art?.alt) art.append(el("p", "", `Planned image description: ${valueText(card.art.alt)}`));
    const sources = detailsSection("Sources & connected cards", true);
    appendLinkList(sources, card.sources, "No per-card source is available in this snapshot.");
    if (Array.isArray(card.links) && card.links.length) {
      const related = el("div", "related-links");
      card.links.forEach((link) => {
        const target = state.byId.get(link.target_id);
        const label = link.label || target?.name || link.target_id || "Unresolved card";
        if (target) {
          const button = el("button", "related-link", `${link.relation ? `${link.relation}: ` : ""}${label} ↗`);
          button.type = "button";
          button.addEventListener("click", () => openCard(target.id));
          related.append(button);
        } else related.append(el("span", "status-tag", `${label} · not in this snapshot`));
      });
      sources.append(related);
    }
    const feedback = el("p", "copy-feedback");
    feedback.id = "detail-feedback";
    feedback.setAttribute("role", "status");
    content.append(engineering, checks, behavior, myth, art, sources, feedback);
    layout.append(sidebar, content);
    $("card-detail").replaceChildren(layout);
  }

  function openCard(id, trigger = null, updateUrl = true) {
    const card = state.byId.get(id);
    if (!card) { announce("That card is not present in this catalog snapshot."); return; }
    if (trigger) lastTrigger = trigger;
    state.selected = id;
    renderDetail(card);
    const dialog = $("card-dialog");
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    $("close-dialog").focus();
    if (updateUrl) {
      const url = new URL(location.href);
      url.hash = `card=${encodeURIComponent(id)}`;
      if (location.hash !== url.hash) history.pushState(null, "", url);
    }
  }

  function readRoute() {
    if (!state.catalog) return;
    const params = new URLSearchParams(location.hash.slice(1));
    const id = params.get("card");
    if (id) openCard(id, null, false);
    else if ($("card-dialog").open) $("card-dialog").close();
  }

  function renderCoreViews() {
    const views = Array.isArray(state.catalog.core_views) ? state.catalog.core_views : [];
    $("core-section").hidden = !views.length;
    const fragment = document.createDocumentFragment();
    views.forEach((view, index) => {
      const entry = el("details", "core-view");
      const summary = el("summary");
      summary.append(el("span", "view-number", `${String(index + 1).padStart(2, "0")} / ${valueText(view.id, "VIEW")}`), el("span", "view-name", view.name || "Unnamed view"));
      entry.append(summary, el("p", "", valueText(view.question)));
      appendLinkList(entry, view.source_refs, "No source references recorded.");
      fragment.append(entry);
    });
    $("core-views").replaceChildren(fragment);
  }

  function populateFilter(id, field) {
    const select = $(id);
    while (select.options.length > 1) select.remove(1);
    [...new Set(state.cards.map((card) => card[field]).filter((value) => typeof value === "string" && value))].sort((a, b) => a.localeCompare(b)).forEach((value) => {
      const option = el("option", "", value);
      option.value = value;
      select.append(option);
    });
  }

  async function loadCatalog() {
    if (state.loading) return;
    state.loading = true;
    $("load-error").hidden = true;
    $("card-grid").setAttribute("aria-busy", "true");
    $("results-count").textContent = "Loading the source-bound catalog…";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("./catalog.json", { signal: controller.signal, credentials: "same-origin" });
      if (!response.ok) throw new Error(`Catalog request returned HTTP ${response.status}.`);
      const catalog = await response.json();
      if (!catalog || !Array.isArray(catalog.cards) || !catalog.cards.length) throw new Error("The catalog does not contain a valid card collection.");
      const ids = new Set();
      for (const card of catalog.cards) {
        if (!card || typeof card.id !== "string" || !card.id || typeof card.name !== "string" || !card.name || ids.has(card.id)) throw new Error("The catalog contains an invalid or duplicate card identity.");
        ids.add(card.id);
      }
      state.catalog = catalog;
      state.cards = catalog.cards;
      state.byId = new Map(state.cards.map((card) => [card.id, card]));
      restoreHand();
      populateFilter("deck-filter", "deck");
      populateFilter("type-filter", "kind");
      ["search", "deck-filter", "type-filter", "depth-filter", "reset-hand"].forEach((id) => { $(id).disabled = false; });
      $("indexed-count").textContent = state.cards.length.toLocaleString();
      $("full-count").textContent = state.cards.filter((card) => card.definition_depth === "full").length.toLocaleString();
      $("source-info").textContent = `Source ${valueText(catalog.source?.commit, "unbound").slice(0, 12)} · ${valueText(catalog.generated_at, "snapshot date unavailable")}`;
      const sourceUrl = safeUrl(catalog.source?.url);
      if (sourceUrl) {
        $("catalog-source").href = sourceUrl;
        $("catalog-source").rel = "noopener noreferrer";
        $("catalog-source").target = "_blank";
        $("catalog-source").hidden = false;
      }
      renderHand();
      renderCoreViews();
      filterCards();
      readRoute();
    } catch (error) {
      $("load-error").hidden = false;
      $("load-error-message").textContent = error.name === "AbortError" ? "The catalog request timed out. Try again or open the catalog JSON directly." : `${error.message || "The catalog could not be read."} No runtime state has been assumed.`;
      $("results-count").textContent = "Catalog unavailable";
    } finally {
      clearTimeout(timeout);
      state.loading = false;
      $("card-grid").setAttribute("aria-busy", "false");
    }
  }

  $("filters").addEventListener("submit", (event) => event.preventDefault());
  $("search").addEventListener("input", filterCards);
  ["deck-filter", "type-filter", "depth-filter"].forEach((id) => $(id).addEventListener("change", filterCards));
  $("clear-filters").addEventListener("click", () => { $("filters").reset(); filterCards(); $("search").focus(); });
  $("clear-hand").addEventListener("click", () => { state.hand = []; saveHand(); renderHand(); updateHandControls(); $("reset-hand").focus(); announce("Your hand is empty. Choose up to eight cards from the atlas."); });
  $("reset-hand").addEventListener("click", () => { state.hand = defaultHand(); saveHand(); renderHand(); updateHandControls(); announce("Starting hand restored."); });
  $("retry-load").addEventListener("click", loadCatalog);
  $("close-dialog").addEventListener("click", () => $("card-dialog").close());
  $("card-dialog").addEventListener("click", (event) => {
    if (event.target !== $("card-dialog")) return;
    const rect = $("card-dialog").getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) $("card-dialog").close();
  });
  $("card-dialog").addEventListener("close", () => {
    state.selected = null;
    if (new URLSearchParams(location.hash.slice(1)).has("card")) {
      const url = new URL(location.href);
      url.hash = "";
      history.replaceState(null, "", url);
    }
    if (lastTrigger?.isConnected) lastTrigger.focus();
    lastTrigger = null;
  });
  window.addEventListener("hashchange", readRoute);
  renderHand();
  loadCatalog();
})();
