const STORAGE_KEY = "flowl-study-pet";
const SESSION_SECONDS = 25 * 60;
const COINS_PER_MINUTE = 1;
const HUNGER_DECAY_MS = 7 * 24 * 60 * 60 * 1000;
const PLAY_DECAY_MS = 3 * 24 * 60 * 60 * 1000;
const DAILY_LOGIN_BONUS = 15;
const CARE_RECOVERY_AMOUNT = 10;
const LEVEL_REWARD_INTERVAL = 100;
const LEVEL_REWARD_COINS = 100;

const careCosts = {
  feed: 5,
  play: 5,
};

const careEffects = {
  feed: { hunger: CARE_RECOVERY_AMOUNT },
  play: { happy: CARE_RECOVERY_AMOUNT },
};

const shopItems = {
  simpleScarf: {
    name: "シンプルスカーフ",
    category: "clothing",
    rarity: "common",
    price: 50,
    description: "首元だけをやさしく飾る、最初に買いやすい服。",
    iconClass: "clothing-icon rarity-icon-common",
    assetClass: "wear-simple-scarf",
    layer: "clothing",
    offsetX: 0,
    offsetY: 13,
    scale: 1,
    rotation: 0,
  },
  studyVest: {
    name: "小さなベスト",
    category: "clothing",
    rarity: "uncommon",
    price: 120,
    description: "勉強モードに似合う、控えめな若葉色のベスト。",
    iconClass: "clothing-icon rarity-icon-uncommon",
    assetClass: "wear-study-vest",
    layer: "clothing",
    offsetX: 0,
    offsetY: 23,
    scale: 1,
    rotation: 0,
  },
  scholarRobe: {
    name: "学者ローブ",
    category: "clothing",
    rarity: "rare",
    price: 300,
    description: "本の刺繍が入った、特別感のあるローブ。",
    iconClass: "clothing-icon rarity-icon-rare",
    assetClass: "wear-scholar-robe",
    layer: "clothing",
    offsetX: 0,
    offsetY: 27,
    scale: 1,
    rotation: 0,
  },
  starMantle: {
    name: "星柄マント",
    category: "clothing",
    rarity: "epic",
    price: 700,
    description: "星模様がきらめく、夜の集中に似合うマント。",
    iconClass: "clothing-icon rarity-icon-epic",
    assetClass: "wear-star-mantle",
    layer: "clothing",
    offsetX: 0,
    offsetY: 25,
    scale: 1,
    rotation: 0,
  },
  sageRobe: {
    name: "光る賢者ローブ",
    category: "clothing",
    rarity: "legendary",
    price: 1500,
    description: "淡い光をまとった、長く続けた証になる特別な服。",
    iconClass: "clothing-icon rarity-icon-legendary",
    assetClass: "wear-sage-robe",
    layer: "clothing",
    offsetX: 0,
    offsetY: 25,
    scale: 1,
    rotation: 0,
  },
  cloverCape: {
    name: "若葉ブローチ",
    category: "accessory",
    accessorySlot: "neck",
    rarity: "common",
    price: 50,
    description: "胸元に小さく留まる、動きに強い若葉のアクセサリー。",
    iconClass: "accessory-icon rarity-icon-common",
    assetClass: "wear-leaf-brooch",
    layer: "neck",
    offsetX: 23,
    offsetY: 18,
    scale: 1,
    rotation: -8,
  },
  acornBeret: {
    name: "どんぐりベレー",
    category: "accessory",
    accessorySlot: "head",
    rarity: "rare",
    price: 300,
    description: "Flowletが少し得意げになる秋色の帽子。",
    iconClass: "accessory-icon rarity-icon-rare",
    assetClass: "wear-acorn-beret",
    layer: "head",
    offsetX: -6,
    offsetY: -38,
    scale: 1,
    rotation: -4,
  },
  starScarf: {
    name: "星のヘアピン",
    category: "accessory",
    accessorySlot: "head",
    rarity: "epic",
    price: 700,
    description: "頭にそっと光る、集中中もずれにくい特別なピン。",
    iconClass: "accessory-icon rarity-icon-epic",
    assetClass: "wear-star-pin",
    layer: "head",
    offsetX: 23,
    offsetY: -31,
    scale: 1,
    rotation: 12,
  },
  roundGlasses: {
    name: "丸メガネ",
    category: "accessory",
    accessorySlot: "face",
    rarity: "common",
    price: 50,
    description: "表情を隠しすぎない、小さめの勉強メガネ。",
    iconClass: "accessory-icon rarity-icon-common",
    assetClass: "wear-round-glasses",
    layer: "face",
    offsetX: 0,
    offsetY: -16,
    scale: 1,
    rotation: 0,
  },
  studyPencil: {
    name: "小さな鉛筆",
    category: "accessory",
    accessorySlot: "hand",
    rarity: "uncommon",
    price: 120,
    description: "羽の近くに持たせる、勉強アプリらしい小さな鉛筆。",
    iconClass: "accessory-icon rarity-icon-uncommon",
    assetClass: "wear-study-pencil",
    layer: "hand",
    offsetX: -30,
    offsetY: 25,
    scale: 1,
    rotation: -22,
  },
  smallRibbon: {
    name: "小さなリボン",
    category: "accessory",
    accessorySlot: "head",
    rarity: "uncommon",
    price: 120,
    description: "頭にちょこんと乗る、やさしい黄色のリボン。",
    iconClass: "accessory-icon rarity-icon-uncommon",
    assetClass: "wear-small-ribbon",
    layer: "head",
    offsetX: -24,
    offsetY: -34,
    scale: 1,
    rotation: -8,
  },
  quillHat: {
    name: "羽ペン付き帽子",
    category: "accessory",
    accessorySlot: "head",
    rarity: "rare",
    price: 300,
    description: "学者気分が上がる、羽ペン付きの帽子。",
    iconClass: "accessory-icon rarity-icon-rare",
    assetClass: "wear-quill-hat",
    layer: "head",
    offsetX: 0,
    offsetY: -38,
    scale: 1,
    rotation: 0,
  },
  moonPin: {
    name: "月の髪飾り",
    category: "accessory",
    accessorySlot: "head",
    rarity: "epic",
    price: 700,
    description: "月の光がほんのり浮かぶ、夜学習のアクセサリー。",
    iconClass: "accessory-icon rarity-icon-epic",
    assetClass: "wear-moon-pin",
    layer: "head",
    offsetX: 27,
    offsetY: -30,
    scale: 1,
    rotation: 10,
  },
  glowingCrown: {
    name: "光る王冠",
    category: "accessory",
    accessorySlot: "head",
    rarity: "legendary",
    price: 1500,
    description: "一目で特別と分かる、光をまとった王冠。",
    iconClass: "accessory-icon rarity-icon-legendary",
    assetClass: "wear-glowing-crown",
    layer: "head",
    offsetX: 0,
    offsetY: -38,
    scale: 1,
    rotation: 0,
  },
  woodenDesk: {
    name: "小さな木の机",
    category: "furniture",
    rarity: "common",
    price: 50,
    description: "背景に置ける、素朴な勉強机。",
    iconClass: "furniture-icon rarity-icon-common",
    assetClass: "furniture-wooden-desk",
  },
  studyPlant: {
    name: "観葉植物",
    category: "furniture",
    rarity: "uncommon",
    price: 120,
    description: "部屋にやわらかい緑を足す小さな植物。",
    iconClass: "furniture-icon rarity-icon-uncommon",
    assetClass: "furniture-study-plant",
  },
  leafDesk: {
    name: "若葉の机",
    category: "furniture",
    rarity: "common",
    price: 50,
    description: "背景に置ける、勉強部屋用の小さな机。",
    iconClass: "furniture-icon rarity-icon-common",
    assetClass: "furniture-leaf-desk",
  },
  bookShelf: {
    name: "本棚",
    category: "furniture",
    rarity: "rare",
    price: 300,
    description: "勉強部屋らしさがはっきり出る本棚。",
    iconClass: "furniture-icon rarity-icon-rare",
    assetClass: "furniture-book-shelf",
  },
  studyLamp: {
    name: "魔法のランプ",
    category: "furniture",
    rarity: "epic",
    price: 700,
    description: "動物画面にあたたかい灯りを足します。",
    iconClass: "furniture-icon rarity-icon-epic",
    assetClass: "furniture-magic-lamp",
  },
  floatingBooks: {
    name: "浮かぶ本の書斎セット",
    category: "furniture",
    rarity: "legendary",
    price: 1500,
    description: "ページがふわっと浮かぶ、特別な書斎セット。",
    iconClass: "furniture-icon rarity-icon-legendary",
    assetClass: "furniture-floating-books",
  },
  simpleRoom: {
    name: "シンプルな部屋",
    category: "background",
    rarity: "common",
    price: 50,
    description: "どんな衣装にも合う、落ち着いた部屋背景。",
    iconClass: "background-icon rarity-icon-common",
    assetClass: "background-simple-room",
  },
  focusRoom: {
    name: "勉強部屋",
    category: "background",
    rarity: "uncommon",
    price: 120,
    description: "机と本の雰囲気がある、集中しやすい背景。",
    iconClass: "background-icon rarity-icon-uncommon",
    assetClass: "background-focus-room",
  },
  morningForest: {
    name: "朝の森",
    category: "background",
    rarity: "rare",
    price: 300,
    description: "眺めるだけで少し落ち着く森の背景。",
    iconClass: "background-icon rarity-icon-rare",
    assetClass: "background-morning-forest",
  },
  libraryStudy: {
    name: "図書館",
    category: "background",
    rarity: "rare",
    price: 300,
    description: "静かな読書机のある、少し特別な図書館背景。",
    iconClass: "background-icon rarity-icon-rare",
    assetClass: "background-library-study",
  },
  moonLibrary: {
    name: "月夜の図書室",
    category: "background",
    rarity: "epic",
    price: 700,
    description: "静かな夜に似合う、レアな背景テーマ。",
    iconClass: "background-icon rarity-icon-epic",
    assetClass: "background-moon-library",
  },
  starMagicLibrary: {
    name: "星降る魔法図書館",
    category: "background",
    rarity: "legendary",
    price: 1500,
    description: "星が降る、長く続けた人向けの特別な背景。",
    iconClass: "background-icon rarity-icon-legendary",
    assetClass: "background-star-library",
  },
};

const rarityLabels = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

const categoryLabels = {
  clothing: "服",
  accessory: "アクセサリー",
  furniture: "家具",
  background: "背景",
};

const accessorySlotLabels = {
  head: "頭",
  face: "顔",
  neck: "首",
  hand: "手元",
};

const shopCategoryOrder = ["clothing", "accessory", "furniture", "background"];
const equipmentLayerOrder = ["clothing", "hand", "neck", "face", "head", "effect"];

const mascotMotions = ["idle", "headTilt", "eat", "happy", "angry", "sad", "fun", "sleep"];
const mascotMotionLabels = {
  idle: "待機",
  headTilt: "首かしげ",
  eat: "食事",
  happy: "喜び",
  angry: "怒り",
  sad: "悲しみ",
  fun: "楽しい",
  sleep: "睡眠",
};

const growthStages = [
  { id: "egg", name: "たまご", min: 0, next: 10, nextName: "ひな" },
  { id: "baby", name: "ひな", min: 10, next: 60, nextName: "こども" },
  { id: "child", name: "こども", min: 60, next: 180, nextName: "成長後" },
  { id: "grown", name: "成長後", min: 180, next: null, nextName: "" },
];

const unlockRewards = [
  {
    threshold: 10,
    type: "ごはん",
    name: "ふわベリー",
    description: "ごはんの種類が増えます",
    className: "unlock-food",
  },
  {
    threshold: 25,
    type: "飾り",
    name: "若葉のかざり",
    description: "お部屋に小さな葉っぱが生えます",
    className: "unlock-decor",
  },
  {
    threshold: 60,
    type: "背景",
    name: "朝の森",
    description: "背景が少し森らしくなります",
    className: "unlock-bg",
  },
  {
    threshold: 120,
    type: "表情",
    name: "にこにこ顔",
    description: "うれしい表情が出やすくなります",
    className: "unlock-face",
  },
];

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const timerRecordForm = document.getElementById("timerRecordForm");
const timerSubjectInput = document.getElementById("timerSubjectInput");
const timerStatus = document.getElementById("timerStatus");
const coinCount = document.getElementById("coinCount");
const studyForm = document.getElementById("studyForm");
const subjectInput = document.getElementById("subjectInput");
const subjectOptions = document.getElementById("subjectOptions");
const subjectTags = document.getElementById("subjectTags");
const minutesInput = document.getElementById("minutesInput");
const todayTotal = document.getElementById("todayTotal");
const totalStudy = document.getElementById("totalStudy");
const historyList = document.getElementById("historyList");
const weekTotal = document.getElementById("weekTotal");
const weekLabel = document.getElementById("weekLabel");
const weekChart = document.getElementById("weekChart");
const weekCompare = document.getElementById("weekCompare");
const prevWeekBtn = document.getElementById("prevWeekBtn");
const nextWeekBtn = document.getElementById("nextWeekBtn");
const shopList = document.getElementById("shopList");
const inventoryList = document.getElementById("inventoryList");
const shopPreviewStage = document.getElementById("shopPreviewStage");
const shopPreviewPet = document.getElementById("shopPreviewPet");
const shopPreviewName = document.getElementById("shopPreviewName");
const shopPreviewMeta = document.getElementById("shopPreviewMeta");
const shopPreviewAction = document.getElementById("shopPreviewAction");
const inventoryPreviewName = document.getElementById("inventoryPreviewName");
const inventoryPreviewMeta = document.getElementById("inventoryPreviewMeta");
const inventoryPreviewAction = document.getElementById("inventoryPreviewAction");
const petLevel = document.getElementById("petLevel");
const petCareLevel = document.getElementById("petCareLevel");
const motionLabel = document.getElementById("motionLabel");
const motionButtons = document.querySelectorAll(".motion-btn");
const streakCount = document.getElementById("streakCount");
const todayReward = document.getElementById("todayReward");
const idleReward = document.getElementById("idleReward");
const growthStageLabel = document.getElementById("growthStageLabel");
const growthNextLabel = document.getElementById("growthNextLabel");
const growthProgress = document.getElementById("growthProgress");
const levelRewardStatus = document.getElementById("levelRewardStatus");
const nextLevelReward = document.getElementById("nextLevelReward");
const petMessage = document.getElementById("petMessage");
const unlockCount = document.getElementById("unlockCount");
const unlockList = document.getElementById("unlockList");

const petViews = [
  {
    pet: document.getElementById("pet"),
    prop: document.getElementById("petActionProp"),
    hunger: document.getElementById("hungerMeter"),
    happy: document.getElementById("happyMeter"),
  },
  {
    pet: document.getElementById("petCare"),
    prop: document.getElementById("petCareActionProp"),
    hunger: document.getElementById("hungerCareMeter"),
    happy: document.getElementById("happyCareMeter"),
  },
];

let time = SESSION_SECONDS;
let timer = null;
let state = loadState();
let animationTimer = null;
let weekOffset = 0;
let activeMascotMotion = "idle";
let selectedShopItemId = null;
let selectedInventoryItemId = null;

function createDefaultState() {
  return {
    coins: 0,
    totalMinutes: 0,
    pet: {
      hunger: 100,
      happy: 100,
      energy: 100,
      lastFedAt: new Date().toISOString(),
      lastPlayedAt: new Date().toISOString(),
    },
    inventory: {},
    customization: {
      clothing: null,
      outfit: null,
      accessories: {
        head: null,
        face: null,
        neck: null,
        hand: null,
      },
      furniture: null,
      decor: null,
      background: null,
    },
    subjects: [],
    sessions: [],
    loginBonus: {
      date: null,
      coins: 0,
      message: "",
    },
    claimedLevelRewards: [],
    levelReward: {
      levels: [],
      coins: 0,
      message: "Lv.100で100 coin",
    },
    lastOpenedAt: null,
    idleReward: {
      coins: 0,
      message: "記録すると少しずつ貯まります",
    },
  };
}

function normalizeState(savedState) {
  savedState = savedState || {};
  const defaults = createDefaultState();
  const savedCustomization = savedState.customization || {};
  const customization = {
    ...defaults.customization,
    ...savedCustomization,
    accessories: {
      ...defaults.customization.accessories,
      ...(savedCustomization.accessories || {}),
    },
  };

  const legacyOutfit = savedCustomization.outfit;
  const legacyDecor = savedCustomization.decor;

  if (legacyOutfit && shopItems[legacyOutfit]) {
    const item = shopItems[legacyOutfit];
    const category = item.category || item.type;

    if (category === "clothing" && !customization.clothing) {
      customization.clothing = legacyOutfit;
    }

    if (category === "accessory" && item.accessorySlot && !customization.accessories[item.accessorySlot]) {
      customization.accessories[item.accessorySlot] = legacyOutfit;
    }
  }

  if (legacyDecor && !customization.furniture) {
    customization.furniture = legacyDecor;
  }

  return {
    ...defaults,
    ...savedState,
    pet: {
      ...defaults.pet,
      ...savedState.pet,
    },
    inventory: {
      ...defaults.inventory,
      ...savedState.inventory,
    },
    customization: {
      ...customization,
    },
    subjects: Array.isArray(savedState.subjects) ? savedState.subjects : [],
    sessions: Array.isArray(savedState.sessions) ? savedState.sessions : [],
    loginBonus: {
      ...defaults.loginBonus,
      ...savedState.loginBonus,
    },
    claimedLevelRewards: Array.isArray(savedState.claimedLevelRewards)
      ? savedState.claimedLevelRewards.map(Number).filter(Number.isFinite)
      : [],
    levelReward: {
      ...defaults.levelReward,
      ...savedState.levelReward,
    },
    lastOpenedAt: savedState.lastOpenedAt || null,
    idleReward: {
      ...defaults.idleReward,
      ...savedState.idleReward,
    },
  };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return createDefaultState();

  try {
    return normalizeState(JSON.parse(saved));
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return createDefaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getTodayKey() {
  return toDateKey(new Date());
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseSessionDate(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function formatDateLabel(date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatClockLabel(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function getWeekStart(offset) {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset + offset * 7);
  return start;
}

function getWeekDays(offset) {
  const start = getWeekStart(offset);

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

function getEarnedCoins(minutes) {
  return Math.max(1, minutes * COINS_PER_MINUTE);
}

function formatStudyDuration(minutes) {
  const totalMinutes = Math.max(0, Math.round(minutes));
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  if (hours === 0) return `${remainingMinutes}分`;
  if (remainingMinutes === 0) return `${hours}時間`;
  return `${hours}時間${remainingMinutes}分`;
}

function getLevel() {
  return Math.floor(state.totalMinutes / 60) + 1;
}

function getTimePeriod(date = new Date()) {
  const hour = date.getHours();

  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 18) return "day";
  return "night";
}

function getNextLevelRewardLevel() {
  const currentLevel = getLevel();
  let nextLevel = LEVEL_REWARD_INTERVAL;

  while (
    nextLevel < currentLevel ||
    state.claimedLevelRewards.includes(nextLevel)
  ) {
    nextLevel += LEVEL_REWARD_INTERVAL;
  }

  return nextLevel;
}

function getGrowthStage() {
  return growthStages.reduce((current, stage) => {
    return state.totalMinutes >= stage.min ? stage : current;
  }, growthStages[0]);
}

function getUnlockedRewards() {
  return unlockRewards.filter((reward) => state.totalMinutes >= reward.threshold);
}

function applyStageCustomization(stageElement, customization = state.customization) {
  if (!stageElement) return;

  const unlocked = getUnlockedRewards();
  const furniture = customization.furniture || customization.decor;

  stageElement.classList.toggle("has-room-decor", unlocked.length >= 2);
  stageElement.classList.toggle("has-forest-bg", unlocked.length >= 3);
  stageElement.dataset.time = getTimePeriod();

  if (furniture) {
    stageElement.dataset.furniture = furniture;
    stageElement.dataset.decor = furniture;
  } else {
    delete stageElement.dataset.furniture;
    delete stageElement.dataset.decor;
  }

  if (customization.background) {
    stageElement.dataset.background = customization.background;
  } else {
    delete stageElement.dataset.background;
  }
}

function getItemCategory(item) {
  return item?.category || item?.type || "accessory";
}

function getItemPrice(item) {
  return item?.price ?? item?.cost ?? 0;
}

function getItemLayer(item) {
  return item.layer || item.accessorySlot || getItemCategory(item);
}

function getItemSlotLabel(item) {
  if (getItemCategory(item) !== "accessory") return categoryLabels[getItemCategory(item)] || "アイテム";
  return accessorySlotLabels[item.accessorySlot] || "アクセサリー";
}

function getEquippedAccessoryIds(customization = state.customization) {
  return Object.values(customization.accessories || {}).filter(Boolean);
}

function getEquippedItemIds(customization = state.customization) {
  return [
    customization.clothing,
    ...getEquippedAccessoryIds(customization),
  ].filter((id) => id && shopItems[id]);
}

function getCustomizationPreview(itemId) {
  const customization = {
    ...state.customization,
    accessories: {
      head: null,
      face: null,
      neck: null,
      hand: null,
      ...(state.customization.accessories || {}),
    },
  };
  const item = shopItems[itemId];

  if (!item) return customization;

  const category = getItemCategory(item);

  if (category === "clothing") {
    customization.clothing = itemId;
    return customization;
  }

  if (category === "accessory") {
    customization.accessories[item.accessorySlot || "head"] = itemId;
    return customization;
  }

  if (category === "furniture") {
    customization.furniture = itemId;
    customization.decor = itemId;
    return customization;
  }

  if (category === "background") {
    customization.background = itemId;
  }

  return customization;
}

function getItemMetaText(itemId, options = {}) {
  const item = shopItems[itemId];

  if (!item) return "Preview";

  const category = getItemCategory(item);
  const labels = [
    categoryLabels[category],
    category === "accessory" ? getItemSlotLabel(item) : null,
    rarityLabels[item.rarity],
  ];

  if (options.includePrice) labels.push(`${getItemPrice(item)} coin`);
  if (options.includeState) {
    labels.push(isItemEquipped(itemId) ? "装備中" : state.inventory[itemId] ? "購入済み" : "未購入");
  }

  return labels.filter(Boolean).join(" / ");
}

function isItemEquipped(itemId) {
  const item = shopItems[itemId];

  if (!item) return false;

  const category = getItemCategory(item);

  if (category === "clothing") return state.customization.clothing === itemId;
  if (category === "accessory") {
    return state.customization.accessories?.[item.accessorySlot] === itemId;
  }
  if (category === "furniture") return state.customization.furniture === itemId;
  if (category === "background") return state.customization.background === itemId;

  return false;
}

function equipItem(itemId) {
  const item = shopItems[itemId];

  if (!item || !state.inventory[itemId]) return false;

  const category = getItemCategory(item);
  state.customization.accessories = {
    head: null,
    face: null,
    neck: null,
    hand: null,
    ...(state.customization.accessories || {}),
  };

  if (category === "clothing") {
    if (state.customization.clothing === itemId) {
      state.customization.clothing = null;
      state.customization.outfit = null;
      return false;
    }

    state.customization.clothing = itemId;
    state.customization.outfit = null;
    return true;
  }

  if (category === "accessory") {
    const slot = item.accessorySlot || "head";

    if (state.customization.accessories[slot] === itemId) {
      state.customization.accessories[slot] = null;
      return false;
    }

    state.customization.accessories[slot] = itemId;
    return true;
  }

  if (category === "furniture") {
    if (state.customization.furniture === itemId) {
      state.customization.furniture = null;
      state.customization.decor = null;
      return false;
    }

    state.customization.furniture = itemId;
    state.customization.decor = itemId;
    return true;
  }

  if (category === "background") {
    if (state.customization.background === itemId) {
      state.customization.background = null;
      return false;
    }

    state.customization.background = itemId;
    return true;
  }

  return false;
}

function getDecayedCareValue(timestamp, duration) {
  const startTime = timestamp ? Date.parse(timestamp) : Date.now();

  if (Number.isNaN(startTime)) return 100;

  const elapsed = Math.max(0, Date.now() - startTime);
  return clamp(Math.round(100 - (elapsed / duration) * 100));
}

function getCareTimestampForValue(value, duration) {
  const elapsed = ((100 - value) / 100) * duration;
  return new Date(Date.now() - elapsed).toISOString();
}

function applyCareDecay() {
  state.pet.hunger = getDecayedCareValue(state.pet.lastFedAt, HUNGER_DECAY_MS);
  state.pet.happy = getDecayedCareValue(state.pet.lastPlayedAt, PLAY_DECAY_MS);
}

function applyCareAction(action) {
  applyCareDecay();

  if (action === "feed") {
    state.pet.hunger = clamp(state.pet.hunger + careEffects.feed.hunger);
    state.pet.lastFedAt = getCareTimestampForValue(state.pet.hunger, HUNGER_DECAY_MS);
  }

  if (action === "play") {
    state.pet.happy = clamp(state.pet.happy + careEffects.play.happy);
    state.pet.lastPlayedAt = getCareTimestampForValue(state.pet.happy, PLAY_DECAY_MS);
  }
}

function getStudyStreak() {
  const studiedDays = new Set(state.sessions.map((session) => session.date));
  let cursor = new Date();

  if (!studiedDays.has(toDateKey(cursor))) {
    const yesterday = new Date(cursor);
    yesterday.setDate(cursor.getDate() - 1);

    if (!studiedDays.has(toDateKey(yesterday))) return 0;
    cursor = yesterday;
  }

  let streak = 0;

  while (studiedDays.has(toDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function getTodayRewardText(todayMinutes) {
  if (state.loginBonus.date === getTodayKey()) {
    return `ログイン +${DAILY_LOGIN_BONUS} coin`;
  }

  return `ログイン +${DAILY_LOGIN_BONUS} coin`;
}

function getSessionTime(session) {
  if (!session) return 0;
  if (session.createdAt) {
    const createdAt = Date.parse(session.createdAt);
    if (!Number.isNaN(createdAt)) return createdAt;
  }

  if (Number.isFinite(session.id)) return session.id;
  return parseSessionDate(session.date).getTime();
}

function grantLoginBonus() {
  const today = getTodayKey();

  if (state.loginBonus.date === today) return;

  state.coins += DAILY_LOGIN_BONUS;
  state.loginBonus = {
    date: today,
    coins: DAILY_LOGIN_BONUS,
    message: `ログインボーナス +${DAILY_LOGIN_BONUS} coin`,
  };
}

function grantLevelRewards() {
  const currentLevel = getLevel();
  const earnedLevels = [];

  for (let level = LEVEL_REWARD_INTERVAL; level <= currentLevel; level += LEVEL_REWARD_INTERVAL) {
    if (!state.claimedLevelRewards.includes(level)) {
      state.claimedLevelRewards.push(level);
      earnedLevels.push(level);
    }
  }

  if (earnedLevels.length === 0) return;

  const rewardCoins = earnedLevels.length * LEVEL_REWARD_COINS;
  state.coins += rewardCoins;
  state.levelReward = {
    levels: earnedLevels,
    coins: rewardCoins,
    message: `Lv.${earnedLevels[earnedLevels.length - 1]}報酬 +${rewardCoins} coin`,
  };
}

function grantIdleReward() {
  const latestStudyTime = getSessionTime(state.sessions[0]);
  const now = Date.now();

  if (!latestStudyTime) {
    state.lastOpenedAt = new Date(now).toISOString();
    return;
  }

  const lastOpenedTime = state.lastOpenedAt ? Date.parse(state.lastOpenedAt) : latestStudyTime;
  const rewardStartTime = Number.isNaN(lastOpenedTime)
    ? latestStudyTime
    : Math.max(lastOpenedTime, latestStudyTime);
  const elapsedHours = Math.floor((now - rewardStartTime) / (60 * 60 * 1000));
  const rewardCoins = Math.min(12, Math.floor(elapsedHours / 2));

  if (rewardCoins > 0) {
    state.coins += rewardCoins;
    state.idleReward = {
      coins: rewardCoins,
      message: `お留守番で${rewardCoins} coin見つけました`,
    };
  } else {
    state.idleReward = {
      coins: 0,
      message: "少し休んでいます",
    };
  }

  state.lastOpenedAt = new Date(now).toISOString();
  saveState();
}

function getPetMessage(todayMinutes, streak) {
  const stage = getGrowthStage();
  const unlocked = getUnlockedRewards();

  if (state.pet.hunger <= 15) return "おなかがすいて、ちょっとしょんぼりしています";
  if (state.pet.happy <= 15) return "少し退屈みたい。あそんであげると元気になります";
  if (state.idleReward.coins > 0) return state.idleReward.message;
  if (todayMinutes >= 60) return "今日は森まで歩けそうなくらい進んだね";
  if (todayMinutes >= 25) return "集中の音、ちゃんと聞こえてたよ";
  if (todayMinutes >= 10) return "ふわベリーのにおいがするかも";
  if (streak >= 3) return `${streak}日連続、すこしずつ巣が育ってるよ`;
  if (unlocked.length >= 3) return "お部屋がだんだんFlowletらしくなってきたね";
  if (stage.id === "egg") return "たまごの中で、今日の一歩を待ってるよ";
  if (stage.id === "baby") return "ひなFlowletが一緒に見守っています";
  return "今日も短くていいから、いっしょに進もう";
}

function getElapsedTimerMinutes() {
  return Math.ceil((SESSION_SECONDS - time) / 60);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = SESSION_SECONDS;
  updateDisplay();
  updateTimerButton("スタート");
}

function addStudySession(minutes, subject) {
  const earnedCoins = getEarnedCoins(minutes);
  const normalizedSubject = subject || "集中学習";
  const session = {
    id: Date.now(),
    date: getTodayKey(),
    createdAt: new Date().toISOString(),
    subject: normalizedSubject,
    minutes,
    coins: earnedCoins,
  };

  if (subject) {
    rememberSubject(normalizedSubject);
  }

  state.sessions.unshift(session);
  state.sessions = state.sessions.slice(0, 80);
  state.totalMinutes += minutes;
  state.coins += earnedCoins;
  grantLevelRewards();

  saveState();
  render();
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(time);
}

function updateTimerButton(label) {
  startBtn.textContent = label;
}

function rememberSubject(subject) {
  const name = subject.trim();

  if (!name || name === "集中学習" || state.subjects.includes(name)) return;

  state.subjects.unshift(name);
  state.subjects = state.subjects.slice(0, 12);
}

function renderHistory() {
  historyList.innerHTML = "";

  if (state.sessions.length === 0) {
    const empty = document.createElement("li");
    const title = document.createElement("strong");
    const note = document.createElement("span");

    title.textContent = "まだ記録がありません";
    note.textContent = "最初の学習を始めよう";
    empty.append(title, note);
    historyList.appendChild(empty);
    return;
  }

  state.sessions.slice(0, 5).forEach((session) => {
    const item = document.createElement("li");
    const detail = document.createElement("div");
    const title = document.createElement("strong");
    const meta = document.createElement("span");
    const coins = document.createElement("span");

    const recordedAt = new Date(getSessionTime(session));
    const timeLabel = Number.isNaN(recordedAt.getTime())
      ? ""
      : ` ${formatClockLabel(recordedAt)}`;

    title.textContent = session.subject;
    meta.textContent = `${formatDateLabel(parseSessionDate(session.date))}${timeLabel} ・ ${formatStudyDuration(session.minutes)}`;
    coins.textContent = `+${session.coins} coin`;

    detail.append(title, meta);
    item.append(detail, coins);
    historyList.appendChild(item);
  });
}

function renderWeeklyChart() {
  const days = getWeekDays(weekOffset);
  const previousDays = getWeekDays(weekOffset - 1);
  const totals = days.map((day) => getDayTotal(day));
  const previousTotal = previousDays.reduce((sum, day) => sum + getDayTotal(day), 0);
  const weeklyTotal = totals.reduce((sum, minutes) => sum + minutes, 0);
  const weekDifference = weeklyTotal - previousTotal;
  const maxMinutes = Math.max(60, ...totals);
  const labels = ["月", "火", "水", "木", "金", "土", "日"];

  weekChart.innerHTML = "";
  weekTotal.textContent = `週合計 ${formatStudyDuration(weeklyTotal)}`;
  weekLabel.textContent = `${formatDateLabel(days[0])} - ${formatDateLabel(days[6])}`;
  weekCompare.textContent = `前週との差 ${weekDifference >= 0 ? "+" : "-"}${formatStudyDuration(Math.abs(weekDifference))}`;
  nextWeekBtn.disabled = weekOffset >= 0;

  totals.forEach((minutes, index) => {
    const bar = document.createElement("div");
    const fill = document.createElement("span");
    const value = document.createElement("strong");
    const label = document.createElement("small");

    bar.className = "week-bar";
    fill.style.height = `${Math.max(8, (minutes / maxMinutes) * 100)}%`;
    value.textContent = formatStudyDuration(minutes);
    label.textContent = labels[index];

    bar.append(value, fill, label);
    weekChart.appendChild(bar);
  });
}

function getDayTotal(day) {
  const key = toDateKey(day);

  return state.sessions
    .filter((session) => toDateKey(parseSessionDate(session.date)) === key)
    .reduce((sum, session) => sum + session.minutes, 0);
}

function renderPet() {
  applyCareDecay();

  const currentLevel = getLevel();
  petLevel.textContent = currentLevel;
  petCareLevel.textContent = `Lv. ${currentLevel}`;
  const stage = getGrowthStage();
  const stageClasses = growthStages.map((item) => `stage-${item.id}`);

  petViews.forEach((view) => {
    view.hunger.value = state.pet.hunger;
    view.happy.value = state.pet.happy;
    view.pet.classList.toggle("mood-happy", state.pet.happy >= 70);
    view.pet.classList.toggle("mood-tired", state.pet.hunger <= 20 || state.pet.happy <= 20);
    view.pet.classList.toggle("mood-sick", state.pet.hunger <= 20);
    view.pet.classList.toggle("mood-grumpy", state.pet.happy <= 20);
    view.pet.classList.remove(...stageClasses);
    view.pet.classList.add(`stage-${stage.id}`);
    delete view.pet.dataset.outfit;
    renderEquipment(view.pet);

    const stageElement = view.pet.closest(".pet-stage");
    applyStageCustomization(stageElement);
  });
}

function renderGrowth() {
  const stage = getGrowthStage();
  const next = stage.next;
  const previousMinutes = stage.min;
  const nextMinutes = next || state.totalMinutes;
  const progress = next
    ? ((state.totalMinutes - previousMinutes) / (nextMinutes - previousMinutes)) * 100
    : 100;

  growthStageLabel.textContent = stage.name;
  growthNextLabel.textContent = next
    ? `あと${next - state.totalMinutes}分で${stage.nextName}`
    : "すっかり成長しました";
  growthProgress.style.width = `${Math.max(8, Math.min(100, progress))}%`;
}

function renderUnlocks() {
  if (!unlockCount || !unlockList) return;

  const unlocked = getUnlockedRewards();

  unlockCount.textContent = `${unlocked.length}/${unlockRewards.length}`;
  unlockList.innerHTML = "";

  unlockRewards.forEach((reward) => {
    const item = document.createElement("div");
    const icon = document.createElement("span");
    const body = document.createElement("div");
    const title = document.createElement("strong");
    const description = document.createElement("span");
    const status = document.createElement("small");
    const isUnlocked = state.totalMinutes >= reward.threshold;

    item.className = `unlock-item ${reward.className}`;
    item.classList.toggle("locked", !isUnlocked);
    icon.className = "unlock-icon";
    title.textContent = `${reward.type}: ${reward.name}`;
    description.textContent = reward.description;
    status.textContent = isUnlocked ? "解放済み" : `${reward.threshold}分`;

    body.append(title, description);
    item.append(icon, body, status);
    unlockList.appendChild(item);
  });
}

function renderDailySummary(todayMinutes) {
  applyCareDecay();

  const streak = getStudyStreak();

  streakCount.textContent = `${streak}日`;
  todayReward.textContent = getTodayRewardText(todayMinutes);
  idleReward.textContent = state.idleReward.coins > 0
    ? `+${state.idleReward.coins} coin`
    : "待機中";
  petMessage.textContent = getPetMessage(todayMinutes, streak);
}

function renderLevelReward() {
  const nextRewardLevel = getNextLevelRewardLevel();
  const remainingLevels = Math.max(0, nextRewardLevel - getLevel());
  const claimedLevels = [...state.claimedLevelRewards].sort((a, b) => a - b);
  const latestClaimedLevel = claimedLevels[claimedLevels.length - 1];

  levelRewardStatus.textContent = latestClaimedLevel
    ? `受取済み Lv.${latestClaimedLevel} / +${LEVEL_REWARD_COINS} coin`
    : `Lv.${nextRewardLevel}で${LEVEL_REWARD_COINS} coin`;
  nextLevelReward.textContent = remainingLevels === 0
    ? "報酬を受け取りました"
    : `あと${remainingLevels}レベル`;
}

function createItemIcon(iconClass) {
  const icon = document.createElement("span");
  icon.className = `item-illustration ${iconClass}`;
  icon.setAttribute("aria-hidden", "true");
  icon.append(document.createElement("span"), document.createElement("span"));
  return icon;
}

function ensureEquipmentLayers(pet) {
  const layers = {};

  equipmentLayerOrder.forEach((layer) => {
    let layerElement = pet.querySelector(`.pet-equipment[data-layer="${layer}"]`);

    if (!layerElement) {
      layerElement = document.createElement("span");
      layerElement.className = `pet-equipment equipment-${layer}`;
      layerElement.dataset.layer = layer;
      layerElement.setAttribute("aria-hidden", "true");
      pet.appendChild(layerElement);
    }

    layers[layer] = layerElement;
  });

  return layers;
}

function createEquipmentItem(itemId, item) {
  const element = document.createElement("span");
  const offsetX = Number.isFinite(item.offsetX) ? item.offsetX : 0;
  const offsetY = Number.isFinite(item.offsetY) ? item.offsetY : 0;
  const scale = Number.isFinite(item.scale) ? item.scale : 1;
  const rotation = Number.isFinite(item.rotation) ? item.rotation : 0;

  element.className = `equipment-item ${item.assetClass || item.iconClass || ""} rarity-${item.rarity}`;
  element.dataset.item = itemId;
  element.style.setProperty("--item-x", `${offsetX}%`);
  element.style.setProperty("--item-y", `${offsetY}%`);
  element.style.setProperty("--item-scale", scale);
  element.style.setProperty("--item-rotation", `${rotation}deg`);
  return element;
}

function renderEquipment(pet, customization = state.customization) {
  const layers = ensureEquipmentLayers(pet);

  Object.values(layers).forEach((layer) => {
    layer.innerHTML = "";
  });

  if (pet.classList.contains("stage-egg")) return;

  getEquippedItemIds(customization).forEach((itemId) => {
    const item = shopItems[itemId];
    const layer = getItemLayer(item);
    const safeLayer = equipmentLayerOrder.includes(layer) ? layer : "effect";

    layers[safeLayer].appendChild(createEquipmentItem(itemId, item));
  });
}

function ensurePreviewSvg(pet) {
  if (!pet || pet.querySelector(".owl-svg")) return;

  const sourceSvg = document.querySelector("#pet .owl-svg");

  if (sourceSvg) {
    pet.appendChild(sourceSvg.cloneNode(true));
  }
}

function renderPetPreview(stageElement, petElement, itemId) {
  if (!stageElement || !petElement) return;

  ensurePreviewSvg(petElement);

  const stage = getGrowthStage();
  const stageClasses = growthStages.map((item) => `stage-${item.id}`);
  const customization = getCustomizationPreview(itemId);

  petElement.classList.toggle("mood-happy", state.pet.happy >= 70);
  petElement.classList.toggle("mood-tired", state.pet.hunger <= 20 || state.pet.happy <= 20);
  petElement.classList.toggle("mood-sick", state.pet.hunger <= 20);
  petElement.classList.toggle("mood-grumpy", state.pet.happy <= 20);
  petElement.classList.remove(...stageClasses);
  petElement.classList.add(`stage-${stage.id}`);
  delete petElement.dataset.outfit;
  renderEquipment(petElement, customization);
  applyStageCustomization(stageElement, customization);
}

function getPreviewActionText(itemId) {
  const item = shopItems[itemId];

  if (!item) return "選択";
  if (isItemEquipped(itemId)) return "外す";
  if (state.inventory[itemId]) return "装備";
  return "購入";
}

function updatePreviewAction(button, itemId) {
  if (!button) return;

  const item = shopItems[itemId];
  const isOwned = Boolean(state.inventory[itemId]);
  const cost = getItemPrice(item);

  button.disabled = !item || (!isOwned && state.coins < cost);
  button.textContent = getPreviewActionText(itemId);
}

function renderPreviewInfo(nameElement, metaElement, actionButton, itemId) {
  const item = shopItems[itemId];

  if (!item) {
    if (nameElement) nameElement.textContent = "未選択";
    if (metaElement) metaElement.textContent = "Preview";
    updatePreviewAction(actionButton, null);
    return;
  }

  if (nameElement) nameElement.textContent = item.name;
  if (metaElement) metaElement.textContent = getItemMetaText(itemId, {
    includePrice: true,
    includeState: true,
  });
  updatePreviewAction(actionButton, itemId);
}

function renderCustomizationPreviews() {
  const validShopItem = shopItems[selectedShopItemId] ? selectedShopItemId : null;
  const validInventoryItem = shopItems[selectedInventoryItemId] && state.inventory[selectedInventoryItemId]
    ? selectedInventoryItemId
    : null;

  selectedShopItemId = validShopItem;
  selectedInventoryItemId = validInventoryItem;

  renderPetPreview(shopPreviewStage, shopPreviewPet, selectedShopItemId);
  renderPreviewInfo(shopPreviewName, shopPreviewMeta, shopPreviewAction, selectedShopItemId);
  renderPreviewInfo(inventoryPreviewName, inventoryPreviewMeta, inventoryPreviewAction, selectedInventoryItemId);

  if (selectedInventoryItemId) {
    const careView = petViews.find((view) => view.pet.id === "petCare");
    renderPetPreview(careView?.pet.closest(".pet-stage"), careView?.pet, selectedInventoryItemId);
  }
}

function renderSubjectTags() {
  subjectOptions.innerHTML = "";
  subjectTags.innerHTML = "";

  if (state.subjects.length === 0) {
    const empty = document.createElement("span");
    empty.className = "tag-empty";
    empty.textContent = "記録すると科目タグが増えます";
    subjectTags.appendChild(empty);
    return;
  }

  state.subjects.forEach((subject) => {
    const option = document.createElement("option");
    const chip = document.createElement("span");
    const button = document.createElement("button");
    const removeButton = document.createElement("button");

    option.value = subject;
    chip.className = "subject-chip";
    button.type = "button";
    button.className = "subject-tag";
    button.dataset.subject = subject;
    button.textContent = subject;
    removeButton.type = "button";
    removeButton.className = "tag-remove";
    removeButton.dataset.subject = subject;
    removeButton.setAttribute("aria-label", `${subject}を削除`);
    removeButton.textContent = "×";

    subjectOptions.appendChild(option);
    chip.append(button, removeButton);
    subjectTags.appendChild(chip);
  });
}

function renderInventory() {
  inventoryList.innerHTML = "";
  const ownedItems = Object.entries(shopItems).filter(([id]) => state.inventory[id] > 0);

  if (ownedItems.length === 0) {
    const empty = document.createElement("span");
    empty.className = "item-empty";
    empty.textContent = "ショップで服や飾りを買うとここに並びます";
    inventoryList.appendChild(empty);
    return;
  }

  ownedItems.forEach(([id, item]) => {
    const button = document.createElement("button");
    const icon = createItemIcon(item.iconClass);
    const label = document.createElement("span");
    const meta = document.createElement("small");
    const category = getItemCategory(item);
    const slotLabel = category === "accessory" ? getItemSlotLabel(item) : null;
    const detailLabels = [
      categoryLabels[category],
      slotLabel,
      rarityLabels[item.rarity],
    ].filter(Boolean);

    button.type = "button";
    button.className = `use-item-btn rarity-${item.rarity}`;
    button.dataset.item = id;
    label.className = "item-name";
    meta.className = "item-meta";
    label.textContent = item.name;
    meta.textContent = isItemEquipped(id)
      ? "装備中"
      : detailLabels.join(" / ");
    button.classList.toggle("equipped", isItemEquipped(id));
    button.classList.toggle("selected", selectedInventoryItemId === id);
    button.append(icon, label, meta);
    inventoryList.appendChild(button);
  });
}

function renderShop() {
  shopList.innerHTML = "";

  shopCategoryOrder.forEach((category) => {
    const entries = Object.entries(shopItems).filter(([, item]) => getItemCategory(item) === category);
    const section = document.createElement("section");
    const heading = document.createElement("div");
    const title = document.createElement("h3");
    const count = document.createElement("span");
    const list = document.createElement("div");

    if (entries.length === 0) return;

    section.className = `shop-category shop-category-${category}`;
    heading.className = "shop-category-title";
    title.textContent = categoryLabels[category];
    count.textContent = `${entries.length} items`;
    list.className = "shop-category-list";
    heading.append(title, count);

    entries.forEach(([id, item]) => {
      const card = document.createElement("div");
      const body = document.createElement("div");
      const icon = createItemIcon(item.iconClass);
      const itemTitle = document.createElement("h3");
      const meta = document.createElement("div");
      const type = document.createElement("span");
      const rarity = document.createElement("span");
      const price = document.createElement("span");
      const slot = document.createElement("span");
      const button = document.createElement("button");
      const isOwned = state.inventory[id] > 0;
      const isEquipped = isItemEquipped(id);
      const cost = getItemPrice(item);
      const canBuy = state.coins >= cost;

      card.className = `shop-item category-${category} rarity-${item.rarity}`;
      card.dataset.item = id;
      card.classList.toggle("owned", isOwned);
      card.classList.toggle("equipped", isEquipped);
      card.classList.toggle("locked", !isOwned && !canBuy);
      card.classList.toggle("selected", selectedShopItemId === id);
      itemTitle.textContent = item.name;
      meta.className = "shop-meta";
      type.className = "type-badge";
      rarity.className = `rarity-badge rarity-${item.rarity}`;
      price.className = "price-badge";
      slot.className = "slot-badge";
      type.textContent = categoryLabels[category];
      rarity.textContent = rarityLabels[item.rarity];
      price.textContent = `${cost} coin`;
      slot.textContent = getItemSlotLabel(item);
      button.type = "button";
      button.className = "preview-item-btn";
      button.dataset.item = id;
      button.disabled = false;
      button.textContent = selectedShopItemId === id ? "表示中" : "確認";
      button.title = "プレビュー";

      meta.append(type, rarity);
      if (category === "accessory") meta.append(slot);
      meta.append(price);
      body.append(icon, meta, itemTitle);
      card.append(body, button);
      list.appendChild(card);
    });

    section.append(heading, list);
    shopList.appendChild(section);
  });
}

function render() {
  const todayMinutes = state.sessions
    .filter((session) => toDateKey(parseSessionDate(session.date)) === getTodayKey())
    .reduce((sum, session) => sum + session.minutes, 0);

  coinCount.textContent = state.coins;
  todayTotal.textContent = `今日 ${todayMinutes}分`;
  totalStudy.textContent = `累計 ${state.totalMinutes}分`;

  renderDailySummary(todayMinutes);
  renderPet();
  renderGrowth();
  renderLevelReward();
  renderUnlocks();
  renderSubjectTags();
  renderInventory();
  renderShop();
  renderCustomizationPreviews();
  renderHistory();
  renderWeeklyChart();
}

function applyItemEffect(effect) {
  Object.entries(effect).forEach(([key, value]) => {
    state.pet[key] = clamp(state.pet[key] + value);
  });
}

function applyMascotMotion(motion) {
  const nextMotion = mascotMotions.includes(motion) ? motion : "idle";

  activeMascotMotion = nextMotion;

  // motionのclassは1つだけ付けます。画像素材へ差し替える時も、この関数だけ使えばOKです。
  petViews.forEach((view) => {
    view.pet.classList.remove(...mascotMotions, "eating", "playing", "resting");
    view.pet.classList.add(nextMotion);
  });

  motionButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.motion === nextMotion);
  });

  if (motionLabel) {
    motionLabel.textContent = mascotMotionLabels[nextMotion];
  }
}

function setMascotMotion(motion) {
  clearTimeout(animationTimer);
  petViews.forEach((view) => {
    view.prop.className = "pet-action-prop";
  });
  applyMascotMotion(motion);
}

function triggerPetAnimation(action, iconClass) {
  clearTimeout(animationTimer);
  const iconClasses = (iconClass || "").split(/\s+/).filter(Boolean);

  const actionClass = {
    feed: "eat",
    play: "fun",
    rest: "sleep",
  }[action];

  if (!actionClass) return;

  petViews.forEach((view) => {
    view.prop.className = "pet-action-prop";
    view.prop.classList.add("active", action, ...iconClasses);
  });
  applyMascotMotion(actionClass);

  animationTimer = setTimeout(() => {
    petViews.forEach((view) => {
      view.prop.className = "pet-action-prop";
    });
    applyMascotMotion("idle");
  }, 1300);
}

function setFocusMode(isRunning) {
  if (isRunning) {
    applyMascotMotion("idle");
  }

  petViews.forEach((view) => {
    view.pet.classList.toggle("focusing", isRunning);
    view.pet.closest(".pet-stage").classList.toggle("focus-mode", isRunning);
  });
}

function switchScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenId);
  });
}

function finishTimerSession() {
  const minutes = Math.round(SESSION_SECONDS / 60);
  timerStatus.textContent = `完了 +${getEarnedCoins(minutes)} coin`;
  addStudySession(minutes, timerSubjectInput.value.trim() || "タイマー学習");
  timerSubjectInput.value = "";
  alert("学習完了！コインを獲得しました。");
}

startBtn.addEventListener("click", () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
    timerStatus.textContent = "";
    updateTimerButton("再開");
    setFocusMode(false);
    return;
  }

  timerStatus.textContent = "";
  updateTimerButton("一時停止");
  setFocusMode(true);
  timer = setInterval(() => {
    time--;
    updateDisplay();

    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      time = SESSION_SECONDS;
      updateDisplay();
      updateTimerButton("スタート");
      setFocusMode(false);
      finishTimerSession();
    }
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  resetTimer();
  timerStatus.textContent = "";
  setFocusMode(false);
});

timerRecordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const minutes = getElapsedTimerMinutes();

  if (minutes <= 0) {
    alert("まだ記録できる学習時間がありません。");
    return;
  }

  addStudySession(minutes, timerSubjectInput.value.trim() || "タイマー学習");
  resetTimer();
  setFocusMode(false);
  timerSubjectInput.value = "";
  timerStatus.textContent = `記録済み +${getEarnedCoins(minutes)} coin`;
});

prevWeekBtn.addEventListener("click", () => {
  weekOffset -= 1;
  renderWeeklyChart();
});

nextWeekBtn.addEventListener("click", () => {
  if (weekOffset >= 0) return;
  weekOffset += 1;
  renderWeeklyChart();
});

studyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const minutes = Number(minutesInput.value);
  const subject = subjectInput.value.trim();

  if (!Number.isFinite(minutes) || minutes <= 0) return;

  addStudySession(Math.round(minutes), subject);
  subjectInput.value = "";
  minutesInput.value = 25;
});

subjectTags.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".tag-remove");

  if (removeButton) {
    const subject = removeButton.dataset.subject;
    state.subjects = state.subjects.filter((item) => item !== subject);

    if (subjectInput.value === subject) subjectInput.value = "";
    if (timerSubjectInput.value === subject) timerSubjectInput.value = "";

    saveState();
    renderSubjectTags();
    return;
  }

  const button = event.target.closest(".subject-tag");
  if (!button) return;

  subjectInput.value = button.dataset.subject;
  timerSubjectInput.value = button.dataset.subject;
});

document.querySelectorAll(".care-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const cost = careCosts[action];

    if (state.coins < cost) {
      alert("コインが足りません。学習すると増えます。");
      return;
    }

    state.coins -= cost;
    applyCareAction(action);
    triggerPetAnimation(action, {
      feed: "bowl-icon",
      play: "ball-icon",
    }[action]);

    saveState();
    render();
  });
});

function applySelectedItem(itemId) {
  const item = shopItems[itemId];
  if (!item) return false;

  const isOwned = state.inventory[itemId] > 0;
  const category = getItemCategory(item);

  if (isOwned) {
    const equipped = equipItem(itemId);
    if (equipped && (category === "clothing" || category === "accessory")) {
      triggerPetAnimation("play", item.iconClass);
    }
    saveState();
    render();
    return true;
  }

  const cost = getItemPrice(item);

  if (state.coins < cost) {
    alert("コインが足りません。1分学習すると1コイン増えます。");
    render();
    return false;
  }

  state.coins -= cost;
  state.inventory[itemId] = 1;
  const equipped = equipItem(itemId);
  if (equipped && (category === "clothing" || category === "accessory")) {
    triggerPetAnimation("play", item.iconClass);
  }
  saveState();
  render();
  return true;
}

shopList.addEventListener("click", (event) => {
  const card = event.target.closest(".shop-item");
  if (!card) return;

  const itemId = card.dataset.item;
  if (!shopItems[itemId]) return;

  selectedShopItemId = itemId;
  render();
});

shopPreviewAction.addEventListener("click", () => {
  if (!selectedShopItemId) return;
  applySelectedItem(selectedShopItemId);
});

inventoryList.addEventListener("click", (event) => {
  const button = event.target.closest(".use-item-btn");
  if (!button) return;

  const itemId = button.dataset.item;
  if (!shopItems[itemId] || !state.inventory[itemId]) return;

  selectedInventoryItemId = itemId;
  render();
});

inventoryPreviewAction.addEventListener("click", () => {
  if (!selectedInventoryItemId) return;
  applySelectedItem(selectedInventoryItemId);
});

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => {
    switchScreen(button.dataset.screen);
  });
});

motionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMascotMotion(button.dataset.motion);
  });
});

grantLoginBonus();
grantIdleReward();
grantLevelRewards();
saveState();
updateDisplay();
render();
applyMascotMotion(activeMascotMotion);
