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

const CONFIG = {
  groomName: "Ιωάννης",
  brideName: "Ναταλιαααα",

  // Ημερομηνία/ώρα γάμου
  weddingDateISO: "2026-04-17T18:00:00+03:00",

  // Κουμπί τοποθεσίας (βάλε το link από Google Maps)
  locationLabel: "Εκκλησία Αγ. ... • Περιοχή ...",
  locationUrl: "https://www.google.com/maps/....",

  families: [
    { name: "Οικογένεια Γαμπρού", meta: "Πατέρας • Μητέρα" },
    { name: "Οικογένεια Νύφης", meta: "Πατέρας • Μητέρα" },
  ],

  koumparoi: [
    { name: "Κουμπάρος 1", meta: "Όνομα Επώνυμο" },
    { name: "Κουμπάρα 2", meta: "Όνομα Επώνυμο" },
  ],

  phones: {
    groom: "+30 69XXXXXXXX",
    bride: "+30 69XXXXXXXX",
  },

  gift: {
    iban: "GRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    beneficiary: "Δικαιούχος: ...",
    iris1: "+30 69XXXXXXXX",
    iris2: "+30 69XXXXXXXX",
    note: "Tip: Αιτιολογία “Δώρο γάμου”.",
  },
};
