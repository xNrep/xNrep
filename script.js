const extensions = [
  { name: "XN Server Storage", cat: "storage", icon: "☁", status: "BROKEN", desc: "Remote storage for your projects, using only your server.", tags: ["Server-only", "Cloud Save", "GET / POST"] },
  { name: "XN Text Filter", cat: "text", icon: "Aa", desc: "Filter unwanted content with a built-in list and custom words.", tags: ["Filtering", "Built-in list", "Custom words"] },
  { name: "XN Color Picker", cat: "color", icon: "◉", desc: "Choose a color and easily convert between HEX and RGB.", tags: ["Color Picker", "HEX", "RGB"] },
  { name: "XN Color Values", cat: "color", icon: "◆", desc: "Create named color values that can be used in your project.", tags: ["Named Colors", "HEX", "RGB"] }
];

const files = {
  "XN Server Storage": "XN_Server_Storage",
  "XN Text Filter": "XN_Text_Filter",
  "XN Color Picker": "XN_Color_Picker",
  "XN Color Values": "XN_Color_Values"
};

const names = { storage: "STORAGE", text: "TEXT", color: "COLOR" };
const grid = document.querySelector("#grid");
const search = document.querySelector("#search");
const category = document.querySelector("#category");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");

function esc(s) {
  return s.replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
  }[c]));
}

function render() {
  const q = search.value.toLowerCase().trim();
  const c = category.value;
  const list = extensions.filter(x =>
    (c === "all" || x.cat === c) &&
    (!q || x.name.toLowerCase().includes(q) || x.desc.toLowerCase().includes(q) || x.tags.some(t => t.toLowerCase().includes(q)))
  );

  count.textContent = `${list.length} extension${list.length === 1 ? "" : "s"}`;
  grid.innerHTML = list.map(x => {
    const base = files[x.name];
    const statusLabel = x.status ? `<span class="tag broken">${esc(x.status)}</span>` : "";
    return `<article class="card">
      <div class="icon">${x.icon}</div>
      <div>${statusLabel}<span class="tag">${names[x.cat]}</span></div>
      <h3>${esc(x.name)}</h3>
      <p>${esc(x.desc)}</p>
      <div>${x.tags.map(t => `<span class="feature">${esc(t)}</span>`).join("")}</div>
      <a class="button" href="${base}.txt" download>Download</a>
    </article>`;
  }).join("");
  empty.hidden = list.length !== 0;
}

search.addEventListener("input", render);
category.addEventListener("change", render);
render();
