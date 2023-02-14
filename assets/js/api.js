function hari() {
  var months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  var myDays = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum&#39;at",
    "Sabtu",
  ];

  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth();
  var thisDay = date.getDay(),
    thisDay = myDays[thisDay];
  var yy = date.getYear();
  var year = yy < 1000 ? yy + 1900 : yy;
  tanggal = thisDay + "," + day + " " + months[month] + " " + year;
  $("#waktu-dasboard").html(tanggal);
}

function ucapan() {
  const today = new Date();
  const hour = today.getHours();
  if (hour < 12) {
    $("#ucapan").html("Selamat Pagi");
  } else if (hour < 18) {
    $("#ucapan").html("Selamat Siang");
  } else {
    $("#ucapan").html("Selamat Malam");
  }
}

// GET
function getSurah4() {
  $.ajax({
    url: "https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json",
    type: "get",
    dataType: "json",
    success: function (response) {
      setSurah4(response);
    },
  });
}

function getSurahSemua() {
  $.ajax({
    url: "https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json",
    type: "get",
    dataType: "json",
    success: function (response) {
      setSurahSemua(response);
    },
  });
}

function getDetailSurah() {
  $("#semua-surah").on("click", "#detail-surah", function () {
    let nama = $(this).data("nama");
    window.location.href = "detail-surah.html?number-surah=" + nama;
  });
}

function getDetail4() {
  $("#surah").on("click", "#detail-surah", function () {
    let nama = $(this).data("nama");
    window.location.href = "pages/detail-surah.html?number-surah=" + nama;
  });
}

function getJadwalSholat() {
  $.ajax({
    url: "https://muslimsalat.com/hulu sungai selatan.json",
    type: "get",
    dataType: "json",
    data: {
      key: "de0ecdf32eb867a50832e3ea3a17c683",
    },
    success: function (response) {
      if (response.status_code == 1) {
        setJadwalSholat(response);
      } else {
        $("#jadwal-sholat").html(`
      <div class="alert alert-outline-danger alert-dismissible fade show" role="alert">
      Data tidak ada!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
      `);
      }
    },
  });
}

function getJadwalSholatCari() {
  $("#tombol-cari-jadwal").on("click", function () {
    let input = $("#input-cari-jadwal").val();
    $.ajax({
      url: "https://muslimsalat.com/" + input + ".json",
      type: "get",
      dataType: "json",
      data: {
        key: "de0ecdf32eb867a50832e3ea3a17c683",
      },
      success: function (response) {
        if (response.status_code == 1) {
          setJadwalSholat(response);
        } else {
          $("#jadwal-sholat").html(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        Data tidak ada!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
        `);
        }
      },
    });
  });
}

function getSemuaDoa() {
  $.ajax({
    url: "https://doa-doa-api-ahmadramadhan.fly.dev/api",
    type: "get",
    dataType: "json",
    success: function (response) {
      setSemuaDoa(response);
    },
  });
}

function getDetailDoa() {
  $("#semua-doa").on("click", "#detail-doa", function () {
    let id = $(this).data("id");
    window.location.href = "detail-doa.html?id=" + id;
  });
}

// SET

function setSurah4(result) {
  var surah = ["Al-Fatiha", "Al-Ikhlas", "Al-Falaq", "An-Nas"];
  $.each(result, function (i, data) {
    let logo = data.name_translations;
    if ($.inArray(data.name, surah) != -1) {
      $("#surah").append(
        `
      <a href="#" class="item" id="detail-surah" class="item" data-nama="` +
          data.number_of_surah +
          `">
      <div class="detail">
        <img
          src="assets/icon/surah.png"
          alt="img"
          class="image-block imaged w48"
        />
        <div>
          <strong>` +
          data.name +
          `</strong>
          <p>` +
          data.type +
          ` | ` +
          data.number_of_ayah +
          ` Ayat</p>
        </div>
      </div>
      <div class="right">
        <div class="price text-success">` +
          logo.ar +
          `</div>
      </div>
    </a>
      `
      );
    }
  });
}
function setSurahSemua(result) {
  $.each(result, function (i, data) {
    let logo = data.name_translations;
    $("#semua-surah").append(
      `
      <a href="#" id="detail-surah" class="item" data-nama="` +
        data.number_of_surah +
        `">
      <div class="detail">
        <img
          src="../assets/icon/surah.png"
          alt="img"
          class="image-block imaged w48"
        />
        <div>
          <strong>` +
        data.name +
        `</strong>
          <p>` +
        data.type +
        ` | ` +
        data.number_of_ayah +
        ` Ayat</p>
        </div>
      </div>
      <div class="right">
        <div class="price text-success">` +
        logo.ar +
        `</div>
      </div>
    </a>
      `
    );
  });
}

function setCariSurah() {
  $("#tombol-cari").on("click", function () {
    let input = $("#input-cari").val();
    let html = "";
    $.ajax({
      url: "https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json",
      type: "get",
      dataType: "json",
      success: function (response) {
        let status = "tidak";
        $.each(response, function (i, data) {
          let logo = data.name_translations;
          if (data.name == input) {
            status = "ada";
            html +=
              `
              <a href="#" id="detail-surah" class="item" data-nama="` +
              data.number_of_surah +
              `">
     <div class="detail">
       <img
         src="../assets/icon/surah.png"
         alt="img"
         class="image-block imaged w48"
       />
       <div>
         <strong>` +
              data.name +
              `</strong>
         <p>` +
              data.type +
              ` | ` +
              data.number_of_ayah +
              ` Ayat</p>
       </div>
     </div>
     <div class="right">
       <div class="price text-success">` +
              logo.ar +
              `</div>
     </div>
   </a>
     `;
            $("#semua-surah").html(html);
          }
          if (status == "tidak") {
            $("#semua-surah").html(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Data tidak ada!,Mungkin anda salah mengetikan nama surah
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
            `);
          }
        });
      },
    });
  });
}

function setDetailSurah() {
  let urlParams = new URLSearchParams(window.location.search);
  let dataUrl = urlParams.get("number-surah");
  $.ajax({
    url:
      "https://raw.githubusercontent.com/penggguna/QuranJSON/master/surah/" +
      dataUrl +
      ".json",
    type: "get",
    dataType: "json",
    success: function (response) {
      let audio = response.recitations;
      let bacaan = response.verses;
      let logo = response.name_translations;
      $("#judul-surah").text(logo.ar);
      $("#makna").text(response.name + "(" + logo.id + ")");
      $("#surah-ke").text(response.number_of_surah);
      $("#ayat").text(response.number_of_ayah);
      $("#turun").text(response.type);
      $.each(bacaan, function (i, data) {
        $("#bacaan").append(
          `
        <ul class="listview flush transparent simple-listview no-space mt-3">
        <li>
        <span class="number-ayat me-2">` +
            data.number +
            `</span>
        <strong id="text-bacaan">` +
            data.text +
            `</strong>
           
      </li>
     
      <p>` +
            data.translation_id +
            `</p>
        </ul>
        `
        );
      });
      $.each(audio, function (i, data) {
        $("#audio").append(
          `
        <p>` +
            data.name +
            `</p>
        <audio controls>
        <source src="` +
            data.audio_url +
            `" type="audio/mpeg">
        Browsermu tidak mendukung tag audio, upgrade donk!
        </audio>
        `
        );
      });
    },
  });
}

function setJadwalSholat(result) {
  let waktu = result.items[0];
  if (result.title == "") {
    var lok = result.query + "," + result.country;
  } else {
    var lok = result.title;
  }
  $("#lokasi-jadwal").text(lok);
  $("#tanggal-jadwal").text(waktu.date_for);
  $("#subuh").text(waktu.fajr);
  $("#terbit").text(waktu.shurooq);
  $("#zuhur").text(waktu.dhuhr);
  $("#asar").text(waktu.asr);
  $("#magrib").text(waktu.maghrib);
  $("#isya").text(waktu.isha);
}

function setSemuaDoa(result) {
  $.each(result, function (i, data) {
    $("#semua-doa").append(
      `
    <a href="#" id="detail-doa" class="item" data-id="` +
        data.id +
        `">
    <div class="detail doa text-success mr-2">
    <ion-icon name="document-text-outline"></ion-icon>
      <div>
        <strong>` +
        data.doa +
        `</strong>
      </div>
    </div>
  </a>
    `
    );
  });
}

function setDetailDoa() {
  let urlParams = new URLSearchParams(window.location.search);
  let dataUrl = urlParams.get("id");
  $.ajax({
    url: "https://doa-doa-api-ahmadramadhan.fly.dev/api/" + dataUrl,
    type: "get",
    dataType: "json",
    success: function (response) {
      const data = response[0];
      $("#judul-doa").text(data.doa);
      $("#ayat-doa").text(data.ayat);
      $("#latin-doa").text(data.latin);
      $("#arti").text(data.artinya);
    },
  });
}

// run
hari();
ucapan();
getSurah4();
getSurahSemua();
setCariSurah();
getDetailSurah();
setDetailSurah();
getJadwalSholat();
getJadwalSholatCari();
getSemuaDoa();
getDetailDoa();
setDetailDoa();
getDetail4();
