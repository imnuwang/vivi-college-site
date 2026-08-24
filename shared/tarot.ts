export const tarotCards = [
  { id: "fool", name: "愚者", keyword: "開始與信任" },
  { id: "magician", name: "魔術師", keyword: "意圖與行動" },
  { id: "high_priestess", name: "女祭司", keyword: "直覺與留白" },
  { id: "empress", name: "皇后", keyword: "滋養與豐盛" },
  { id: "emperor", name: "皇帝", keyword: "結構與界線" },
  { id: "hierophant", name: "教皇", keyword: "價值與傳承" },
  { id: "lovers", name: "戀人", keyword: "選擇與對齊" },
  { id: "chariot", name: "戰車", keyword: "方向與推進" },
  { id: "strength", name: "力量", keyword: "溫柔的勇氣" },
  { id: "hermit", name: "隱者", keyword: "內在提問" },
  { id: "wheel", name: "命運之輪", keyword: "循環與時機" },
  { id: "justice", name: "正義", keyword: "誠實與平衡" },
  { id: "hanged_man", name: "吊人", keyword: "換一個角度" },
  { id: "death", name: "死神", keyword: "結束與轉化" },
  { id: "temperance", name: "節制", keyword: "調和與節奏" },
  { id: "devil", name: "惡魔", keyword: "看見束縛" },
  { id: "tower", name: "高塔", keyword: "真相與重整" },
  { id: "star", name: "星星", keyword: "希望與修復" },
  { id: "moon", name: "月亮", keyword: "感受與未知" },
  { id: "sun", name: "太陽", keyword: "清明與生命力" },
  { id: "judgement", name: "審判", keyword: "回應召喚" },
  { id: "world", name: "世界", keyword: "整合與完成" },
] as const;

export type TarotCardId = (typeof tarotCards)[number]["id"];
export const tarotFocuses = ["今日狀態", "關係與連結", "工作與財富", "自我照顧"] as const;
export type TarotFocus = (typeof tarotFocuses)[number];
