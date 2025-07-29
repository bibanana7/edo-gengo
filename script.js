window.eraList = [
  { name: "慶長", year: 1596, yomi: "けいちょう" },
  { name: "元和", year: 1615, yomi: "げんな" },
  { name: "寛永", year: 1624, yomi: "かんえい" },
  { name: "正保", year: 1644, yomi: "しょうほう" },
  { name: "慶安", year: 1648, yomi: "けいあん" },
  { name: "承応", year: 1652, yomi: "じょうおう" },
  { name: "明暦", year: 1655, yomi: "めいれき" },
  { name: "万治", year: 1658, yomi: "まんじ" },
  { name: "寛文", year: 1661, yomi: "かんぶん" },
  { name: "延宝", year: 1673, yomi: "えんぽう" },
  { name: "天和", year: 1681, yomi: "てんな" },
  { name: "貞享", year: 1684, yomi: "じょうきょう" },
  { name: "元禄", year: 1688, yomi: "げんろく" },
  { name: "宝永", year: 1704, yomi: "ほうえい" },
  { name: "正徳", year: 1711, yomi: "しょうとく" },
  { name: "享保", year: 1716, yomi: "きょうほう" },
  { name: "元文", year: 1736, yomi: "げんぶん" },
  { name: "寛保", year: 1741, yomi: "かんぽう" },
  { name: "延享", year: 1744, yomi: "えんきょう" },
  { name: "寛延", year: 1748, yomi: "かんえん" },
  { name: "宝暦", year: 1751, yomi: "ほうれき" },
  { name: "明和", year: 1764, yomi: "めいわ" },
  { name: "安永", year: 1772, yomi: "あんえい" },
  { name: "天明", year: 1781, yomi: "てんめい" },
  { name: "寛政", year: 1789, yomi: "かんせい" },
  { name: "享和", year: 1801, yomi: "きょうわ" },
  { name: "文化", year: 1804, yomi: "ぶんか" },
  { name: "文政", year: 1818, yomi: "ぶんせい" },
  { name: "天保", year: 1830, yomi: "てんぽう" },
  { name: "弘化", year: 1844, yomi: "こうか" },
  { name: "嘉永", year: 1848, yomi: "かえい" },
  { name: "安政", year: 1854, yomi: "あんせい" },
  { name: "万延", year: 1860, yomi: "まんえん" },
  { name: "文久", year: 1861, yomi: "ぶんきゅう" },
  { name: "元治", year: 1864, yomi: "げんじ" },
  { name: "慶応", year: 1865, yomi: "けいおう" },
  { name: "明治", year: 1868, yomi: "めいじ" },
  { name: "大正", year: 1912, yomi: "たいしょう" },
  { name: "昭和", year: 1926, yomi: "しょうわ" },
  { name: "平成", year: 1989, yomi: "へいせい" },
  { name: "令和", year: 2019, yomi: "れいわ" },
];

function populateSelectBoxes() {
  const era1 = document.getElementById("era1");
  const era2 = document.getElementById("era2");

  eraList.forEach((item) => {
    const label = `${item.name}（${item.year}）`;

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
  const y1 = eraList.find((e) => e.name === e1).year;
  const y2 = eraList.find((e) => e.name === e2).year;
  // 結果を表示する要素を取得
  const result = document.getElementById("result");
  // 読み仮名を更新する
  updateYomi("era1", "yomi1");
  updateYomi("era2", "yomi2");

  // 比較結果を表示
  if (y1 > y2) {
    const diff = y1 - y2;
    result.textContent = `${e1}は${e2}の${diff}年後に始まった元号だよ`;
  } else if (y1 < y2) {
    const diff = y2 - y1;
    result.textContent = `${e2}の方が${diff}年後に始まった元号だよ`;
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
