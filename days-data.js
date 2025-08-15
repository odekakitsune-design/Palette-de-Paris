const days = [
  {
    label: "9/29",
    theme: "到着日（チェックイン＆近場で軽食）",
    items: [
      { time: "11:45", type: "flight", icon: "fa-plane-departure", text: "羽田空港発（AF293便）" },
      { time: "18:10", type: "flight", icon: "fa-plane-arrival", text: "パリ・シャルルドゴール空港着" },
      { time: "", type: "taxi", icon: "fa-taxi", text: "空港→ホテル（送迎車 約1h / 約90€）" },
      { time: "20:00頃", type: "hotel", icon: "fa-hotel", text: "ホテル着・チェックイン" },
      { time: "", type: "food", icon: "fa-utensils", text: "夕食：ホテル周辺のカフェまたは軽食（予約なし）" },
    ]
  },
  {
    label: "9/30",
    theme: "ルーブル美術館と市内観光",
    items: [
      { time: "09:00", type: "bus", icon: "fa-bus", text: "ホテル出発" },
      { time: "10:00", type: "sight", icon: "fa-landmark", text: "ルーブル美術館" },
      { time: "13:00", type: "food", icon: "fa-utensils", text: "昼食：館内レストラン" },
      { time: "15:00", type: "walk", icon: "fa-walking", text: "チュイルリー公園散策" },
      { time: "18:00", type: "food", icon: "fa-utensils", text: "夕食：モンパルナス地区" },
    ]
  }
  // ...以下も全日分追加
];
