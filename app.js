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
  cloverCape: {
    name: "若葉ブローチ",
    description: "胸元に小さく留まる、動きに強い若葉のアクセサリー。",
    cost: 18,
    type: "outfit",
    rarity: "common",
    iconClass: "leaf-pin-icon",
  },
  acornBeret: {
    name: "どんぐりベレー",
    description: "Flowletが少し得意げになる秋色の帽子。",
    cost: 34,
    type: "outfit",
    rarity: "rare",
    iconClass: "beret-icon",
  },
  starScarf: {
    name: "星のヘアピン",
    description: "頭にそっと光る、集中中もずれにくい特別なピン。",
    cost: 62,
    type: "outfit",
    rarity: "epic",
    iconClass: "star-pin-icon",
  },
  leafDesk: {
    name: "若葉の机",
    description: "背景に置ける、勉強部屋用の小さな机。",
    cost: 24,
    type: "decor",
    rarity: "common",
    iconClass: "leaf-room-icon",
  },
  studyLamp: {
    name: "まどろみランプ",
    description: "動物画面にあたたかい灯りを足します。",
    cost: 46,
    type: "decor",
    rarity: "rare",
    iconClass: "lamp-icon",
  },
  morningForest: {
    name: "朝の森",
    description: "眺めるだけで少し落ち着く森の背景。",
    cost: 52,
    type: "background",
    rarity: "rare",
    iconClass: "forest-bg-icon",
  },
  moonLibrary: {
    name: "月夜の図書室",
    description: "静かな夜に似合う、レアな背景テーマ。",
    cost: 88,
    type: "background",
    rarity: "epic",
    iconClass: "library-bg-icon",
  },
};

const rarityLabels = {
  common: "N",
  rare: "R",
  epic: "SR",
};

const itemTypeLabels = {
  outfit: "服",
  decor: "飾り",
  background: "背景",
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
      outfit: null,
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
    customization: {
      ...defaults.customization,
      ...savedState.customization,
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

function isItemEquipped(itemId) {
  const item = shopItems[itemId];
  return Boolean(item && state.customization[item.type] === itemId);
}

function equipItem(itemId) {
  const item = shopItems[itemId];

  if (!item || !state.inventory[itemId]) return false;

  if (state.customization[item.type] === itemId) {
    state.customization[item.type] = null;
    return false;
  }

  state.customization[item.type] = itemId;
  return true;
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
  const unlocked = getUnlockedRewards();
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
    view.pet.dataset.outfit = state.customization.outfit || "";

    const stageElement = view.pet.closest(".pet-stage");
    stageElement.classList.toggle("has-room-decor", unlocked.length >= 2);
    stageElement.classList.toggle("has-forest-bg", unlocked.length >= 3);
    stageElement.dataset.time = getTimePeriod();

    if (state.customization.decor) {
      stageElement.dataset.decor = state.customization.decor;
    } else {
      delete stageElement.dataset.decor;
    }

    if (state.customization.background) {
      stageElement.dataset.background = state.customization.background;
    } else {
      delete stageElement.dataset.background;
    }
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

    button.type = "button";
    button.className = "use-item-btn";
    button.dataset.item = id;
    label.className = "item-name";
    meta.className = "item-meta";
    label.textContent = item.name;
    meta.textContent = isItemEquipped(id)
      ? "装備中 / タップで外す"
      : `${itemTypeLabels[item.type]} / ${rarityLabels[item.rarity]} / タップで装備`;
    button.classList.toggle("equipped", isItemEquipped(id));
    button.append(icon, label, meta);
    inventoryList.appendChild(button);
  });
}

function renderShop() {
  shopList.innerHTML = "";

  Object.entries(shopItems).forEach(([id, item]) => {
    const card = document.createElement("div");
    const body = document.createElement("div");
    const icon = createItemIcon(item.iconClass);
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const meta = document.createElement("div");
    const type = document.createElement("span");
    const rarity = document.createElement("span");
    const button = document.createElement("button");
    const isOwned = state.inventory[id] > 0;
    const isEquipped = isItemEquipped(id);

    card.className = `shop-item rarity-${item.rarity}`;
    title.textContent = item.name;
    description.textContent = item.description;
    meta.className = "shop-meta";
    type.className = "type-badge";
    rarity.className = `rarity-badge rarity-${item.rarity}`;
    type.textContent = itemTypeLabels[item.type];
    rarity.textContent = rarityLabels[item.rarity];
    button.type = "button";
    button.className = "buy-item-btn";
    button.dataset.item = id;
    button.textContent = isEquipped
      ? "外す"
      : isOwned
        ? "装備する"
        : `${item.cost} coinで買う`;

    meta.append(type, rarity);
    body.append(icon, meta, title, description);
    card.append(body, button);
    shopList.appendChild(card);
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

  petViews.forEach((view) => {
    view.prop.className = "pet-action-prop";
    view.prop.classList.add("active", action, iconClass);
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

shopList.addEventListener("click", (event) => {
  const button = event.target.closest(".buy-item-btn");
  if (!button) return;

  const itemId = button.dataset.item;
  const item = shopItems[itemId];
  if (!item) return;

  const isOwned = state.inventory[itemId] > 0;

  if (isOwned) {
    const equipped = equipItem(itemId);
    if (equipped && item.type === "outfit") {
      triggerPetAnimation("play", item.iconClass);
    }
    saveState();
    render();
    return;
  }

  if (state.coins < item.cost) {
    alert("コインが足りません。1分学習すると1コイン増えます。");
    return;
  }

  state.coins -= item.cost;
  state.inventory[itemId] = 1;
  const equipped = equipItem(itemId);
  if (equipped && item.type === "outfit") {
    triggerPetAnimation("play", item.iconClass);
  }
  saveState();
  render();
});

inventoryList.addEventListener("click", (event) => {
  const button = event.target.closest(".use-item-btn");
  if (!button) return;

  const itemId = button.dataset.item;
  const item = shopItems[itemId];
  if (!item) return;

  if (!state.inventory[itemId]) return;

  const equipped = equipItem(itemId);
  if (equipped && item.type === "outfit") {
    triggerPetAnimation("play", item.iconClass);
  }
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

grantLoginBonus();
grantIdleReward();
grantLevelRewards();
saveState();
updateDisplay();
render();
applyMascotMotion(activeMascotMotion);
