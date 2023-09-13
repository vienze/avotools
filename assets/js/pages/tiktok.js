// GET ELEMENT

// URL
const url = document.getElementById("tiktokUrl");
// GET BUTTON DOWNLOAD
const btnDownload = document.getElementById("getTik");
// ANIMATION LOADING
const loading = document.getElementById("loading");
// TIKTOK THUMBNAIL
const tikThumb = document.getElementById("tikThumb");
// TIKTOK AUTHOR
const tikAuthor = document.getElementById("tikAuthor");
// TIKTOK DESCRIPTION
const tikDesc = document.getElementById("tikDesc");
// TIKTOK LIKES
const tikLikes = document.getElementById("tikLikes");
// TIKTOK COMMENTS
const tikComments = document.getElementById("tikComments");
// TIKTOK VIEWS
const tikShare = document.getElementById("tikShare");
// DOWNLOAD TIKTOK VIDEO
const dlTikVideo = document.getElementById("dlTikVideo");
// DOWNLOAD TIKTOK MUSIC
const dlTikMusic = document.getElementById("dlTikMusic");
// CARD RESULT
const cardResult = document.getElementById("resultTik");
// ALERT NOTIFICATION
const notif = document.getElementById("notif");
// ALERT TEXT NOTIFICATION
const notifText = document.getElementById("notifText");

// FUNCTION DOWNLOADER TIKTOK
const downloaderTiktok = async (e, token) => {
  e.preventDefault();
  grecaptcha.execute();
  // LOADING CODE
  if (loading.classList.contains("d-none")) {
    loading.classList.remove("d-none");
    btnDownload.disabled = true;
  }

  try {
    if (url.value !== "") {
      const apiUrl = `https://api.akuari.my.id/downloader/tiktok4?link=${url.value}`;

      const response = await fetch(apiUrl);

      const results = await response.json();

      const data = results.respon;

      cardResult.classList.remove("d-none");

      if (data.author !== "") {
        notif.classList.add("show", "alert-primary");
        notifText.innerHTML = "😎 Berhasil mendapatkan url !";
        cardResult.classList.remove("d-none");
        url.value = "";
      } else {
        notif.classList.add("show", "alert-danger");
        notifText.innerHTML = "😢 Gagal mendapatkan url !";
        cardResult.classList.add("d-none");
      }

      console.log(notif);

      // SET DETAIL DOWNLOAD
      tikThumb.url = data.thumbnail;
      tikAuthor.innerText = data.author;
      tikDesc.innerText = data.description;
      tikLikes.innerText = data.like;
      tikComments.innerText = data.comment;
      tikShare.innerText = data.share;

      // SET DOWNLOAD TYPE
      dlTikVideo.addEventListener("click", () => {
        window.open(data.media);
      });
      dlTikMusic.addEventListener("click", () => {
        window.open(data.music);
      });
    } else {
      url.classList.add("is-invalid");
      cardResult.classList.add("d-none");
    }

    // IF URL VALUE NULL
    url.addEventListener("keyup", () => {
      if (url.value.length > 0) {
        url.classList.remove("is-invalid");
      }
    });

    // SET VAR
    loading.classList.add("d-none");
    btnDownload.disabled = false;
  } catch (error) {
    setTimeout(() => {
      notif.classList.add("show", "alert-danger");
      notif.innerText = "👩‍💻 Kesalahan sistem, coba lagi nanti !";
      // SET VAR
      loading.classList.add("d-none");
      btnDownload.disabled = false;
    }, 3000);
    url.value = "";
  }
};

btnDownload.addEventListener("click", downloaderTiktok);
