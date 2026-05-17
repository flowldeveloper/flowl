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
const shopConfirm = document.getElementById("shopConfirm");
const shopConfirmIcon = document.getElementById("shopConfirmIcon");
const shopConfirmName = document.getElementById("shopConfirmName");
const shopConfirmDescription = document.getElementById("shopConfirmDescription");
const shopConfirmCost = document.getElementById("shopConfirmCost");
const shopConfirmStatus = document.getElementById("shopConfirmStatus");
const confirmPurchaseBtn = document.getElementById("confirmPurchaseBtn");
const cancelPurchaseBtn = document.getElementById("cancelPurchaseBtn");
const shopList = document.getElementById("shopList");
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
let selectedShopItemId = null;

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

function renderInventory() {
  inventoryList.innerHTML = "";
  const ownedItems = Object.entries(shopItems).filter(([id]) => state.inventory[id] > 0);

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
    label.textContent = `${item.name} x${state.inventory[id]}`;
    button.append(icon, label);
    inventoryList.appendChild(button);
  });
}

function renderShopConfirmation() {
  const item = shopItems[selectedShopItemId];

  if (!item) {
    shopConfirm.hidden = true;
    shopConfirmIcon.innerHTML = "";
    shopConfirmStatus.textContent = "";
    return;
  }

  const canAfford = state.coins >= item.cost;
  const shortage = Math.max(0, item.cost - state.coins);

  shopConfirm.hidden = false;
  shopConfirm.classList.toggle("shop-confirm-insufficient", !canAfford);
  shopConfirmIcon.innerHTML = "";
  shopConfirmIcon.appendChild(createItemIcon(item.iconClass));
  shopConfirmName.textContent = item.name;
  shopConfirmDescription.textContent = item.description;
  shopConfirmCost.textContent = `${item.cost} coin ・ 所持 ${state.coins} coin`;
  shopConfirmStatus.textContent = canAfford
    ? "購入できます。購入するともちものに入ります。"
    : `あと ${shortage} coin で購入できます。`;
  confirmPurchaseBtn.disabled = !canAfford;
  confirmPurchaseBtn.textContent = canAfford ? "購入する" : "コイン不足";
}

function renderShop() {
  shopList.innerHTML = "";

  Object.entries(shopItems).forEach(([id, item]) => {
    const card = document.createElement("div");
    const body = document.createElement("div");
    const icon = createItemIcon(item.iconClass);
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const button = document.createElement("button");

    card.className = "shop-item";
    card.classList.toggle("selected", selectedShopItemId === id);
    title.textContent = item.name;
    description.textContent = item.description;
    button.type = "button";
    button.className = "confirm-item-btn";
    button.dataset.item = id;
    button.setAttribute("aria-pressed", String(selectedShopItemId === id));
    button.textContent = `${item.cost} coinを確認`;

    body.append(icon, title, description);
    card.append(body, button);
    shopList.appendChild(card);
  });

  renderShopConfirmation();
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
  renderInventory();
  renderShop();
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

function selectShopItem(itemId) {
  if (!shopItems[itemId]) return;

  selectedShopItemId = itemId;
  renderShop();
  showTemporaryOwlExpression("happy", { durationMs: 1200, triggerType: "shop-confirm" });

  requestAnimationFrame(() => {
    shopConfirm.scrollIntoView({ behavior: "smooth", block: "start" });
    confirmPurchaseBtn.focus({ preventScroll: true });
  });
}

function purchaseSelectedShopItem() {
  const item = shopItems[selectedShopItemId];

  if (!item) return;

  if (state.coins < item.cost) {
    showTemporaryOwlExpression("neutral");
    alert("コインが足りません。1分学習すると1コイン増えます。");
    renderShopConfirmation();
    return;
  }

  state.coins -= item.cost;
  state.inventory[selectedShopItemId] = (state.inventory[selectedShopItemId] || 0) + 1;
  selectedShopItemId = null;
  saveState();
  render();

  if (item.rarity === "rare") {
    showRareItemReaction();
  } else {
    showTemporaryOwlExpression("happy", { triggerType: "purchase" });
  }
}

shopList.addEventListener("click", (event) => {
  const button = event.target.closest(".confirm-item-btn");
  if (!button) return;

  selectShopItem(button.dataset.item);
});

confirmPurchaseBtn.addEventListener("click", purchaseSelectedShopItem);

cancelPurchaseBtn.addEventListener("click", () => {
  selectedShopItemId = null;
  renderShop();
  showTemporaryOwlExpression("normal", { durationMs: 900, triggerType: "shop-cancel" });
});

inventoryList.addEventListener("click", (event) => {
  const button = event.target.closest(".use-item-btn");
  if (!button) return;

  const itemId = button.dataset.item;
  const item = shopItems[itemId];

  if (!state.inventory[itemId]) return;

  state.inventory[itemId] -= 1;
  applyItemEffect(item.effect);
  triggerPetAnimation(item.action, item.iconClass);
  saveState();
  render();
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
