Vue.createApp({
  methods: {
    goToList() {
      window.location.href = "detail.html";
    },
  },
}).mount("#app");

function populateSelectBoxes() {
  const era1 = document.getElementById("era1");
  const era2 = document.getElementById("era2");

  eraList.forEach((item) => {
    const label = `${item.name}（${item.startYear}）`;

    const option1 = document.createElement("option");
    option1.value = item.name;
    option1.textContent = label;
    option1.title = item.yomi;
    era1.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = item.name;
    option2.textContent = label;
    option2.title = item.yomi;
    era2.appendChild(option2);
  });
}

function updateYomi(selectId, yomiId) {
  const select = document.getElementById(selectId);
  const selectedOption = select.options[select.selectedIndex];
  const yomi = selectedOption.title || "（よみがな不明）";
  document.getElementById(yomiId).textContent = `よみがな：${yomi}`;
}
// 元号を比べる
function compareEras() {
  // 選んだ元号を取得
  const e1 = document.getElementById("era1").value;
  const e2 = document.getElementById("era2").value;
  // それぞれの元号の「開始年（西暦）」を取得
  const y1 = eraList.find((e) => e.name === e1).startYear;
  const y2 = eraList.find((e) => e.name === e2).startYear;
  // 結果を表示する要素を取得
  const result = document.getElementById("result");
  // 読み仮名を更新する
  updateYomi("era1", "yomi1");
  updateYomi("era2", "yomi2");

  // 比較結果を表示
  if (y1 > y2) {
    const diff = y1 - y2;
    result.innerHTML = `<span class="era1">${e1}</span>は<span class="era2">${e2}</span>の${diff}年後に始まった元号だよ`;
  } else if (y1 < y2) {
    const diff = y2 - y1;
    result.innerHTML = `<span class="era2">${e2}</span>の方が${diff}年後に始まった元号だよ`;
  } else {
    result.textContent = `どっちも ${y1} 年スタートだよ`;
  }
}
populateSelectBoxes();

$(document).ready(function () {
  $("#era1, #era2").select2({
    matcher: function (params, data) {
      if ($.trim(params.term) === "") return data;

      const term = params.term.toLowerCase();
      const text = data.text.toLowerCase();
      const title = (data.element.title || "").toLowerCase();

      if (text.includes(term) || title.includes(term)) {
        return data;
      }
      return null;
    },
  });

  // 選択時によみがな表示も更新
  $("#era1").on("change", function () {
    updateYomi("era1", "yomi1");
  });
  $("#era2").on("change", function () {
    updateYomi("era2", "yomi2");
  });

  // 選んだらすぐ比較！
  $("#era1, #era2").on("change", function () {
    updateYomi("era1", "yomi1");
    updateYomi("era2", "yomi2");
    compareEras(); // 自動判定！
  });
});
