// Three in-browser demos for the automations page. Everything here is plain rules on fake data;
// user text is only ever written with textContent.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const clock = (d = new Date()) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/, "");
  const stamp = (secs) => `+${secs}s`;

  /* ---------- 1. Lead catcher ---------- */
  const leadForm = document.getElementById("lead-form");
  const leadSteps = document.getElementById("lead-steps");
  const sheetBody = document.querySelector("#lead-sheet tbody");
  const SERVICE = { standard: ["Standard", 1], deep: ["Deep", 1.6], move: ["Move-out", 1.8] };
  const BASE = { 1: 95, 2: 125, 3: 160, 4: 210 };
  const SIZE = { 1: "1 bed", 2: "2 bed", 3: "3 bed", 4: "4+ bed" };

  function addStep(list, html, cls = "", secs) {
    const li = el("li", cls);
    if (secs != null) li.append(el("span", "step-time", stamp(secs)));
    html.forEach((part) => li.append(part));
    list.append(li);
    return li;
  }

  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = leadForm.querySelector("button");
    btn.disabled = true;
    const f = Object.fromEntries(new FormData(leadForm));
    const first = (f.name.trim().split(/\s+/)[0] || "there").slice(0, 30);
    const zip = f.zip.trim();
    const inArea = /^02(1[0-9]{2}|4[0-9]{2})$/.test(zip); // Boston, Cambridge, Brookline, Newton-ish
    const [svcName, mult] = SERVICE[f.service];
    const low = Math.round((BASE[f.size] * mult) / 5) * 5;
    const quote = `$${low}-${low + Math.round(low * 0.15 / 5) * 5}`;
    let score = 0;
    if (f.when === "week") score += 3;
    if (f.when === "month") score += 1;
    if (f.when === "browsing") score -= 2;
    if (f.service !== "standard") score += 2;
    if (+f.size >= 3) score += 1;
    if (/deposit|asap|urgent|tomorrow|saturday|sunday|friday/i.test(f.msg)) score += 1;
    const label = !inArea ? "Out of area" : score >= 4 ? "Hot" : score >= 2 ? "Warm" : "Cold";
    const tagCls = { Hot: "hot", Warm: "warm", Cold: "cold", "Out of area": "out" }[label];

    leadSteps.replaceChildren();
    await wait(350);
    addStep(leadSteps, [`Checked ZIP ${zip}: `, el("strong", "", inArea ? "in the service area." : "outside the service area.")], inArea ? "" : "is-bad", 1);
    await wait(550);
    if (inArea) {
      addStep(leadSteps, [`Scored the lead `, el("strong", "", `${label} (${score} pts)`), `: ${f.when === "week" ? "needs it this week" : f.when === "month" ? "this month" : "just looking"}, ${svcName.toLowerCase()} clean.`], label === "Hot" ? "is-hot" : "", 2);
      await wait(550);
    }
    const row = el("tr", "is-new");
    [clock(), f.name.trim().slice(0, 24) || "?", `${svcName}, ${SIZE[f.size]}`, inArea ? quote : "-"].forEach((t) => row.append(el("td", "", t)));
    const tagTd = el("td"); tagTd.append(el("span", `tag ${tagCls}`, label)); row.append(tagTd);
    sheetBody.prepend(row);
    addStep(leadSteps, ["Added a row to the leads sheet."], "", 3);
    await wait(650);
    const reply = inArea
      ? `Hi ${first},\n\nThanks for reaching out to Brightside! A ${svcName.toLowerCase()} clean for a ${SIZE[f.size]} home usually runs ${quote}.${f.when === "week" ? " We still have openings this week." : ""}\n\nPick a time here and it's booked: brightside.example/book\n\nMaria, Brightside Home Cleaning`
      : `Hi ${first},\n\nThanks for thinking of Brightside! Sadly ${zip} is outside the area we cover. Neighborly Clean serves your area and does great work.\n\nMaria, Brightside Home Cleaning`;
    addStep(leadSteps, [`Emailed ${first} a reply with a price and booking link:`, el("div", "msg", reply)], "", 9);
    await wait(700);
    if (label === "Hot") {
      addStep(leadSteps, ["Texted the owner:", el("div", "msg sms", `HOT lead: ${f.name.trim().slice(0, 24)}, ${svcName.toLowerCase()} ${SIZE[f.size]}, ${f.when === "week" ? "this week" : "soon"}, quoted ${quote}. Call back?`)], "is-hot", 10);
    } else if (inArea) {
      addStep(leadSteps, ["Not urgent, so no text. Added to Friday's follow-up list."], "", 10);
    }
    btn.disabled = false;
    btn.textContent = "Send another";
  });

  /* ---------- 2. No-show saver ---------- */
  const bookEl = document.getElementById("book");
  const waitEl = document.getElementById("waitlist");
  const feed = document.getElementById("noshow-feed");
  const nextBtn = document.getElementById("noshow-next");
  const tally = document.getElementById("noshow-tally");
  const PRICE = 38;
  let book, waitlist, phase;

  const freshBook = () => [
    { t: "9:00", name: "Marcus T.", reply: "C" },
    { t: "9:45", name: "Leo P.", reply: "C" },
    { t: "10:30", name: "Andre W.", reply: "X" },
    { t: "11:15", name: "Sam K.", reply: null },
    { t: "1:00", name: "Devin R.", reply: "R" },
    { t: "2:30", name: "Chris M.", reply: "C" },
  ].map((a) => ({ ...a, status: "booked" }));
  const STATUS_TEXT = { booked: "booked", sent: "reminded", confirmed: "confirmed", moved: "moved to Thu", cancelled: "cancelled", flag: "call him", filled: "filled from waitlist" };

  function renderBook() {
    bookEl.replaceChildren(...book.map((a) => {
      const li = el("li");
      li.append(el("span", "book-time", a.t), el("span", "", a.name), el("span", `status ${a.status}`, STATUS_TEXT[a.status]));
      return li;
    }));
    waitEl.replaceChildren(...waitlist.map((w) => {
      const li = el("li");
      li.append(el("span", "", w.name), el("span", `status ${w.status === "booked" ? "filled" : ""}`, w.status === "booked" ? `got ${w.slot}` : "any morning"));
      return li;
    }));
  }
  function log(text, cls = "", sms) {
    if (feed.querySelector(".idle")) feed.replaceChildren();
    const li = el("li", cls, text);
    if (sms) li.append(el("div", "msg sms", sms));
    feed.append(li);
  }
  function resetNoShow() {
    book = freshBook();
    waitlist = [{ name: "Jamal O.", status: "waiting" }, { name: "Theo B.", status: "waiting" }];
    phase = 0;
    feed.replaceChildren(el("li", "idle", "Press the button to move through the day."));
    tally.hidden = true;
    nextBtn.disabled = false;
    nextBtn.textContent = "Tonight, 6 PM: send reminders";
    renderBook();
  }

  const phases = [
    async () => {
      book.forEach((a) => (a.status = "sent"));
      renderBook();
      log("Sent 6 reminder texts, e.g.", "", "Hi Marcus, see you tomorrow at 9:00 at Quarter Hour Barbers. Reply C to confirm, R to reschedule, X to cancel.");
      await wait(500);
      for (const a of book) {
        if (!a.reply) continue;
        await wait(350);
        if (a.reply === "C") { a.status = "confirmed"; log(`${a.name} replied C: marked confirmed.`); }
        if (a.reply === "R") { a.status = "moved"; log(`${a.name} replied R: sent him open slots, he picked Thursday 4:15. Calendar updated.`); }
        if (a.reply === "X") { a.status = "cancelled"; log(`${a.name} replied X: 10:30 is free.`, "is-bad"); }
        renderBook();
      }
      return "Tonight, 6:05 PM: offer the gaps";
    },
    async () => {
      const gaps = book.filter((a) => a.status === "cancelled" || a.status === "moved");
      log(`Texted the waitlist about ${gaps.length} open slots:`, "", `Quarter Hour: a chair opened tomorrow at ${gaps.map((g) => g.t).join(" and ")}. First to reply YES gets it.`);
      await wait(700);
      gaps.forEach((g, i) => {
        const w = waitlist[i];
        if (!w) return;
        w.status = "booked"; w.slot = g.t;
        g.name = w.name; g.status = "filled";
        log(`${w.name} replied YES: booked into ${g.t}.`);
      });
      renderBook();
      return "Tomorrow, 2 hours before: last check";
    },
    async () => {
      const silent = book.find((a) => a.status === "sent");
      if (silent) {
        log(`${silent.name} never replied. Sent a second text 2 hours before:`, "", `Hi ${silent.name.split(" ")[0]}, just checking you're still coming at ${silent.t} today?`);
        await wait(800);
        silent.status = "flag";
        log(`Still nothing. Flagged ${silent.name} on the shop iPad so someone calls him.`, "is-hot");
        renderBook();
      }
      await wait(400);
      const saved = book.filter((a) => a.status === "filled").length;
      tally.hidden = false;
      tally.replaceChildren(
        "Without this: ", el("strong", "", `${saved + 1} empty chairs`), ` (about $${(saved + 1) * PRICE}). With it: `,
        el("strong", "", `${saved} slots refilled`), ", one possible no-show caught early, and nobody at the shop sent a single text.");
      return null;
    },
  ];

  nextBtn.addEventListener("click", async () => {
    nextBtn.disabled = true;
    const label = await phases[phase++]();
    if (label) { nextBtn.textContent = label; nextBtn.disabled = false; }
    else nextBtn.textContent = "Day done";
  });
  document.getElementById("noshow-reset").addEventListener("click", resetNoShow);
  resetNoShow();

  /* ---------- 3. Inbox sorter ---------- */
  const inboxEl = document.getElementById("inbox");
  const binsEl = document.getElementById("bins");
  const ownEl = document.getElementById("own-email");
  const runBtn = document.getElementById("inbox-run");
  const EMAILS = [
    { from: "Mulch Supply Co.", subj: "Invoice #4471", body: "Invoice #4471 for 12 yards of hemlock mulch. Amount due: $1,284.00. Payment due by Nov 21, 2026." },
    { from: "Priya Nair", subj: "Spring cleanup quote?", body: "Hi! We just bought a house at 88 Walnut Ave in Newton and need a spring cleanup plus weekly mowing. Could you send a quote?" },
    { from: "Tom Becker", subj: "Did you skip us?", body: "Hey, nobody came to mow on Tuesday. Is the schedule changing for fall? When is the next visit?" },
    { from: "SEO Rockets", subj: "Rank #1 on Google GUARANTEED!!!", body: "Limited time offer! Guaranteed first page ranking. Click here to claim your free audit, act now." },
    { from: "Eversource", subj: "Your bill is ready", body: "Your electric bill for October is ready. Total amount due: $212.37, due 11/28/2026." },
  ];

  function classify(text) {
    const t = text.toLowerCase();
    const money = text.match(/\$\s?([\d,]+(?:\.\d{2})?)/);
    const due = text.match(/due(?: by| on|,)?\s*((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.? \d{1,2}(?:, \d{4})?|\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/i);
    const spamHits = (t.match(/guarantee|click here|act now|limited time|free audit|winner|!!!|crypto|unsubscribe/g) || []).length;
    if (spamHits >= 2) return { bin: "junk", meta: "archived, not deleted" };
    if (/invoice|bill|amount due|payment due|statement/.test(t) && money)
      return { bin: "bills", meta: `$${money[1]}${due ? ` · due ${due[1]}` : ""} · added to Bills sheet` };
    if (/quote|estimate|price|how much|interested in|looking for|need (a|an|some)|hire/.test(t)) {
      const addr = text.match(/\d{1,5}\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\s(?:St|Ave|Rd|Road|Street|Avenue|Ln|Lane|Dr|Way|Pl|Ct)\b\.?/);
      return { bin: "leads", meta: `new lead${addr ? ` · ${addr[0]}` : ""} · added to CRM, owner notified` };
    }
    if (/\?|when|schedule|skip|missed|problem|help|cancel|change/.test(t))
      return { bin: "support", meta: "reply drafted from the FAQ for you to check and send" };
    return { bin: "support", meta: "not sure, left for a human" };
  }

  const BIN_NAMES = { bills: "Bills", leads: "New leads", support: "Customer questions", junk: "Junk" };
  function renderInbox() {
    inboxEl.replaceChildren(...EMAILS.map((m) => {
      const li = el("li");
      li.append(el("span", "from", m.from), el("span", "subj", m.subj), el("span", "snip", m.body));
      return li;
    }));
  }
  function resetInbox() {
    renderInbox();
    binsEl.replaceChildren(el("p", "idle", 'Press "Sort the inbox".'));
    runBtn.disabled = false;
  }

  runBtn.addEventListener("click", async () => {
    runBtn.disabled = true;
    const items = EMAILS.map((m, i) => ({ ...m, i }));
    const own = ownEl.value.trim();
    if (own) items.unshift({ from: "You", subj: own.split(/[.!?\n]/)[0].slice(0, 60), body: own, i: -1 });
    const bins = {};
    binsEl.replaceChildren();
    for (const key of Object.keys(BIN_NAMES)) {
      const box = el("section", `bin ${key}`);
      box.append(el("h4", "", BIN_NAMES[key]), el("ul"));
      box.hidden = true;
      bins[key] = box;
      binsEl.append(box);
    }
    for (const m of items) {
      await wait(450);
      const r = classify(`${m.subj}. ${m.body}`);
      const li = el("li");
      li.append(el("strong", "", m.from), ` · ${m.subj}`, el("span", "meta", r.meta));
      bins[r.bin].hidden = false;
      bins[r.bin].querySelector("ul").append(li);
      if (m.i >= 0) inboxEl.children[m.i].classList.add("is-done");
    }
    runBtn.disabled = false;
    runBtn.textContent = "Sort again";
  });
  document.getElementById("inbox-reset").addEventListener("click", () => { ownEl.value = ""; runBtn.textContent = "Sort the inbox"; resetInbox(); });
  resetInbox();
  /* ---------- Tabs: one demo at a time ---------- */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      panel.hidden = !on;
      if (on) { panel.classList.remove("is-in"); void panel.offsetWidth; panel.classList.add("is-in"); }
    });
    if (focus) tab.focus();
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });

  /* ---------- Section entrances ---------- */
  document.documentElement.classList.add("js");
  const io = "IntersectionObserver" in window && new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-seen"); io.unobserve(en.target); } });
  }, { rootMargin: "0px 0px -12% 0px" });
  document.querySelectorAll(".reveal").forEach((s) => (io ? io.observe(s) : s.classList.add("is-seen")));
})();
