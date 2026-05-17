const STORAGE_KEY = "flowl-study-pet";
const SESSION_SECONDS = 25 * 60;
const COINS_PER_MINUTE = 1;

const careCosts = {
  feed: 8,
  play: 6,
  rest: 5,
};

const careEffects = {
  feed: { hunger: 24, happy: 4, energy: -2 },
  play: { hunger: -5, happy: 22, energy: -8 },
  rest: { hunger: -3, happy: 3, energy: 24 },
};

const shopItems = {
  berrySnack: {
    name: "ベリースナック",
    description: "特別な食べ物。まんぷくとごきげんが上がります。",
    cost: 12,
    rarity: "common",
    action: "feed",
    iconClass: "berry-icon",
    effect: { hunger: 34, happy: 12, energy: 0 },
  },
  puzzleToy: {
    name: "パズルトイ",
    description: "知育オモチャ。ごきげんが大きく上がります。",
    cost: 15,
    rarity: "rare",
    action: "play",
    iconClass: "puzzle-icon",
    effect: { hunger: -4, happy: 36, energy: -6 },
  },
  napCushion: {
    name: "おひるねクッション",
    description: "特別な休憩アイテム。エネルギーを回復します。",
    cost: 10,
    rarity: "common",
    action: "rest",
    iconClass: "cushion-icon",
    effect: { hunger: 0, happy: 8, energy: 34 },
  },
};

const gearItems = {
  leafCape: {
    name: "リーフケープ",
    description: "やさしい緑のケープ。勉強中も落ち着いた気分に。",
    category: "clothes",
    slot: "clothes",
    rarity: "common",
    cost: 24,
    visualClass: "gear-leaf-cape",
  },
  scholarVest: {
    name: "がくしゅうベスト",
    description: "小さなノート風の飾りがついたベスト。",
    category: "clothes",
    slot: "clothes",
    rarity: "uncommon",
    cost: 34,
    visualClass: "gear-scholar-vest",
  },
  studyRibbon: {
    name: "スタディリボン",
    description: "頭にちょこんと乗る応援リボン。",
    category: "accessory",
    slot: "head",
    rarity: "common",
    cost: 18,
    visualClass: "gear-study-ribbon",
  },
  starCrown: {
    name: "星のクラウン",
    description: "特別な日に似合う、きらきらした王冠。",
    category: "accessory",
    slot: "head",
    rarity: "legendary",
    cost: 80,
    visualClass: "gear-star-crown",
  },
  roundGlasses: {
    name: "まるメガネ",
    description: "集中している雰囲気が出る丸いメガネ。",
    category: "accessory",
    slot: "face",
    rarity: "uncommon",
    cost: 32,
    visualClass: "gear-round-glasses",
  },
  cozyScarf: {
    name: "ぬくぬくマフラー",
    description: "夜の勉強にも似合う首元アクセサリー。",
    category: "accessory",
    slot: "neck",
    rarity: "common",
    cost: 22,
    visualClass: "gear-cozy-scarf",
  },
  tinyPencil: {
    name: "ちいさな鉛筆",
    description: "手元に置ける、がんばり屋さんの鉛筆。",
    category: "accessory",
    slot: "hand",
    rarity: "rare",
    cost: 48,
    visualClass: "gear-tiny-pencil",
  },
  studyDesk: {
    name: "木の学習机",
    description: "フクロウのそばに置ける小さな机。",
    category: "furniture",
    slot: "furniture",
    rarity: "common",
    cost: 26,
    visualClass: "gear-study-desk",
  },
  moonLamp: {
    name: "月あかりランプ",
    description: "やわらかく光る、夜の勉強用ランプ。",
    category: "furniture",
    slot: "furniture",
    rarity: "epic",
    cost: 64,
    visualClass: "gear-moon-lamp",
  },
  meadowBackground: {
    name: "草原の背景",
    description: "やさしい風を感じる明るい背景。",
    category: "background",
    slot: "background",
    rarity: "common",
    cost: 28,
    visualClass: "look-bg-meadow",
  },
  nightBackground: {
    name: "星夜の背景",
    description: "静かな夜空と一緒に集中できる背景。",
    category: "background",
    slot: "background",
    rarity: "rare",
    cost: 52,
    visualClass: "look-bg-night",
  },
};

const gearCategories = [
  { id: "all", label: "すべて" },
  { id: "clothes", label: "服" },
  { id: "accessory", label: "アクセサリー" },
  { id: "furniture", label: "家具" },
  { id: "background", label: "背景" },
];

const accessorySlotLabels = {
  head: "頭",
  face: "顔",
  neck: "首",
  hand: "手元",
};

const gearCategoryLabels = {
  clothes: "服",
  accessory: "アクセサリー",
  furniture: "家具",
  background: "背景",
};

const rarityLabels = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

const gearLayerKeys = ["furniture", "clothes", "neck", "face", "hand", "head"];
const gearBackgroundClasses = Object.values(gearItems)
  .filter((item) => item.category === "background")
  .map((item) => item.visualClass);

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

const owlExpressions = {
  normal: {
    id: "normal",
    name: "通常",
    assetPath: "",
    triggerType: "default",
    durationMs: 0,
    priority: 0,
    offsetX: 0,
    offsetY: 0,
    scale: 1,
    rotation: 0,
  },
  happy: {
    id: "happy",
    name: "うれしい",
    assetPath: "",
    triggerType: "reward",
    durationMs: 2600,
    priority: 40,
    offsetX: 0,
    offsetY: -1,
    scale: 1.02,
    rotation: 0,
  },
  excited: {
    id: "excited",
    name: "大よろこび",
    assetPath: "",
    triggerType: "milestone",
    durationMs: 3600,
    priority: 80,
    offsetX: 0,
    offsetY: -2,
    scale: 1.04,
    rotation: 0,
  },
  sleepy: {
    id: "sleepy",
    name: "ねむそう",
    assetPath: "",
    triggerType: "rest",
    durationMs: 0,
    priority: 20,
    offsetX: 0,
    offsetY: 2,
    scale: 0.98,
    rotation: 0,
  },
  focused: {
    id: "focused",
    name: "集中",
    assetPath: "",
    triggerType: "study",
    durationMs: 0,
    priority: 60,
    offsetX: 0,
    offsetY: -1,
    scale: 1,
    rotation: 0,
  },
  proud: {
    id: "proud",
    name: "誇らしい",
    assetPath: "",
    triggerType: "goal",
    durationMs: 3200,
    priority: 70,
    offsetX: 0,
    offsetY: -2,
    scale: 1.03,
    rotation: 0,
  },
  sad: {
    id: "sad",
    name: "さみしい",
    assetPath: "",
    triggerType: "away",
    durationMs: 4200,
    priority: 30,
    offsetX: 0,
    offsetY: 2,
    scale: 0.98,
    rotation: 0,
  },
  surprised: {
    id: "surprised",
    name: "びっくり",
    assetPath: "",
    triggerType: "event",
    durationMs: 2100,
    priority: 65,
    offsetX: 0,
    offsetY: -1,
    scale: 1.04,
    rotation: 0,
  },
  neutral: {
    id: "neutral",
    name: "困り顔",
    assetPath: "",
    triggerType: "soft-limit",
    durationMs: 1800,
    priority: 25,
    offsetX: 0,
    offsetY: 1,
    scale: 1,
    rotation: 0,
  },
};

const owlExpressionClassNames = Object.keys(owlExpressions).map((id) => `expression-${id}`);
const AWAY_SLEEPY_MS = 1000 * 60 * 60 * 18;
const AWAY_SAD_MS = 1000 * 60 * 60 * 24 * 5;
const INACTIVE_SLEEPY_MS = 1000 * 60 * 8;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timerRecordForm = document.getElementById("timerRecordForm");
const timerSubjectInput = document.getElementById("timerSubjectInput");
const timerStatus = document.getElementById("timerStatus");
const coinCount = document.getElementById("coinCount");
const goalForm = document.getElementById("goalForm");
const dailyGoalInput = document.getElementById("dailyGoalInput");
const dailyGoalStatus = document.getElementById("dailyGoalStatus");
const dailyGoalMeter = document.getElementById("dailyGoalMeter");
const streakText = document.getElementById("streakText");
const studyForm = document.getElementById("studyForm");
const subjectInput = document.getElementById("subjectInput");
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
const wardrobePreviewStage = document.getElementById("wardrobePreviewStage");
const equippedSummary = document.getElementById("equippedSummary");
const wardrobeTabs = document.getElementById("wardrobeTabs");
const wardrobeGrid = document.getElementById("wardrobeGrid");
const wardrobeActionBar = document.getElementById("wardrobeActionBar");
const wardrobeSelectedName = document.getElementById("wardrobeSelectedName");
const wardrobeSelectedMeta = document.getElementById("wardrobeSelectedMeta");
const wardrobeSelectedDescription = document.getElementById("wardrobeSelectedDescription");
const wardrobeSelectedStatus = document.getElementById("wardrobeSelectedStatus");
const clearGearBtn = document.getElementById("clearGearBtn");
const wardrobeActionBtn = document.getElementById("wardrobeActionBtn");
const inventoryList = document.getElementById("inventoryList");
const petLevel = document.getElementById("petLevel");
const petCareLevel = document.getElementById("petCareLevel");
const motionLabel = document.getElementById("motionLabel");
const motionButtons = document.querySelectorAll(".motion-btn");

const petViews = [
  {
    pet: document.getElementById("pet"),
    prop: document.getElementById("petActionProp"),
    hunger: document.getElementById("hungerMeter"),
    happy: document.getElementById("happyMeter"),
    energy: document.getElementById("energyMeter"),
  },
  {
    pet: document.getElementById("petCare"),
    prop: document.getElementById("petCareActionProp"),
    hunger: document.getElementById("hungerCareMeter"),
    happy: document.getElementById("happyCareMeter"),
    energy: document.getElementById("energyCareMeter"),
  },
];

let time = SESSION_SECONDS;
let timer = null;
let state = loadState();
let animationTimer = null;
let expressionTimer = null;
let inactivityTimer = null;
let expressionOverride = null;
let weekOffset = 0;
let activeMascotMotion = "idle";
let activeShopItemId = null;
let shopUseTimer = null;
let activeGearCategory = "all";
let selectedGearItemId = "leafCape";

function createDefaultState() {
  return {
    coins: 0,
    dailyGoalMinutes: 60,
    lastSeenAt: null,
    totalMinutes: 0,
    pet: {
      hunger: 60,
      happy: 60,
      energy: 60,
    },
    inventory: {},
    ownedGear: [],
    equipped: {
      clothes: null,
      background: null,
      furniture: null,
      accessories: {
        head: null,
        face: null,
        neck: null,
        hand: null,
      },
    },
    sessions: [],
  };
}

function normalizeState(savedState) {
  const defaults = createDefaultState();

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
    ownedGear: Array.isArray(savedState.ownedGear) ? savedState.ownedGear : [],
    equipped: {
      ...defaults.equipped,
      ...savedState.equipped,
      accessories: {
        ...defaults.equipped.accessories,
        ...savedState.equipped?.accessories,
      },
    },
    sessions: Array.isArray(savedState.sessions) ? savedState.sessions : [],
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

function getLevel() {
  return Math.floor(state.totalMinutes / 60) + 1;
}

function getTodayMinutes() {
  return getDayTotal(new Date());
}

function getStudyDayKeys() {
  return [...new Set(state.sessions.map((session) => toDateKey(parseSessionDate(session.date))))];
}

function getStreakCount() {
  const studyDays = new Set(getStudyDayKeys());
  const day = new Date();
  let streak = 0;

  while (studyDays.has(toDateKey(day))) {
    streak += 1;
    day.setDate(day.getDate() - 1);
  }

  return streak;
}

function getElapsedTimerMinutes() {
  return Math.ceil((SESSION_SECONDS - time) / 60);
}

function isNightTime(date = new Date()) {
  const hour = date.getHours();
  return hour >= 22 || hour < 6;
}

function getOwlExpression(id) {
  return owlExpressions[id] || owlExpressions.normal;
}

function getBaseOwlExpression() {
  const candidates = [owlExpressions.normal];
  const isFocusing = petViews.some((view) => view.pet.classList.contains("focusing"));

  if (timer !== null || isFocusing) {
    candidates.push(owlExpressions.focused);
  }

  if (isNightTime() || state.pet.energy <= 18) {
    candidates.push(owlExpressions.sleepy);
  }

  return candidates.sort((a, b) => b.priority - a.priority)[0];
}

function applyOwlExpression(expressionId) {
  const expression = getOwlExpression(expressionId);

  petViews.forEach((view) => {
    view.pet.classList.remove(...owlExpressionClassNames);
    view.pet.classList.add(`expression-${expression.id}`);
    view.pet.dataset.expression = expression.id;
    view.pet.dataset.expressionName = expression.name;
    view.pet.dataset.expressionAsset = expression.assetPath || "";
    view.pet.style.setProperty("--expression-offset-x", `${expression.offsetX}px`);
    view.pet.style.setProperty("--expression-offset-y", `${expression.offsetY}px`);
    view.pet.style.setProperty("--expression-scale", expression.scale);
    view.pet.style.setProperty("--expression-rotation", `${expression.rotation}deg`);
  });
}

function updateOwlExpression() {
  const baseExpression = getBaseOwlExpression();
  const nextExpression =
    expressionOverride && expressionOverride.priority >= baseExpression.priority
      ? expressionOverride
      : baseExpression;

  applyOwlExpression(nextExpression.id);
}

function clearTemporaryOwlExpression() {
  clearTimeout(expressionTimer);
  expressionTimer = null;
  expressionOverride = null;
  updateOwlExpression();
}

function showTemporaryOwlExpression(expressionId, options = {}) {
  const expression = getOwlExpression(expressionId);
  const priority = options.priority ?? expression.priority;
  const durationMs = options.durationMs ?? expression.durationMs;
  const triggerType = options.triggerType ?? expression.triggerType;

  if (expressionOverride && expressionOverride.priority > priority) return;

  clearTimeout(expressionTimer);
  expressionOverride = { ...expression, priority, triggerType };
  updateOwlExpression();

  if (durationMs > 0) {
    expressionTimer = setTimeout(() => {
      expressionOverride = null;
      expressionTimer = null;
      updateOwlExpression();
    }, durationMs);
  }
}

function showRareItemReaction() {
  showTemporaryOwlExpression("surprised", {
    durationMs: 900,
    priority: owlExpressions.surprised.priority,
    triggerType: "rare-item",
  });

  setTimeout(() => {
    showTemporaryOwlExpression("excited", {
      durationMs: owlExpressions.excited.durationMs,
      priority: owlExpressions.excited.priority,
      triggerType: "rare-item",
    });
  }, 820);
}

function getLaunchExpression(previousSeenAt) {
  const previousTime = previousSeenAt ? Date.parse(previousSeenAt) : NaN;

  if (Number.isNaN(previousTime)) return owlExpressions.happy;

  const awayMs = Date.now() - previousTime;

  if (awayMs >= AWAY_SAD_MS) return owlExpressions.sad;
  if (awayMs >= AWAY_SLEEPY_MS) return owlExpressions.sleepy;

  return isNightTime() ? owlExpressions.sleepy : owlExpressions.normal;
}

function rememberSeen() {
  state.lastSeenAt = new Date().toISOString();
  saveState();
}

function handleAppLaunch() {
  const launchExpression = getLaunchExpression(state.lastSeenAt);
  rememberSeen();

  if (launchExpression.id !== "normal") {
    showTemporaryOwlExpression(launchExpression.id, {
      durationMs: launchExpression.id === "sleepy" ? 3200 : launchExpression.durationMs,
      priority: launchExpression.priority,
      triggerType: "launch",
    });
  } else {
    updateOwlExpression();
  }
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);

  if (expressionOverride?.triggerType === "idle") {
    clearTemporaryOwlExpression();
  }

  inactivityTimer = setTimeout(() => {
    showTemporaryOwlExpression("sleepy", {
      durationMs: 0,
      priority: owlExpressions.sleepy.priority,
      triggerType: "idle",
    });
  }, INACTIVE_SLEEPY_MS);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = SESSION_SECONDS;
  updateDisplay();
}

function addStudySession(minutes, subject) {
  const previousLevel = getLevel();
  const previousTodayMinutes = getTodayMinutes();
  const dailyGoal = Math.max(5, Number(state.dailyGoalMinutes) || 60);
  const earnedCoins = getEarnedCoins(minutes);
  const session = {
    id: Date.now(),
    date: getTodayKey(),
    subject: subject || "集中学習",
    minutes,
    coins: earnedCoins,
  };

  state.sessions.unshift(session);
  state.sessions = state.sessions.slice(0, 80);
  state.totalMinutes += minutes;
  state.coins += earnedCoins;
  state.pet.hunger = clamp(state.pet.hunger - Math.ceil(minutes / 18));
  state.pet.happy = clamp(state.pet.happy + Math.ceil(minutes / 20));
  state.pet.energy = clamp(state.pet.energy - Math.ceil(minutes / 15));

  saveState();
  render();

  const nextLevel = getLevel();
  const nextTodayMinutes = getTodayMinutes();
  const reachedDailyGoal = previousTodayMinutes < dailyGoal && nextTodayMinutes >= dailyGoal;

  if (nextLevel > previousLevel || minutes >= 120) {
    showTemporaryOwlExpression("excited");
  } else if (reachedDailyGoal || minutes >= 60) {
    showTemporaryOwlExpression("proud");
  } else {
    showTemporaryOwlExpression("happy");
  }
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(time);
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

  state.sessions.slice(0, 10).forEach((session) => {
    const item = document.createElement("li");
    const detail = document.createElement("div");
    const title = document.createElement("strong");
    const meta = document.createElement("span");
    const coins = document.createElement("span");

    title.textContent = session.subject;
    meta.textContent = `${formatDateLabel(parseSessionDate(session.date))} ・ ${session.minutes}分`;
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
  const maxMinutes = Math.max(60, ...totals);
  const labels = ["月", "火", "水", "木", "金", "土", "日"];

  weekChart.innerHTML = "";
  weekTotal.textContent = `週合計 ${weeklyTotal}分`;
  weekLabel.textContent = `${formatDateLabel(days[0])} - ${formatDateLabel(days[6])}`;
  weekCompare.textContent = `前週との差 ${weeklyTotal - previousTotal >= 0 ? "+" : ""}${weeklyTotal - previousTotal}分`;
  nextWeekBtn.disabled = weekOffset >= 0;

  totals.forEach((minutes, index) => {
    const bar = document.createElement("div");
    const fill = document.createElement("span");
    const value = document.createElement("strong");
    const label = document.createElement("small");

    bar.className = "week-bar";
    fill.style.height = `${Math.max(8, (minutes / maxMinutes) * 100)}%`;
    value.textContent = `${minutes}`;
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
  const levelText = `Lv. ${getLevel()}`;
  petLevel.textContent = levelText;
  petCareLevel.textContent = levelText;

  petViews.forEach((view) => {
    view.hunger.value = state.pet.hunger;
    view.happy.value = state.pet.happy;
    view.energy.value = state.pet.energy;
    view.pet.classList.toggle("mood-happy", state.pet.happy >= 70);
    view.pet.classList.toggle("mood-tired", state.pet.energy <= 25 || state.pet.hunger <= 20);
  });

  updateOwlExpression();
}

function createItemIcon(iconClass) {
  const icon = document.createElement("span");
  icon.className = `item-illustration ${iconClass}`;
  icon.setAttribute("aria-hidden", "true");
  icon.append(document.createElement("span"), document.createElement("span"));
  return icon;
}

function createGearIcon(item) {
  const icon = document.createElement("span");
  icon.className = `gear-icon rarity-${item.rarity} ${item.visualClass}`;
  icon.setAttribute("aria-hidden", "true");
  icon.append(document.createElement("span"), document.createElement("span"));
  return icon;
}

function setButtonLabel(button, label, ariaPrefix = "") {
  if (!button) return;

  const safeLabel = String(label || "").trim() || "購入";
  button.textContent = safeLabel;
  button.dataset.label = safeLabel;
  button.setAttribute("aria-label", ariaPrefix ? `${ariaPrefix} ${safeLabel}` : safeLabel);
}

function getGearSlotKey(item) {
  if (!item) return "";
  return item.category === "accessory" ? item.slot : item.category;
}

function getGearSlotLabel(item) {
  if (!item) return "";
  if (item.category === "accessory") return accessorySlotLabels[item.slot] || "アクセサリー";
  return gearCategoryLabels[item.category] || item.category;
}

function getOwnedGearSet() {
  return new Set(state.ownedGear || []);
}

function isGearOwned(itemId) {
  return getOwnedGearSet().has(itemId);
}

function getEquippedGearId(item) {
  if (!item) return null;
  if (item.category === "accessory") return state.equipped.accessories[item.slot] || null;
  return state.equipped[item.category] || null;
}

function isGearEquipped(itemId) {
  const item = gearItems[itemId];
  return Boolean(item && getEquippedGearId(item) === itemId);
}

function canAffordGear(item) {
  return Boolean(item && state.coins >= item.cost);
}

function getGearActionLabel(item) {
  if (!item) return "選択";
  if (isGearEquipped(item.id)) return "装備中";
  if (isGearOwned(item.id)) return "装備";
  if (!canAffordGear(item)) return "コイン不足";
  return "購入";
}

function isGearActionEnabled(item) {
  if (!item) return false;
  if (isGearEquipped(item.id)) return false;
  if (isGearOwned(item.id)) return true;
  return canAffordGear(item);
}

function getGearStatusText(item) {
  if (!item) return "";
  if (isGearEquipped(item.id)) return "装備中";
  if (isGearOwned(item.id)) return "購入済み";
  if (!canAffordGear(item)) return `あと ${item.cost - state.coins} coin`;
  return "未購入";
}

function getGearMetaText(item) {
  return `${getGearSlotLabel(item)} ・ ${rarityLabels[item.rarity] || item.rarity}`;
}

function cloneEquipped(equipped = state.equipped) {
  return {
    clothes: equipped.clothes || null,
    background: equipped.background || null,
    furniture: equipped.furniture || null,
    accessories: {
      head: equipped.accessories?.head || null,
      face: equipped.accessories?.face || null,
      neck: equipped.accessories?.neck || null,
      hand: equipped.accessories?.hand || null,
    },
  };
}

function getPreviewEquipped() {
  const preview = cloneEquipped();
  const selectedItem = gearItems[selectedGearItemId];

  if (!selectedItem) return preview;

  if (selectedItem.category === "accessory") {
    preview.accessories[selectedItem.slot] = selectedItem.id;
  } else {
    preview[selectedItem.category] = selectedItem.id;
  }

  return preview;
}

function equipGearItem(itemId) {
  const item = gearItems[itemId];
  if (!item || !isGearOwned(itemId)) return;

  if (item.category === "accessory") {
    state.equipped.accessories[item.slot] = itemId;
  } else {
    state.equipped[item.category] = itemId;
  }
}

function unequipGearItem(itemId) {
  const item = gearItems[itemId];
  if (!item) return;

  if (item.category === "accessory") {
    if (state.equipped.accessories[item.slot] === itemId) state.equipped.accessories[item.slot] = null;
    return;
  }

  if (state.equipped[item.category] === itemId) state.equipped[item.category] = null;
}

function clearGearSlot(item) {
  if (!item) return;

  if (item.category === "accessory") {
    state.equipped.accessories[item.slot] = null;
    return;
  }

  state.equipped[item.category] = null;
}

function getEquippedItemForLayer(equipped, layerKey) {
  if (layerKey === "clothes") return gearItems[equipped.clothes];
  if (layerKey === "furniture") return gearItems[equipped.furniture];
  return gearItems[equipped.accessories?.[layerKey]];
}

function ensureLookLayers(stage) {
  gearLayerKeys.forEach((layerKey) => {
    if (stage.querySelector(`.gear-layer[data-layer="${layerKey}"]`)) return;

    const layer = document.createElement("span");
    layer.className = `gear-layer gear-layer-${layerKey}`;
    layer.dataset.layer = layerKey;
    layer.setAttribute("aria-hidden", "true");
    stage.appendChild(layer);
  });
}

function applyLookToStage(stage, equipped) {
  ensureLookLayers(stage);
  stage.classList.remove(...gearBackgroundClasses);

  const background = gearItems[equipped.background];
  if (background?.visualClass) stage.classList.add(background.visualClass);

  gearLayerKeys.forEach((layerKey) => {
    const layer = stage.querySelector(`.gear-layer[data-layer="${layerKey}"]`);
    const item = getEquippedItemForLayer(equipped, layerKey);

    layer.className = `gear-layer gear-layer-${layerKey}`;
    layer.dataset.item = "";

    if (!item) return;

    layer.classList.add("active", item.visualClass, `rarity-${item.rarity}`);
    layer.dataset.item = item.id;
  });
}

function renderEquippedLook() {
  const equipped = cloneEquipped();
  document.querySelectorAll(".pet-stage:not(.wardrobe-preview-stage)").forEach((stage) => {
    applyLookToStage(stage, equipped);
  });
}

function initWardrobePreview() {
  if (!wardrobePreviewStage || wardrobePreviewStage.querySelector(".wardrobe-preview-pet")) return;

  const shadow = document.createElement("div");
  const previewPet = petViews[0].pet.cloneNode(true);

  shadow.className = "pet-shadow";
  previewPet.removeAttribute("id");
  previewPet.className = "pet idle expression-happy wardrobe-preview-pet";
  previewPet.dataset.asset = "flowl-owl";
  previewPet.dataset.expression = "happy";

  wardrobePreviewStage.append(shadow, previewPet);
}

function renderWardrobePreview() {
  if (!wardrobePreviewStage) return;

  initWardrobePreview();
  applyLookToStage(wardrobePreviewStage, getPreviewEquipped());
}

function renderEquippedSummary() {
  if (!equippedSummary) return;

  equippedSummary.innerHTML = "";
  const equippedIds = [
    state.equipped.background,
    state.equipped.furniture,
    state.equipped.clothes,
    ...Object.values(state.equipped.accessories),
  ].filter(Boolean);

  if (equippedIds.length === 0) {
    const empty = document.createElement("span");
    empty.textContent = "まだ装備はありません";
    equippedSummary.appendChild(empty);
    return;
  }

  equippedIds.forEach((itemId) => {
    const item = gearItems[itemId];
    if (!item) return;

    const badge = document.createElement("span");
    badge.textContent = `${getGearSlotLabel(item)}: ${item.name}`;
    equippedSummary.appendChild(badge);
  });
}

function renderWardrobeTabs() {
  if (!wardrobeTabs) return;

  wardrobeTabs.innerHTML = "";
  gearCategories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wardrobe-tab";
    button.dataset.category = category.id;
    button.classList.toggle("active", activeGearCategory === category.id);
    button.textContent = category.label;
    wardrobeTabs.appendChild(button);
  });
}

function renderWardrobeGrid() {
  if (!wardrobeGrid) return;

  wardrobeGrid.innerHTML = "";
  Object.entries(gearItems)
    .filter(([, item]) => activeGearCategory === "all" || item.category === activeGearCategory)
    .forEach(([id, item]) => {
      item.id = id;
      const owned = isGearOwned(id);
      const equipped = isGearEquipped(id);
      const canAfford = canAffordGear(item);
      const actionLabel = getGearActionLabel(item) || "購入";
      const card = document.createElement("article");
      const iconWrap = document.createElement("div");
      const badge = document.createElement("span");
      const rarity = document.createElement("span");
      const title = document.createElement("strong");
      const meta = document.createElement("small");
      const price = document.createElement("span");
      const status = document.createElement("span");
      const button = document.createElement("button");

      card.className = `gear-card rarity-${item.rarity}`;
      card.dataset.item = id;
      card.classList.toggle("selected", selectedGearItemId === id);
      card.classList.toggle("owned", owned);
      card.classList.toggle("locked", !owned);
      card.classList.toggle("equipped", equipped);
      card.classList.toggle("insufficient", !owned && !canAfford);

      iconWrap.className = "gear-card-art";
      iconWrap.appendChild(createGearIcon(item));

      badge.className = "gear-equipped-badge";
      badge.textContent = equipped ? "装備中" : "試着OK";

      rarity.className = "gear-rarity";
      rarity.textContent = rarityLabels[item.rarity] || item.rarity;

      title.textContent = item.name;
      meta.textContent = getGearMetaText(item);
      price.className = "gear-price";
      price.textContent = `${item.cost} coin`;
      status.className = "gear-status";
      status.textContent = getGearStatusText(item);

      button.type = "button";
      button.className = "gear-action-btn";
      button.dataset.item = id;
      button.disabled = !isGearActionEnabled(item);
      setButtonLabel(button, actionLabel, item.name);

      card.append(iconWrap, badge, rarity, title, meta, price, status, button);
      wardrobeGrid.appendChild(card);
    });
}

function renderWardrobeActionBar() {
  if (!wardrobeActionBar) return;

  const item = gearItems[selectedGearItemId];

  if (!item) {
    wardrobeSelectedMeta.textContent = "アイテムを選択";
    wardrobeSelectedName.textContent = "装備を選んでください";
    wardrobeSelectedDescription.textContent = "購入前でもプレビューに試着できます。";
    wardrobeSelectedStatus.textContent = "";
    setButtonLabel(wardrobeActionBtn, "選択");
    wardrobeActionBtn.disabled = true;
    clearGearBtn.disabled = true;
    setButtonLabel(clearGearBtn, "外す");
    return;
  }

  item.id = selectedGearItemId;
  const actionLabel = getGearActionLabel(item) || "購入";
  const equippedInSlot = getEquippedGearId(item);

  wardrobeSelectedMeta.textContent = getGearMetaText(item);
  wardrobeSelectedName.textContent = item.name;
  wardrobeSelectedDescription.textContent = item.description;
  wardrobeSelectedStatus.textContent = getGearStatusText(item);
  setButtonLabel(wardrobeActionBtn, actionLabel, item.name);
  wardrobeActionBtn.disabled = !isGearActionEnabled(item);
  clearGearBtn.disabled = !equippedInSlot;
  setButtonLabel(clearGearBtn, equippedInSlot ? `${getGearSlotLabel(item)}を外す` : "外す");
}

function renderWardrobe() {
  if (!wardrobeGrid) return;

  renderWardrobePreview();
  renderEquippedSummary();
  renderWardrobeTabs();
  renderWardrobeGrid();
  renderWardrobeActionBar();
}

function runGearAction(itemId) {
  const item = gearItems[itemId];
  if (!item) return;

  item.id = itemId;
  selectedGearItemId = itemId;

  if (isGearEquipped(itemId)) {
    unequipGearItem(itemId);
    showTemporaryOwlExpression("happy", { durationMs: 1600, triggerType: "unequip" });
  } else if (isGearOwned(itemId)) {
    equipGearItem(itemId);
    showTemporaryOwlExpression("proud", { durationMs: 2200, triggerType: "equip" });
  } else if (canAffordGear(item)) {
    state.coins -= item.cost;
    state.ownedGear = [...new Set([...(state.ownedGear || []), itemId])];
    showTemporaryOwlExpression(["rare", "epic", "legendary"].includes(item.rarity) ? "excited" : "happy", {
      triggerType: "gear-purchase",
    });
  } else {
    showTemporaryOwlExpression("neutral");
    renderWardrobe();
    return;
  }

  saveState();
  render();
}

function clearSelectedGearSlot() {
  const item = gearItems[selectedGearItemId];
  if (!item) return;

  clearGearSlot(item);
  saveState();
  render();
  showTemporaryOwlExpression("happy", { durationMs: 1600, triggerType: "clear-gear" });
}

function renderInventory() {
  inventoryList.innerHTML = "";
  const ownedItems = Object.entries(shopItems).filter(([id]) => isShopItemOwned(id));

  if (ownedItems.length === 0) {
    const empty = document.createElement("span");
    empty.className = "item-empty";
    empty.textContent = "ショップで買うとここに並びます";
    inventoryList.appendChild(empty);
    return;
  }

  ownedItems.forEach(([id, item]) => {
    const button = document.createElement("button");
    const icon = createItemIcon(item.iconClass);
    const label = document.createElement("span");

    button.type = "button";
    button.className = "use-item-btn";
    button.dataset.item = id;
    button.disabled = isShopItemActive(id);
    label.textContent = isShopItemActive(id) ? `${item.name} 利用中` : `${item.name} 利用`;
    button.append(icon, label);
    inventoryList.appendChild(button);
  });
}

function isShopItemOwned(itemId) {
  return (Number(state.inventory[itemId]) || 0) > 0;
}

function isShopItemActive(itemId) {
  return activeShopItemId === itemId;
}

function canAffordShopItem(item) {
  return Boolean(item && state.coins >= item.cost);
}

function getShopActionLabel(itemId, item = shopItems[itemId]) {
  if (!item) return "選択";
  if (isShopItemActive(itemId)) return "利用中";
  if (isShopItemOwned(itemId)) return "利用";
  if (!canAffordShopItem(item)) return "コイン不足";
  return "購入";
}

function isShopActionEnabled(itemId, item = shopItems[itemId]) {
  if (!item || isShopItemActive(itemId)) return false;
  if (isShopItemOwned(itemId)) return true;
  return canAffordShopItem(item);
}

function getShopStatusText(itemId, item = shopItems[itemId]) {
  if (!item) return "";
  if (isShopItemActive(itemId)) return "利用中";
  if (isShopItemOwned(itemId)) return "購入済み";
  if (!canAffordShopItem(item)) return `あと ${item.cost - state.coins} coin`;
  return "未購入";
}

function renderShop() {
  shopList.innerHTML = "";

  Object.entries(shopItems).forEach(([id, item]) => {
    const card = document.createElement("div");
    const body = document.createElement("div");
    const icon = createItemIcon(item.iconClass);
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const meta = document.createElement("small");
    const status = document.createElement("span");
    const button = document.createElement("button");
    const owned = isShopItemOwned(id);
    const active = isShopItemActive(id);
    const canAfford = canAffordShopItem(item);

    card.className = "shop-item";
    card.classList.toggle("owned", owned);
    card.classList.toggle("active-use", active);
    card.classList.toggle("insufficient", !owned && !canAfford);
    title.textContent = item.name;
    description.textContent = item.description;
    meta.className = "shop-item-meta";
    meta.textContent = `${item.cost} coin ・ ${rarityLabels[item.rarity] || item.rarity}`;
    status.className = "shop-item-status";
    status.textContent = getShopStatusText(id, item);
    button.type = "button";
    button.className = "shop-action-btn";
    button.dataset.item = id;
    button.disabled = !isShopActionEnabled(id, item);
    setButtonLabel(button, getShopActionLabel(id, item), item.name);

    body.append(icon, title, description, meta, status);
    card.append(body, button);
    shopList.appendChild(card);
  });
}

function render() {
  const todayMinutes = getTodayMinutes();
  const dailyGoal = Math.max(5, Number(state.dailyGoalMinutes) || 60);
  const progress = Math.min(100, Math.round((todayMinutes / dailyGoal) * 100));

  coinCount.textContent = state.coins;
  todayTotal.textContent = `今日 ${todayMinutes}分`;
  totalStudy.textContent = `累計 ${state.totalMinutes}分`;
  dailyGoalInput.value = dailyGoal;
  dailyGoalStatus.textContent = `${todayMinutes} / ${dailyGoal}分`;
  dailyGoalMeter.value = progress;
  streakText.textContent = `連続学習 ${getStreakCount()}日`;

  renderPet();
  renderEquippedLook();
  renderInventory();
  renderShop();
  renderWardrobe();
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

  const actionClass = {
    feed: "eat",
    play: "fun",
    rest: "sleep",
  }[action];

  if (!actionClass) return;

  const expressionForAction = {
    feed: "happy",
    play: "excited",
    rest: "sleepy",
  }[action];

  petViews.forEach((view) => {
    view.prop.className = "pet-action-prop";
    view.prop.classList.add("active", action, iconClass);
  });
  applyMascotMotion(actionClass);

  if (expressionForAction) {
    showTemporaryOwlExpression(expressionForAction, {
      durationMs: action === "rest" ? 2600 : undefined,
      triggerType: action,
    });
  }

  animationTimer = setTimeout(() => {
    petViews.forEach((view) => {
      view.prop.className = "pet-action-prop";
    });
    applyMascotMotion("idle");
  }, 1300);
}

function setFocusMode(isRunning) {
  if (isRunning) {
    clearTimeout(expressionTimer);
    expressionTimer = null;
    expressionOverride = null;
    applyMascotMotion("idle");
  }

  petViews.forEach((view) => {
    view.pet.classList.toggle("focusing", isRunning);
    view.pet.closest(".pet-stage").classList.toggle("focus-mode", isRunning);
  });

  updateOwlExpression();
}

function switchScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenId);
  });

  if (screenId === "wardrobeScreen") renderWardrobe();
}

function finishTimerSession() {
  const minutes = Math.round(SESSION_SECONDS / 60);
  timerStatus.textContent = `完了 +${getEarnedCoins(minutes)} coin`;
  addStudySession(minutes, timerSubjectInput.value.trim() || "タイマー学習");
  timerSubjectInput.value = "";
  alert("学習完了！コインを獲得しました。");
}

startBtn.addEventListener("click", () => {
  if (timer !== null) return;

  timerStatus.textContent = "集中中";
  setFocusMode(true);
  timer = setInterval(() => {
    time--;
    updateDisplay();

    if (time <= 0) {
      clearInterval(timer);
      timer = null;
      time = SESSION_SECONDS;
      updateDisplay();
      setFocusMode(false);
      finishTimerSession();
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  if (timer === null) return;

  clearInterval(timer);
  timer = null;
  timerStatus.textContent = "一時停止中";
  setFocusMode(false);
  showTemporaryOwlExpression("sleepy", { durationMs: 2200, triggerType: "pause" });
});

resetBtn.addEventListener("click", () => {
  resetTimer();
  timerStatus.textContent = "待機中";
  setFocusMode(false);
});

timerRecordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const minutes = getElapsedTimerMinutes();

  if (minutes <= 0) {
    showTemporaryOwlExpression("neutral");
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

  if (!Number.isFinite(minutes) || minutes <= 0) {
    showTemporaryOwlExpression("neutral");
    return;
  }

  addStudySession(Math.round(minutes), subject);
  subjectInput.value = "";
  minutesInput.value = 25;
});

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const minutes = Number(dailyGoalInput.value);

  if (!Number.isFinite(minutes) || minutes < 5) {
    showTemporaryOwlExpression("neutral");
    return;
  }

  state.dailyGoalMinutes = Math.round(minutes);
  saveState();
  render();

  if (getTodayMinutes() >= state.dailyGoalMinutes) {
    showTemporaryOwlExpression("proud", { triggerType: "goal" });
  } else {
    showTemporaryOwlExpression("happy", { durationMs: 1800, triggerType: "goal-update" });
  }
});

document.querySelectorAll(".care-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const cost = careCosts[action];

    if (state.coins < cost) {
      showTemporaryOwlExpression("neutral");
      alert("コインが足りません。学習すると増えます。");
      return;
    }

    state.coins -= cost;
    applyItemEffect(careEffects[action]);
    triggerPetAnimation(action, {
      feed: "bowl-icon",
      play: "ball-icon",
      rest: "cushion-icon",
    }[action]);

    saveState();
    render();
  });
});

function purchaseShopItem(itemId) {
  const item = shopItems[itemId];

  if (!item) return;

  if (state.coins < item.cost) {
    showTemporaryOwlExpression("neutral");
    alert("コインが足りません。1分学習すると1コイン増えます。");
    renderShop();
    return;
  }

  state.coins -= item.cost;
  state.inventory[itemId] = Math.max(1, Number(state.inventory[itemId]) || 0);
  saveState();
  render();

  if (item.rarity === "rare") {
    showRareItemReaction();
  } else {
    showTemporaryOwlExpression("happy", { triggerType: "purchase" });
  }
}

function useShopItem(itemId) {
  const item = shopItems[itemId];

  if (!item || !isShopItemOwned(itemId) || isShopItemActive(itemId)) return;

  activeShopItemId = itemId;
  clearTimeout(shopUseTimer);
  applyItemEffect(item.effect);
  triggerPetAnimation(item.action, item.iconClass);
  saveState();
  render();

  shopUseTimer = setTimeout(() => {
    if (activeShopItemId !== itemId) return;
    activeShopItemId = null;
    renderShop();
    renderInventory();
  }, 1400);
}

function runShopAction(itemId) {
  if (!shopItems[itemId]) return;

  if (isShopItemOwned(itemId)) {
    useShopItem(itemId);
    return;
  }

  purchaseShopItem(itemId);
}

shopList.addEventListener("click", (event) => {
  const button = event.target.closest(".shop-action-btn");
  if (!button) return;

  runShopAction(button.dataset.item);
});

wardrobeTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".wardrobe-tab");
  if (!button) return;

  activeGearCategory = button.dataset.category || "all";
  renderWardrobe();
});

wardrobeGrid.addEventListener("click", (event) => {
  const actionButton = event.target.closest(".gear-action-btn");

  if (actionButton) {
    event.stopPropagation();
    runGearAction(actionButton.dataset.item);
    return;
  }

  const card = event.target.closest(".gear-card");
  if (!card) return;

  selectedGearItemId = card.dataset.item;
  renderWardrobe();
});

wardrobeActionBtn.addEventListener("click", () => {
  runGearAction(selectedGearItemId);
});

clearGearBtn.addEventListener("click", clearSelectedGearSlot);

inventoryList.addEventListener("click", (event) => {
  const button = event.target.closest(".use-item-btn");
  if (!button) return;

  const itemId = button.dataset.item;

  useShopItem(itemId);
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

["click", "keydown", "pointerdown"].forEach((eventName) => {
  document.addEventListener(eventName, resetInactivityTimer, { passive: true });
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    rememberSeen();
    return;
  }

  resetInactivityTimer();
  updateOwlExpression();
});

window.addEventListener("beforeunload", rememberSeen);

updateDisplay();
render();
applyMascotMotion(activeMascotMotion);
handleAppLaunch();
resetInactivityTimer();
