// =====================
// ΡΥΘΜΙΣΕΙΣ (ΑΛΛΑΖΕΙΣ ΜΟΝΟ ΕΔΩ)
// =====================

// Γάμος: 26/03/2028 (έβαλα ώρα 18:00 τοπική — αν θες άλλη, άλλαξέ το)
const WEDDING_DATE_LOCAL = "2028-03-26T18:00:00";

// Link Google Maps της εκκλησίας
const LOCATION_URL = "https://www.google.com/maps";

// Κείμενο δίπλα στο κουμπί
const LOCATION_LABEL = "Εξωτική εκκλησία";

// Στοιχεία δώρου
const IBAN = "GRXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const IRIS_1 = "+30 69XXXXXXXX";
const IRIS_2 = "+30 69XXXXXXXX";

// Τηλέφωνα νεόνυμφων
const PHONE_GROOM = "+30 69XXXXXXXX";
const PHONE_BRIDE = "+30 69XXXXXXXX";

// =====================
// HELPERS
// =====================
const $ = (id) => document.getElementById(id);
const pad2 = (n) => String(n).padStart(2, "0");

function safeOpen(url){
  try{
    window.open(url, "_blank", "noopener,noreferrer");
  }catch(e){
    window.location.href = url;
  }
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

// =====================
// FILL STATIC
// =====================
function fillStatic(){
  $("locationLabel").textContent = LOCATION_LABEL;
  $("locationBtn").addEventListener("click", () => safeOpen(LOCATION_URL));

  $("ibanCode").textContent = IBAN;
  $("iris1Code").textContent = IRIS_1;
  $("iris2Code").textContent = IRIS_2;

  $("phoneGroom").textContent = PHONE_GROOM;
  $("phoneBride").textContent = PHONE_BRIDE;
}

// =====================
// COUNTDOWN
// =====================
let timer = null;

function updateCountdown(){
  const target = new Date(WEDDING_DATE_LOCAL).getTime();
  const now = Date.now();
  let diff = target - now;
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Big bubbles
  $("days").textContent = days;
  $("hours").textContent = pad2(hours);
  $("minutes").textContent = pad2(minutes);
  $("seconds").textContent = pad2(seconds);

  $("countDaysText").textContent = `${days} μέρες`;

  // Inline chips (line 1)
  $("tDays").textContent = days;
  $("tHours").textContent = pad2(hours);
  $("tMinutes").textContent = pad2(minutes);
  $("tSeconds").textContent = pad2(seconds);

  // Inline chips (line 2)
  $("tDays2").textContent = days;
  $("tHours2").textContent = pad2(hours);
  $("tMinutes2").textContent = pad2(minutes);
  $("tSeconds2").textContent = pad2(seconds);

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
// MODAL
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

function setupModal(){
  openGiftBtn.addEventListener("click", openModal);
  closeGiftBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  document.querySelectorAll(".copyUnderBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-copy");
      const map = { iban: IBAN, iris1: IRIS_1, iris2: IRIS_2 };
      copyText(map[key] || "", btn);
    });
  });
}

// =====================
// INIT
// =====================
fillStatic();
startCountdown();
setupModal();
