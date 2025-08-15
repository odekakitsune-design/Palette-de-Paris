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
    theme: "ルーヴル美術館と市内観光",
    items: [
      { time: "08:30", type: "bus", icon: "fa-bus", text: "ホテル発（バス移動）" },
      { time: "09:15", type: "sight", icon: "fa-landmark", text: "ルーヴル美術館（事前予約／ミュージアムパス）" },
      { time: "13:00", type: "food", icon: "fa-utensils", text: "昼食：館内カフェ" },
      { time: "14:30", type: "walk", icon: "fa-walking", text: "チュイルリー公園散策" },
      { time: "15:00", type: "sight", icon: "fa-landmark", text: "オランジュリー美術館（ミュージアムパス）" },
      { time: "18:00", type: "food", icon: "fa-utensils", text: "夕食：モンパルナス地区" },
    ]
  },
  {
    label: "10/1",
    theme: "ベルサイユ宮殿＆庭園",
    items: [
      { time: "08:00", type: "train", icon: "fa-train", text: "モンパルナス駅 → ベルサイユ（RER・郊外線）" },
      { time: "09:30", type: "sight", icon: "fa-landmark", text: "ベルサイユ宮殿（ミュージアムパス）" },
      { time: "12:30", type: "food", icon: "fa-utensils", text: "昼食：宮殿近くのブラッスリー" },
      { time: "14:00", type: "sight", icon: "fa-leaf", text: "ベルサイユ庭園散策" },
      { time: "17:00", type: "train", icon: "fa-train", text: "ベルサイユ → モンパルナス駅" },
      { time: "18:30", type: "food", icon: "fa-utensils", text: "夕食：ホテル周辺" },
    ]
  },
  {
    label: "10/2",
    theme: "モンマルトルとオペラ座周辺",
    items: [
      { time: "09:00", type: "bus", icon: "fa-bus", text: "ホテル発" },
      { time: "10:00", type: "sight", icon: "fa-church", text: "サクレ・クール寺院" },
      { time: "11:00", type: "walk", icon: "fa-walking", text: "モンマルトルの丘・画家の広場散策" },
      { time: "12:30", type: "food", icon: "fa-utensils", text: "昼食：カフェ・ド・モンマルトル" },
      { time: "14:00", type: "sight", icon: "fa-masks-theater", text: "オペラ・ガルニエ" },
      { time: "16:00", type: "shop", icon: "fa-shopping-bag", text: "ギャラリー・ラファイエット（お土産・ショッピング）" },
      { time: "18:30", type: "food", icon: "fa-utensils", text: "夕食：オペラ地区" },
    ]
  },
  {
    label: "10/3",
    theme: "オルセー美術館とセーヌ川クルーズ",
    items: [
      { time: "09:00", type: "bus", icon: "fa-bus", text: "ホテル発" },
      { time: "10:00", type: "sight", icon: "fa-landmark", text: "オルセー美術館（ミュージアムパス）" },
      { time: "13:00", type: "food", icon: "fa-utensils", text: "昼食：オルセー館内レストラン" },
      { time: "15:00", type: "walk", icon: "fa-walking", text: "セーヌ河岸散策" },
      { time: "16:00", type: "sight", icon: "fa-ship", text: "セーヌ川クルーズ" },
      { time: "18:30", type: "food", icon: "fa-utensils", text: "夕食：ホテル周辺" },
    ]
  },
  {
    label: "10/4〜10/5",
    theme: "帰国",
    items: [
      { time: "06:30", type: "taxi", icon: "fa-taxi", text: "ホテル発（送迎車）" },
      { time: "09:30", type: "flight", icon: "fa-plane-departure", text: "パリCDG発（AF）" },
      { time: "翌日", type: "flight", icon: "fa-plane-arrival", text: "羽田空港着" },
    ]
  }
];
