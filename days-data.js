window.days = [
  {
    label: "9/29",
    dayLabel: "1日目",
    theme: "到着日 & 近場で軽食",
    am: "羽田発・パリ着",
    pm: "空港→ホテル→周辺散策",
    items: [
      {
        time: "11:45",
        type: "flight",
        icon: "fa-plane-departure",
        text: "羽田空港発（AF293便）",
        details: ["所要時間: 12時間15分", "機内食あり", "詳細: https://www.airfrance.co.jp/"]
      },
      {
        time: "18:10",
        type: "flight",
        icon: "fa-plane-arrival",
        text: "パリ・シャルルドゴール空港 到着",
        details: ["入国審査・荷物受取", "集合場所: 到着ロビーB"]
      },
      {
        time: "",
        type: "taxi",
        icon: "fa-taxi",
        text: "空港 → ホテル（送迎車）",
        details: ["所要時間: 約1時間", "費用: 約90€", "経由地なし"]
      },
      {
        time: "20:00頃",
        type: "hotel",
        icon: "fa-hotel",
        text: "ホテル着・チェックイン",
        details: ["夕食は周辺カフェまたは軽食（予約なし）"]
      }
    ]
  },
  {
    label: "9/30",
    dayLabel: "2日目",
    theme: "ルーヴル美術館と市内観光",
    am: "ルーヴル美術館見学",
    pm: "チュイルリー公園・オランジュリー美術館",
    items: [
      { time: "08:30", type: "bus", icon: "fa-bus", text: "ホテル発（バス移動）", details: [] },
      { time: "09:15", type: "sight", icon: "fa-landmark", text: "ルーヴル美術館", details: ["事前予約", "ミュージアムパス利用"] },
      { time: "13:00", type: "food", icon: "fa-utensils", text: "昼食：館内カフェ", details: [] },
      { time: "14:30", type: "walk", icon: "fa-walking", text: "チュイルリー公園散策", details: [] },
      { time: "15:00", type: "sight", icon: "fa-landmark", text: "オランジュリー美術館", details: ["ミュージアムパス利用"] },
      { time: "18:00", type: "food", icon: "fa-utensils", text: "夕食：モンパルナス地区", details: [] }
    ]
  },
  {
    label: "10/1",
    dayLabel: "3日目",
    theme: "ベルサイユ宮殿＆庭園",
    am: "ベルサイユ宮殿見学",
    pm: "庭園散策・モンパルナスへ戻る",
    items: [
      { time: "08:00", type: "train", icon: "fa-train", text: "モンパルナス駅 → ベルサイユ", details: ["RER・郊外線"] },
      { time: "09:30", type: "sight", icon: "fa-landmark", text: "ベルサイユ宮殿", details: ["ミュージアムパス利用"] },
      { time: "12:30", type: "food", icon: "fa-utensils", text: "昼食：宮殿近くのブラッスリー", details: [] },
      { time: "14:00", type: "sight", icon: "fa-leaf", text: "ベルサイユ庭園散策", details: [] },
      { time: "17:00", type: "train", icon: "fa-train", text: "ベルサイユ → モンパルナス駅", details: [] },
      { time: "18:30", type: "food", icon: "fa-utensils", text: "夕食：ホテル周辺", details: [] }
    ]
  },
  {
    label: "10/2",
    dayLabel: "4日目",
    theme: "モンマルトルとオペラ座周辺",
    am: "モンマルトル散策",
    pm: "オペラ座・ショッピング",
    items: [
      { time: "09:00", type: "bus", icon: "fa-bus", text: "ホテル発", details: [] },
      { time: "10:00", type: "sight", icon: "fa-church", text: "サクレ・クール寺院", details: [] },
      { time: "11:00", type: "walk", icon: "fa-walking", text: "モンマルトルの丘・画家の広場", details: [] },
      { time: "12:30", type: "food", icon: "fa-utensils", text: "昼食：カフェ・ド・モンマルトル", details: [] },
      { time: "14:00", type: "sight", icon: "fa-masks-theater", text: "オペラ・ガルニエ", details: [] },
      { time: "16:00", type: "shop", icon: "fa-shopping-bag", text: "ギャラリー・ラファイエット", details: ["お土産・ショッピング"] },
      { time: "18:30", type: "food", icon: "fa-utensils", text: "夕食：オペラ地区", details: [] }
    ]
  },
  {
    label: "10/3",
    dayLabel: "5日目",
    theme: "オルセー美術館とセーヌ川クルーズ",
    am: "オルセー美術館",
    pm: "セーヌ河岸散策・クルーズ",
    items: [
      { time: "09:00", type: "bus", icon: "fa-bus", text: "ホテル発", details: [] },
      { time: "10:00", type: "sight", icon: "fa-landmark", text: "オルセー美術館", details: ["ミュージアムパス利用"] },
      { time: "13:00", type: "food", icon: "fa-utensils", text: "昼食：オルセー館内レストラン", details: [] },
      { time: "15:00", type: "walk", icon: "fa-walking", text: "セーヌ河岸散策", details: [] },
      { time: "16:00", type: "sight", icon: "fa-ship", text: "セーヌ川クルーズ", details: [] },
      { time: "18:30", type: "food", icon: "fa-utensils", text: "夕食：ホテル周辺", details: [] }
    ]
  },
  {
    label: "10/4〜10/5",
    dayLabel: "6日目",
    theme: "帰国",
    am: "ホテル出発・空港へ",
    pm: "パリ発・翌日日本着",
    items: [
      { time: "", type: "taxi", icon: "fa-taxi", text: "ホテル発（送迎車）", details: [] },
      { time: "09:30", type: "flight", icon: "fa-plane-departure", text: "パリCDG発（AF便）", details: [] },
      { time: "翌日", type: "flight", icon: "fa-plane-arrival", text: "羽田空港着", details: [] }
    ]
  }
];
