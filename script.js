const weddingDate = new Date("Apr 17, 2026 18:00:00").getTime()

function updateCountdown(){

const now = new Date().getTime()

const distance = weddingDate - now

const days = Math.floor(distance / (1000 * 60 * 60 * 24))
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
const seconds = Math.floor((distance % (1000 * 60)) / 1000)

document.getElementById("days").innerText = days
document.getElementById("hours").innerText = hours
document.getElementById("minutes").innerText = minutes
document.getElementById("seconds").innerText = seconds

}

setInterval(updateCountdown,1000)

updateCountdown()


function openMap(){

window.open("https://maps.google.com")

}


function openGift(){

document.getElementById("giftModal").style.display="flex"

}

function closeGift(){

document.getElementById("giftModal").style.display="none"

}

// =====================
// 1) ΡΥΘΜΙΣΕΙΣ (CONFIG)
// =====================
const CONFIG = {
  // Header texts
  kicker: "ΑΚΟΥΣΑΤΕ ΑΚΟΥΣΑΤΕ",
  title: "WE’RE GETTING MARRIED ΒΡΕ ΑΔΕΡΦΕ",

  groomName: "Ιωάννης",
  brideName: "Ναταλιαααα",

  // Wedding date/time (τοπική ώρα)
  // Προσοχή: format ISO με timezone offset Ελλάδας (+02:00 ή +03:00 ανά εποχή)
  weddingDateISO: "2026-04-17T18:00:00+03:00",

  // Location button
  locationLabel: "Εξωτική εκκλησία • [βάλε περιοχή]",
  locationUrl: "https://www.google.com/maps", // βάλε εδώ το link του pin από Google Maps

  // Lists
  families: [
    { name: "Οικογένεια Γαμπρού", meta: "Πατέρας • Μητέρα" },
    { name: "Οικογένεια Νύφης", meta: "Πατέρας • Μητέρα" },
  ],
  koumparoi: [
    { name: "Κουμπάρος 1", meta: "Όνομα Επώνυμο" },
    { name: "Κουμπάρα 2", meta: "Όνομα Επώνυμο" },
  ],

  // Phones
  phones: {
    groom: "+30 69XXXXXXXX",
    bride: "+30 69XXXXXXXX",
  },

  // Gift modal
  gift: {
    iban: "GRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    beneficiary: "Δικαιούχος: Ιωάννης … / Ναταλία …",
    iris1: "+30 69XXXXXXXX",
    iris2: "+30 69XXXXXXXX",
    note: "Tip: Αιτιολογία “Δώρο γάμου”.",
  },
};

// =====================
// 2) HELPERS
// =====================
const $ = (id) => document.getElementById(id);

function pad2(n){ return String(n).padStart(2, "0"); }

function pluralGR(n, one, many){
  return n === 1 ? one : many;
}

function safeOpen(url){
  try{
    window.open(url, "_blank", "noopener,noreferrer");
  }catch(e){
    window.location.href = url;
  }
}

// =====================
// 3) FILL STATIC CONTENT
// =====================
function fillContent(){
  $("kickerText").textContent = CONFIG.kicker;
  $("titleText").textContent = CONFIG.title;

  $("locationLabel").textContent = CONFIG.locationLabel;

  // Lines with names/date
  const weddingDate = new Date(CONFIG.weddingDateISO);
  const dateStr = weddingDate.toLocaleDateString("el-GR", { day:"2-digit", month:"long", year:"numeric" });
  const timeStr = weddingDate.toLocaleTimeString("el-GR", { hour:"2-digit", minute:"2-digit" });

  $("dateLine").textContent = `Στις ${dateStr} (${timeStr}) ο ${CONFIG.groomName} παντρεύεται και παίρνει την ${CONFIG.brideName}.`;

  // Lists
  const fam = $("familiesList");
  fam.innerHTML = "";
  CONFIG.families.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="name">${item.name}</span><span class="meta">${item.meta || ""}</span>`;
    fam.appendChild(li);
  });

  const kou = $("koumparoiList");
  kou.innerHTML = "";
  CONFIG.koumparoi.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="name">${item.name}</span><span class="meta">${item.meta || ""}</span>`;
    kou.appendChild(li);
  });

  // Phones
  $("phones").innerHTML = `
    <div><b>Τηλέφωνα νεόνυμφων</b></div>
    <div>Γαμπρός: <b>${CONFIG.phones.groom}</b></div>
    <div>Νύφη: <b>${CONFIG.phones.bride}</b></div>
  `;

  // Gift modal content
  $("ibanCode").textContent = CONFIG.gift.iban;
  $("ibanHint").textContent = CONFIG.gift.beneficiary || "";
  $("iris1Code").textContent = CONFIG.gift.iris1;
  $("iris2Code").textContent = CONFIG.gift.iris2;
  $("giftNote").textContent = CONFIG.gift.note || "";

  // Location button
  $("locationBtn").addEventListener("click", () => safeOpen(CONFIG.locationUrl));
}

// =====================
// 4) COUNTDOWN
// =====================
let timer = null;

function updateCountdown(){
  const target = new Date(CONFIG.weddingDateISO).getTime();
  const now = Date.now();
  let diff = target - now;

  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  $("days").textContent = days;
  $("hours").textContent = pad2(hours);
  $("minutes").textContent = pad2(minutes);
  $("seconds").textContent = pad2(seconds);

  $("countDaysText").textContent = `${days} ${pluralGR(days, "μέρα", "μέρες")}`;

  // μικρές ατάκες
  $("line1").textContent = `Σε ${days} ${pluralGR(days, "μέρα", "μέρες")}… γα…`;
  $("line2").textContent = `Σε ${days} ${pluralGR(days, "μέρα", "μέρες")} γάμος γίνεται.`;

  if (totalSeconds === 0){
    $("afterCountdownLine").textContent = "ΣΗΜΕΡΑ ΕΙΝΑΙ Η ΜΕΡΑ! 💍";
    if (timer) clearInterval(timer);
  }
}

function startCountdown(){
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
}

// =====================
// 5) MODAL + COPY
// =====================
const modal = $("giftModal");
const openGiftBtn = $("giftBtn");
const closeGiftBtn = $("closeGift");

function openModal(){
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

async function copyText(text, btn){
  try{
    await navigator.clipboard.writeText(text);
    const old = btn.textContent;
    btn.textContent = "Έγινε!";
    setTimeout(() => (btn.textContent = old), 900);
  }catch(e){
    alert("Δεν μπόρεσα να αντιγράψω. Κάνε χειροκίνητα copy.");
  }
}

function setupModal(){
  openGiftBtn.addEventListener("click", openModal);
  closeGiftBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  document.querySelectorAll(".copyBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-copy");
      const map = {
        iban: CONFIG.gift.iban,
        iris1: CONFIG.gift.iris1,
        iris2: CONFIG.gift.iris2,
      };
      copyText(map[key] || "", btn);
    });
  });
}

// =====================
// 6) INIT
// =====================
fillContent();
startCountdown();
setupModal();
