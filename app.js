const STORAGE_KEY = "flowl-study-pet";
const STORAGE_VERSION = 2;
const ANALYTICS_CONSENT_KEY = window.FLOWL_ANALYTICS_CONSENT_KEY || "flowl-analytics-consent";
const ANALYTICS_APP_VERSION = "pwa-30";
const STUDY_TANK_CAPACITY_MINUTES = 10;
const DAILY_STUDY_LIMIT_MINUTES = 24 * 60;
const STUDY_TANK_MIN_ANIMATION_MS = 800;
const STUDY_TANK_MAX_ANIMATION_MS = 10000;
const STUDY_TANK_MIN_ANIMATION_MINUTES = 10;
const MAX_STORED_SESSIONS = 5000;
const WEEKLY_SUBJECT_COLORS = [
  "#4f9d69",
  "#4f86c6",
  "#d7972f",
  "#c7607c",
  "#7868bd",
  "#2f9b98",
  "#d06f45",
  "#718e3f",
  "#8b6f47",
  "#5f73cf",
  "#d08db5",
  "#4ba7c7",
  "#b37d2d",
  "#7b9b68",
  "#b85b50",
  "#637f99",
  "#9a6bb1",
  "#2e8b6d",
];
const ANALYTICS_SCREEN_NAMES = { timerScreen: "study", logScreen: "log", careScreen: "care", shopScreen: "shop" };
const STORAGE_BACKUP_KEY = `${STORAGE_KEY}:backup`;
const STORAGE_LAST_GOOD_KEY = `${STORAGE_KEY}:last-good`;
const STORAGE_TEMP_KEY = `${STORAGE_KEY}:temp`;
const STORAGE_META_KEY = `${STORAGE_KEY}:meta`;
const STORAGE_CORRUPT_PREFIX = `${STORAGE_KEY}:corrupt`;
const STORAGE_TEST_KEY = `${STORAGE_KEY}:storage-test`;
const APP_NAME = "Flowl";
const FLOWL_PUBLIC_URL = "https://flowldeveloper.github.io/flowl/";
const TIMER_MAX_SECONDS = 12 * 60 * 60;
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
    name: "ふわふわスカーフ",
    category: "clothing",
    rarity: "common",
    price: 60,
    description: "首元だけをやさしく飾る、最初に買いやすい服。",
    iconClass: "clothing-icon rarity-icon-common",
    assetClass: "wear-simple-scarf",
    layer: "clothing",
    anchor: "neck",
    offsetX: 0,
    offsetY: 3,
    scale: 1,
    rotation: 0,
  },
  studyVest: {
    name: "若葉の勉強ベスト",
    category: "clothing",
    rarity: "uncommon",
    price: 160,
    description: "勉強モードに似合う、控えめな若葉色のベスト。",
    iconClass: "clothing-icon rarity-icon-uncommon",
    assetClass: "wear-study-vest",
    layer: "clothing",
    anchor: "body",
    offsetX: 0,
    offsetY: 5,
    scale: 1.05,
    rotation: 0,
  },
  scholarRobe: {
    name: "学者ローブ",
    category: "clothing",
    rarity: "rare",
    price: 420,
    description: "本の刺繍が入った、特別感のあるローブ。",
    iconClass: "clothing-icon rarity-icon-rare",
    assetClass: "wear-scholar-robe",
    layer: "clothing",
    anchor: "body",
    offsetX: 0,
    offsetY: 7,
    scale: 1.06,
    rotation: 0,
  },
  starMantle: {
    name: "星柄マント",
    category: "clothing",
    rarity: "epic",
    price: 900,
    description: "星模様がきらめく、夜の集中に似合うマント。",
    iconClass: "clothing-icon rarity-icon-epic",
    assetClass: "wear-star-mantle",
    layer: "clothing",
    anchor: "body",
    offsetX: 0,
    offsetY: 7,
    scale: 1.08,
    rotation: 0,
  },
  sageRobe: {
    name: "光る賢者ローブ",
    category: "clothing",
    rarity: "legendary",
    price: 2200,
    description: "淡い光をまとった、長く続けた証になる特別な服。",
    iconClass: "clothing-icon rarity-icon-legendary",
    assetClass: "wear-sage-robe",
    layer: "clothing",
    anchor: "body",
    offsetX: 0,
    offsetY: 7,
    scale: 1.08,
    rotation: 0,
  },
  pagePoncho: {
    name: "しおりポンチョ",
    category: "clothing",
    rarity: "rare",
    price: 520,
    description: "本のしおりをイメージした、勉強気分が上がるポンチョ。",
    iconClass: "clothing-icon rarity-icon-rare",
    assetClass: "wear-page-poncho",
    layer: "clothing",
    anchor: "body",
    offsetX: 0,
    offsetY: 5,
    scale: 1.06,
    rotation: 0,
  },
  auroraCloak: {
    name: "オーロラ集中クローク",
    category: "clothing",
    rarity: "legendary",
    price: 2800,
    description: "淡い光の層が重なる、最高レアの集中クローク。",
    iconClass: "clothing-icon rarity-icon-legendary",
    assetClass: "wear-aurora-cloak",
    layer: "clothing",
    anchor: "body",
    offsetX: 0,
    offsetY: 7,
    scale: 1.08,
    rotation: 0,
  },
  cloverCape: {
    name: "若葉ブローチ",
    category: "accessory",
    accessorySlot: "neck",
    rarity: "common",
    price: 60,
    description: "胸元に小さく留まる、動きに強い若葉のアクセサリー。",
    iconClass: "accessory-icon rarity-icon-common",
    assetClass: "wear-leaf-brooch",
    layer: "neck",
    anchor: "neck",
    offsetX: 13,
    offsetY: 9,
    scale: 0.82,
    rotation: -8,
  },
  acornBeret: {
    name: "森色ベレー",
    category: "accessory",
    accessorySlot: "head",
    rarity: "rare",
    price: 420,
    description: "Flowletが少し得意げになる秋色の帽子。",
    iconClass: "accessory-icon rarity-icon-rare",
    assetClass: "wear-acorn-beret",
    layer: "head",
    anchor: "head",
    offsetX: -4,
    offsetY: -4,
    scale: 0.96,
    rotation: -4,
  },
  starScarf: {
    name: "星のヘアピン",
    category: "accessory",
    accessorySlot: "head",
    rarity: "epic",
    price: 900,
    description: "頭にそっと光る、集中中もずれにくい特別なピン。",
    iconClass: "accessory-icon rarity-icon-epic",
    assetClass: "wear-star-pin",
    layer: "head",
    anchor: "head",
    offsetX: 18,
    offsetY: 4,
    scale: 0.72,
    rotation: 12,
  },
  studyPencil: {
    name: "小さな鉛筆",
    category: "accessory",
    accessorySlot: "hand",
    rarity: "uncommon",
    price: 160,
    description: "羽の近くに持たせる、勉強アプリらしい小さな鉛筆。",
    iconClass: "accessory-icon rarity-icon-uncommon",
    assetClass: "wear-study-pencil",
    layer: "hand",
    anchor: "hand",
    offsetX: -4,
    offsetY: 5,
    scale: 0.88,
    rotation: -22,
  },
  smallRibbon: {
    name: "小さなリボン",
    category: "accessory",
    accessorySlot: "head",
    rarity: "uncommon",
    price: 160,
    description: "頭にちょこんと乗る、やさしい黄色のリボン。",
    iconClass: "accessory-icon rarity-icon-uncommon",
    assetClass: "wear-small-ribbon",
    layer: "head",
    anchor: "head",
    offsetX: -18,
    offsetY: 3,
    scale: 0.78,
    rotation: -8,
  },
  quillHat: {
    name: "羽ペン付き帽子",
    category: "accessory",
    accessorySlot: "head",
    rarity: "rare",
    price: 520,
    description: "学者気分が上がる、羽ペン付きの帽子。",
    iconClass: "accessory-icon rarity-icon-rare",
    assetClass: "wear-quill-hat",
    layer: "head",
    anchor: "head",
    offsetX: 0,
    offsetY: -4,
    scale: 0.96,
    rotation: 0,
  },
  moonPin: {
    name: "月の髪飾り",
    category: "accessory",
    accessorySlot: "head",
    rarity: "epic",
    price: 950,
    description: "月の光がほんのり浮かぶ、夜学習のアクセサリー。",
    iconClass: "accessory-icon rarity-icon-epic",
    assetClass: "wear-moon-pin",
    layer: "head",
    anchor: "head",
    offsetX: 19,
    offsetY: 5,
    scale: 0.78,
    rotation: 10,
  },
  glowingCrown: {
    name: "星読みの王冠",
    category: "accessory",
    accessorySlot: "head",
    rarity: "legendary",
    price: 2200,
    description: "一目で特別と分かる、光をまとった王冠。",
    iconClass: "accessory-icon rarity-icon-legendary",
    assetClass: "wear-glowing-crown",
    layer: "head",
    anchor: "head",
    offsetX: 0,
    offsetY: -7,
    scale: 0.9,
    rotation: 0,
  },
  bookCharm: {
    name: "小さな本チャーム",
    category: "accessory",
    accessorySlot: "neck",
    rarity: "rare",
    price: 480,
    description: "胸元で小さな本が揺れる、勉強アプリらしいチャーム。",
    iconClass: "accessory-icon rarity-icon-rare",
    assetClass: "wear-book-charm",
    layer: "neck",
    anchor: "neck",
    offsetX: -8,
    offsetY: 12,
    scale: 0.84,
    rotation: 7,
  },
  starOrbit: {
    name: "星めぐりオーラ",
    category: "accessory",
    accessorySlot: "face",
    rarity: "legendary",
    price: 2500,
    description: "顔まわりに小さな星がめぐる、最高レアの前面アクセサリー。",
    iconClass: "accessory-icon rarity-icon-legendary",
    assetClass: "wear-star-orbit",
    layer: "face",
    anchor: "face",
    offsetX: 0,
    offsetY: 0,
    scale: 1.02,
    rotation: 0,
  },
  woodenDesk: {
    name: "小さな木の机",
    category: "furniture",
    rarity: "common",
    price: 70,
    description: "背景に置ける、素朴な勉強机。",
    iconClass: "furniture-icon rarity-icon-common",
    assetClass: "furniture-wooden-desk",
  },
  studyPlant: {
    name: "観葉植物",
    category: "furniture",
    rarity: "uncommon",
    price: 170,
    description: "部屋にやわらかい緑を足す小さな植物。",
    iconClass: "furniture-icon rarity-icon-uncommon",
    assetClass: "furniture-study-plant",
  },
  bookShelf: {
    name: "本棚",
    category: "furniture",
    rarity: "rare",
    price: 480,
    description: "勉強部屋らしさがはっきり出る本棚。",
    iconClass: "furniture-icon rarity-icon-rare",
    assetClass: "furniture-book-shelf",
  },
  studyLamp: {
    name: "星明かりランプ",
    category: "furniture",
    rarity: "epic",
    price: 950,
    description: "動物画面にあたたかい灯りを足します。",
    iconClass: "furniture-icon rarity-icon-epic",
    assetClass: "furniture-magic-lamp",
  },
  floatingBooks: {
    name: "浮かぶ本の書斎セット",
    category: "furniture",
    rarity: "legendary",
    price: 2200,
    description: "ページがふわっと浮かぶ、特別な書斎セット。",
    iconClass: "furniture-icon rarity-icon-legendary",
    assetClass: "furniture-floating-books",
  },
  starlightStudySet: {
    name: "星読み天体儀",
    category: "furniture",
    rarity: "legendary",
    price: 2800,
    description: "星と月の動きを眺める、知的で幻想的な天体儀。",
    iconClass: "furniture-icon rarity-icon-legendary",
    assetClass: "furniture-celestial-globe",
  },
  simpleRoom: {
    name: "シンプルな部屋",
    category: "background",
    rarity: "common",
    price: 80,
    description: "どんな衣装にも合う、落ち着いた部屋背景。",
    iconClass: "background-icon rarity-icon-common",
    assetClass: "background-simple-room",
  },
  focusRoom: {
    name: "あたたかい勉強部屋",
    category: "background",
    rarity: "uncommon",
    price: 180,
    description: "机と本の雰囲気がある、集中しやすい背景。",
    iconClass: "background-icon rarity-icon-uncommon",
    assetClass: "background-focus-room",
  },
  morningForest: {
    name: "朝の森",
    category: "background",
    rarity: "rare",
    price: 420,
    description: "眺めるだけで少し落ち着く森の背景。",
    iconClass: "background-icon rarity-icon-rare",
    assetClass: "background-morning-forest",
  },
  libraryStudy: {
    name: "静かな図書館",
    category: "background",
    rarity: "rare",
    price: 520,
    description: "静かな読書机のある、少し特別な図書館背景。",
    iconClass: "background-icon rarity-icon-rare",
    assetClass: "background-library-study",
  },
  moonLibrary: {
    name: "星明かりの書斎",
    category: "background",
    rarity: "epic",
    price: 950,
    description: "静かな夜に似合う、レアな背景テーマ。",
    iconClass: "background-icon rarity-icon-epic",
    assetClass: "background-moon-library",
  },
  starMagicLibrary: {
    name: "星降る魔法図書館",
    category: "background",
    rarity: "legendary",
    price: 2400,
    description: "星が降る、長く続けた人向けの特別な背景。",
    iconClass: "background-icon rarity-icon-legendary",
    assetClass: "background-star-library",
  },
  rainyWindowRoom: {
    name: "雨音の読書部屋",
    category: "background",
    rarity: "uncommon",
    price: 240,
    description: "静かな雨音を感じる、落ち着いた読書部屋。",
    iconClass: "background-icon rarity-icon-uncommon",
    assetClass: "background-rainy-room",
  },
  celestialArchive: {
    name: "星界アーカイブ",
    category: "background",
    rarity: "legendary",
    price: 3000,
    description: "星の記録が浮かぶ、最高レアの魔法図書館背景。",
    iconClass: "background-icon rarity-icon-legendary",
    assetClass: "background-celestial-archive",
  },
  springPark: {
    name: "春風の公園",
    category: "background",
    rarity: "uncommon",
    price: 220,
    description: "桜色の空と若葉が広がる春の背景。",
    iconClass: "background-icon rarity-icon-uncommon",
    assetClass: "background-spring-park",
  },
  summerSeaside: {
    name: "夏の海辺",
    category: "background",
    rarity: "rare",
    price: 540,
    description: "青い海と白い建物が見える、開放的な海辺背景。",
    iconClass: "background-icon rarity-icon-rare",
    assetClass: "background-summer-seaside",
  },
  autumnTown: {
    name: "秋色の町",
    category: "background",
    rarity: "rare",
    price: 560,
    description: "紅葉と石畳が見える、観光地風の町背景。",
    iconClass: "background-icon rarity-icon-rare",
    assetClass: "background-autumn-town",
  },
  winterSnowCountry: {
    name: "冬の雪国",
    category: "background",
    rarity: "rare",
    price: 580,
    description: "雪の家並みと白い地面が広がる冬背景。",
    iconClass: "background-icon rarity-icon-rare",
    assetClass: "background-winter-snow",
  },
  desertOasis: {
    name: "砂漠のオアシス",
    category: "background",
    rarity: "epic",
    price: 980,
    description: "砂丘と小さな水辺が印象的な気候系背景。",
    iconClass: "background-icon rarity-icon-epic",
    assetClass: "background-desert-oasis",
  },
  japaneseTown: {
    name: "和風の小路",
    category: "background",
    rarity: "epic",
    price: 1050,
    description: "格子窓と石畳が並ぶ、落ち着いた和風町背景。",
    iconClass: "background-icon rarity-icon-epic",
    assetClass: "background-japanese-town",
  },
  thunderSky: {
    name: "雷雲の夜",
    category: "background",
    rarity: "epic",
    price: 1120,
    description: "稲妻と濃い雲が走る、天気系の迫力ある背景。",
    iconClass: "background-icon rarity-icon-epic",
    assetClass: "background-thunder-sky",
  },
  floatingIsland: {
    name: "雲上の浮遊島",
    category: "background",
    rarity: "legendary",
    price: 2600,
    description: "雲の上に小さな島が浮かぶ、特別な幻想背景。",
    iconClass: "background-icon rarity-icon-legendary",
    assetClass: "background-floating-island",
  },
  underwaterTemple: {
    name: "水中神殿",
    category: "background",
    rarity: "legendary",
    price: 2800,
    description: "泡と光の柱がゆれる、別世界のような背景。",
    iconClass: "background-icon rarity-icon-legendary",
    assetClass: "background-underwater-temple",
  },
};

const rarityLabels = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

const rarityOrder = ["common", "uncommon", "rare", "epic", "legendary"];

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
const removedItemIds = ["leafDesk", "moonDeskSet"];
const equipmentAnchors = {
  center: { x: 50, y: 50 },
  body: { x: 50, y: 62 },
  face: { x: 50, y: 41 },
  head: { x: 50, y: 25 },
  neck: { x: 50, y: 53 },
  hand: { x: 35, y: 63 },
  effect: { x: 50, y: 43 },
};

const mascotMotions = ["idle", "headTilt", "eat", "happy", "angry", "sad", "fun", "sleep"];
const owlMotionStateIds = ["veryHappy", "energetic", "normal", "hungry", "bored", "lowEnergy"];
const owlMotionStateClasses = owlMotionStateIds.map((id) => `owl-motion-${id}`);
const owlExpressionStateIds = ["sparkly", "happy", "content", "hungryLoved", "lonely", "low", "normal"];
const owlExpressionClasses = owlExpressionStateIds.map((id) => `owl-expression-${id}`);

const growthStages = [
  { id: "egg", name: "たまご", min: 0, next: 10, nextName: "ひな" },
  { id: "baby", name: "ひな", min: 10, next: 60, nextName: "こども" },
  { id: "child", name: "こども", min: 60, next: 180, nextName: "成長後" },
  { id: "grown", name: "成長後", min: 180, next: null, nextName: "" },
];
const STARTING_GROWTH_MINUTES = growthStages.find((stage) => stage.id === "grown")?.min || 0;

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

const encouragementMessages = {
  short: [
    "少しだけでも始めたの、ちゃんと意味あるよ。",
    "まず始めたことがすごいよ。Flowletも見てたよ。",
    "今日は短めでも大丈夫。続けようとしたことが大事だよ。",
  ],
  light: [
    "いい集中だったね。今日もちゃんと進められたよ。",
    "小さな一歩、ちゃんと積み重なってるよ。",
    "その集中、Flowletにも届いてるよ。",
  ],
  steady: [
    "{subject}を{minutes}分も集中できたね。よくがんばったよ。",
    "しっかり向き合えたね。{subject}の時間、ちゃんと積み上がったよ。",
    "{subject}をここまで進めたの、すごくいい流れだよ。",
  ],
  long: [
    "かなり頑張ったね。Flowletも誇らしそうにしてるよ。",
    "{minutes}分も集中できたね。今日は大きく前に進んだよ。",
    "長めに向き合えたね。その粘り、ちゃんと力になってるよ。",
  ],
  huge: [
    "すごい集中力！今日は大きく成長したね。",
    "{minutes}分、本当におつかれさま。Flowletが胸を張ってるよ。",
    "ここまで集中できたの、すごいよ。今日はゆっくり休んでもいいくらい。",
  ],
  improvement: [
    "前回より{diff}分長くできたね。小さな成長、ちゃんと見てるよ。",
    "前より少し長く続いたね。その伸び方、すごくいいよ。",
  ],
  streak: [
    "連続{streak}日達成！いい習慣になってきたね。",
    "今日も続けられたね。連続{streak}日、Flowletもうれしいよ。",
  ],
  streakMilestone: [
    "連続{streak}日！本当にすごい。ちゃんと習慣になってるよ。",
    "ここまで続けたの、えらいよ。Flowletも毎日待ってたよ。",
  ],
  subjectHabit: [
    "今週は{subject}が続いてるね。習慣になってきてるよ。",
    "{subject}に何度も向き合ってるね。その積み重ね、強いよ。",
  ],
  todayGoal: [
    "今日の{goal}分ラインに届いたね。小さな目標、ちゃんと越えたよ。",
    "今日は合計{goal}分まで進めたよ。Flowletもそっと拍手してるよ。",
  ],
  careHigh: [
    "満腹度も好感度もいい感じ。Flowletがうれしそうに近づいてきたよ。",
    "Flowlet、今日はとてもごきげんみたい。いっしょに進めてうれしいね。",
  ],
  careLow: [
    "Flowletは少し眠そうだけど、君が来てくれて安心してるよ。",
    "ゆっくりで大丈夫。Flowletもそばで見守ってるよ。",
  ],
  welcomeBack: [
    "久しぶり。戻ってきてくれてうれしいよ。また少しずつで大丈夫。",
    "おかえり。今日ここを開いたことから、もう一歩始まってるよ。",
  ],
  welcomeToday: [
    "今日も来てくれたんだね。Flowletもうれしいよ。",
    "おかえり。今日はどんな一歩にしようか。",
  ],
};

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const timerRecordForm = document.getElementById("timerRecordForm");
const timerSubjectInput = document.getElementById("timerSubjectInput");
const timerStatus = document.getElementById("timerStatus");
const studyModeButtons = document.querySelectorAll("[data-study-mode]");
const timerDurationSetting = document.getElementById("timerDurationSetting");
const timerDurationBtn = document.getElementById("timerDurationBtn");
const coinCount = document.getElementById("coinCount");
const studyForm = document.getElementById("studyForm");
const subjectInput = document.getElementById("subjectInput");
const subjectOptions = document.getElementById("subjectOptions");
const subjectTags = document.getElementById("subjectTags");
const timerSubjectMenu = document.getElementById("timerSubjectMenu");
const subjectMenu = document.getElementById("subjectMenu");
const bottomNav = document.querySelector(".bottom-nav");
const minutesInput = document.getElementById("minutesInput");
const manualDurationBtn = document.getElementById("manualDurationBtn");
const studyDateInput = document.getElementById("studyDateInput");
const todayTotal = document.getElementById("todayTotal");
const totalStudy = document.getElementById("totalStudy");
const allTimeStudyTotal = document.getElementById("allTimeStudyTotal");
const historyList = document.getElementById("historyList");
const weekTotal = document.getElementById("weekTotal");
const weekLabel = document.getElementById("weekLabel");
const weekChart = document.getElementById("weekChart");
const weekLegend = document.getElementById("weekLegend");
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
const petLevel = document.getElementById("petLevel");
const petCareLevel = document.getElementById("petCareLevel");
const streakCount = document.getElementById("streakCount");
const todayReward = document.getElementById("todayReward");
const studyTank = document.getElementById("studyTank");
const studyTankVessel = document.getElementById("studyTankVessel");
const studyTankFill = document.getElementById("studyTankFill");
const studyTankStatus = document.getElementById("studyTankStatus");
const studyTankMessage = document.getElementById("studyTankMessage");
const studyTankReward = document.getElementById("studyTankReward");
const studyTankRewardClose = document.getElementById("studyTankRewardClose");
const studyTankRewardVessel = document.getElementById("studyTankRewardVessel");
const studyTankRewardFill = document.getElementById("studyTankRewardFill");
const studyTankRewardLevel = document.getElementById("studyTankRewardLevel");
const studyTankRewardMinutes = document.getElementById("studyTankRewardMinutes");
const studyTankRewardCombo = document.getElementById("studyTankRewardCombo");
const studyTankRewardTitle = document.getElementById("studyTankRewardTitle");
const studyTankRewardMessage = document.getElementById("studyTankRewardMessage");
const studyTankRewardCoins = document.getElementById("studyTankRewardCoins");
const growthStageLabel = document.getElementById("growthStageLabel");
const growthNextLabel = document.getElementById("growthNextLabel");
const growthProgress = document.getElementById("growthProgress");
const levelRewardStatus = document.getElementById("levelRewardStatus");
const nextLevelReward = document.getElementById("nextLevelReward");
const petMessage = document.getElementById("petMessage");
const unlockCount = document.getElementById("unlockCount");
const unlockList = document.getElementById("unlockList");
const studyReaction = document.getElementById("studyReaction");
const durationPicker = document.getElementById("durationPicker");
const durationPickerTitle = document.getElementById("durationPickerTitle");
const durationPickerValue = document.getElementById("durationPickerValue");
const durationHourWheel = document.getElementById("durationHourWheel");
const durationMinuteWheel = document.getElementById("durationMinuteWheel");
const durationCancelBtn = document.getElementById("durationCancelBtn");
const durationConfirmBtn = document.getElementById("durationConfirmBtn");
const shareCardPreview = document.getElementById("shareCardPreview");
const shareHeadline = document.getElementById("shareHeadline");
const sharePraise = document.getElementById("sharePraise");
const shareToday = document.getElementById("shareToday");
const shareWeek = document.getElementById("shareWeek");
const shareLevel = document.getElementById("shareLevel");
const shareOutfit = document.getElementById("shareOutfit");
const shareBackground = document.getElementById("shareBackground");
const sharePetStage = document.getElementById("sharePetStage");
const sharePet = document.getElementById("sharePet");
const shareToXBtn = document.getElementById("shareToXBtn");
const shareStatus = document.getElementById("shareStatus");
const analyticsConsent = document.getElementById("analyticsConsent");
const analyticsAcceptBtn = document.getElementById("analyticsAcceptBtn");
const analyticsDeclineBtn = document.getElementById("analyticsDeclineBtn");
const analyticsSettingsBtn = document.getElementById("analyticsSettingsBtn");

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

const subjectFields = [
  { input: timerSubjectInput, menu: timerSubjectMenu },
  { input: subjectInput, menu: subjectMenu },
].map((field) => ({
  ...field,
  toggle: field.input?.closest(".subject-field")?.querySelector(".subject-toggle") || null,
})).filter(({ input, menu }) => input && menu);

const storageStatus = getLocalStorageStatus();
let time = 0;
let timer = null;
let state = loadState();
let analyticsSessionTracked = false;
let studyTankAnimationFrame = null;
let studyTankResetTimer = null;
let studyTankPulseTimer = null;
let studyTankAnimationToken = 0;
let studyTankAnimating = false;
let studyTankRewardAnimationFrame = null;
let studyTankRewardCloseTimer = null;
let studyTankRewardHideTimer = null;
let studyTankRewardToken = 0;
let animationTimer = null;
let timerBeatId = 0;
let studyReactionTimer = null;
let studyReactionMoodTimer = null;
let studyMode = "timer";
let timerTargetSeconds = 25 * 60;
let manualStudyMinutes = 25;
let durationPickerState = null;
let weekOffset = 0;
let activeMascotMotion = "idle";
let activeSubjectInput = null;
let selectedShopItemId = null;
let selectedShopCategory = shopCategoryOrder[0];
let flowlAudioContext = null;
let flowlAudioPrimed = false;
let lastTankSoundAt = 0;
let lastTankFullSoundAt = 0;
let lastTankRewardPulseAt = 0;

function getFlowlAudioContext() {
  if (flowlAudioContext?.state === "closed") {
    flowlAudioContext = null;
    flowlAudioPrimed = false;
  }

  if (flowlAudioContext) return flowlAudioContext;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  try {
    flowlAudioContext = new AudioContextClass();
    flowlAudioContext.onstatechange = () => {
      if (flowlAudioContext?.state !== "running") flowlAudioPrimed = false;
    };
  } catch {
    flowlAudioContext = null;
    flowlAudioPrimed = false;
  }

  return flowlAudioContext;
}

function primeFlowlAudio(context) {
  if (!context || context.state !== "running" || flowlAudioPrimed) return;

  try {
    const source = context.createBufferSource();
    source.buffer = context.createBuffer(1, 1, context.sampleRate || 44100);
    source.connect(context.destination);
    source.start(0);
    flowlAudioPrimed = true;
  } catch {
    flowlAudioPrimed = false;
  }
}

function withFlowlAudio(callback) {
  const context = getFlowlAudioContext();
  if (!context) return;

  const play = () => {
    if (context.state !== "running") return;
    primeFlowlAudio(context);
    callback(context);
  };

  if (context.state !== "running") {
    flowlAudioPrimed = false;
    Promise.resolve(context.resume())
      .then(play)
      .catch(() => {});
    return;
  }

  play();
}

function unlockFlowlSound() {
  const context = getFlowlAudioContext();
  if (!context) return;

  const prime = () => primeFlowlAudio(context);
  if (context.state === "running") {
    prime();
    return;
  }

  flowlAudioPrimed = false;
  Promise.resolve(context.resume())
    .then(prime)
    .catch(() => {});
}

function scheduleFlowlTone(context, options) {
  const {
    frequency,
    delay = 0,
    duration = 0.1,
    volume = 0.025,
    type = "sine",
    endFrequency = frequency,
  } = options;
  try {
    const startedAt = context.currentTime + delay;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startedAt);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), startedAt + duration);
    gain.gain.setValueAtTime(0.0001, startedAt);
    gain.gain.exponentialRampToValueAtTime(volume, startedAt + Math.min(0.018, duration / 3));
    gain.gain.exponentialRampToValueAtTime(0.0001, startedAt + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startedAt);
    oscillator.stop(startedAt + duration + 0.02);
  } catch {
    // Sound effects are optional and must never interrupt study recording.
  }
}

function playTimerCompleteSound() {
  withFlowlAudio((context) => {
    [
      { frequency: 523.25, delay: 0 },
      { frequency: 659.25, delay: 0.16 },
      { frequency: 783.99, delay: 0.32 },
      { frequency: 1046.5, delay: 0.52, duration: 0.42 },
    ].forEach((tone) => scheduleFlowlTone(context, {
      duration: 0.24,
      volume: 0.055,
      type: "sine",
      ...tone,
    }));
  });

  if (typeof navigator.vibrate === "function") {
    navigator.vibrate([90, 70, 150]);
  }
}

function playTankChargeStartSound() {
  withFlowlAudio((context) => {
    scheduleFlowlTone(context, {
      frequency: 330,
      endFrequency: 520,
      duration: 0.16,
      volume: 0.022,
      type: "triangle",
    });
  });
}

function playTankChargeTickSound(level) {
  const now = performance.now();
  if (now - lastTankSoundAt < 72) return;
  lastTankSoundAt = now;

  withFlowlAudio((context) => {
    scheduleFlowlTone(context, {
      frequency: 410 + Math.max(1, level) * 28,
      endFrequency: 470 + Math.max(1, level) * 30,
      duration: 0.075,
      volume: 0.016,
      type: "triangle",
    });
  });
}

function playTankFullSound(options = {}) {
  const now = performance.now();
  if (!options.force && now - lastTankFullSoundAt < 220) return false;
  lastTankFullSoundAt = now;

  withFlowlAudio((context) => {
    scheduleFlowlTone(context, { frequency: 659.25, duration: 0.2, volume: 0.035, type: "triangle" });
    scheduleFlowlTone(context, { frequency: 987.77, delay: 0.08, duration: 0.28, volume: 0.04, type: "sine" });
  });
  return true;
}

function playTankRewardCompleteSound() {
  withFlowlAudio((context) => {
    scheduleFlowlTone(context, { frequency: 587.33, duration: 0.13, volume: 0.024, type: "triangle" });
    scheduleFlowlTone(context, { frequency: 783.99, delay: 0.1, duration: 0.2, volume: 0.028, type: "sine" });
  });
}

function getAnalyticsConsentChoice() {
  try {
    return window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch {
    return null;
  }
}

function storeAnalyticsConsentChoice(choice) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
  } catch {
    // Consent still applies to the current page when storage is unavailable.
  }
}

function trackFlowlEvent(eventName, parameters = {}) {
  if (!window.FLOWL_ANALYTICS_ENABLED || getAnalyticsConsentChoice() !== "granted") return;
  if (typeof window.gtag !== "function" || !/^[a-z][a-z0-9_]{0,39}$/.test(eventName)) return;

  const safeParameters = Object.fromEntries(
    Object.entries(parameters)
      .filter(([, value]) => ["string", "number", "boolean"].includes(typeof value))
      .map(([key, value]) => [key, typeof value === "string" ? value.slice(0, 50) : value]),
  );

  window.gtag("event", eventName, safeParameters);
}

function getAnalyticsDurationBucket(minutes) {
  const safeMinutes = Math.max(0, Number(minutes) || 0);

  if (safeMinutes >= 90) return "90_plus";
  if (safeMinutes >= 50) return "50_89";
  if (safeMinutes >= 25) return "25_49";
  if (safeMinutes >= 10) return "10_24";
  return "1_9";
}

function getActiveAnalyticsScreen() {
  const activeScreen = document.querySelector(".screen.active");
  return ANALYTICS_SCREEN_NAMES[activeScreen?.id] || "study";
}

function trackAnalyticsScreen(screenId) {
  const screenName = ANALYTICS_SCREEN_NAMES[screenId];
  if (!screenName) return;

  trackFlowlEvent("screen_view", {
    app_name: APP_NAME,
    screen_name: screenName,
  });
}

function trackAnalyticsSession() {
  if (analyticsSessionTracked || getAnalyticsConsentChoice() !== "granted") return;

  analyticsSessionTracked = true;
  trackFlowlEvent("app_open", {
    app_version: ANALYTICS_APP_VERSION,
    display_mode: window.matchMedia("(display-mode: standalone)").matches ? "standalone" : "browser",
  });
  trackFlowlEvent("screen_view", {
    app_name: APP_NAME,
    screen_name: getActiveAnalyticsScreen(),
  });
}

function openAnalyticsConsent() {
  if (!analyticsConsent || !window.FLOWL_ANALYTICS_ENABLED) return;
  analyticsConsent.hidden = false;
  analyticsAcceptBtn?.focus({ preventScroll: true });
}

function closeAnalyticsConsent() {
  if (analyticsConsent) analyticsConsent.hidden = true;
}

function updateAnalyticsConsent(choice) {
  const granted = choice === "granted";
  storeAnalyticsConsentChoice(granted ? "granted" : "denied");

  window.gtag?.("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: granted ? "granted" : "denied",
  });

  if (granted) {
    window.loadFlowlAnalytics?.();
    trackAnalyticsSession();
  }

  closeAnalyticsConsent();
}

function initializeAnalytics() {
  if (!window.FLOWL_ANALYTICS_ENABLED) {
    analyticsSettingsBtn?.setAttribute("hidden", "");
    return;
  }

  const choice = getAnalyticsConsentChoice();
  if (choice === "granted") {
    trackAnalyticsSession();
    return;
  }

  if (choice !== "denied") {
    window.setTimeout(openAnalyticsConsent, 650);
  }
}

function createStateMeta(existingMeta = {}) {
  const now = new Date().toISOString();

  return {
    version: STORAGE_VERSION,
    createdAt: existingMeta.createdAt || now,
    updatedAt: existingMeta.updatedAt || now,
    appName: APP_NAME,
  };
}

function createDefaultState() {
  return {
    meta: createStateMeta(),
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
    encouragement: {
      lastMessage: "",
      recentMessages: [],
      lastShownAt: null,
    },
  };
}

function getLocalStorageStatus() {
  try {
    if (!window.localStorage) {
      return { available: false, error: "localStorage is not available" };
    }

    window.localStorage.setItem(STORAGE_TEST_KEY, "1");
    window.localStorage.removeItem(STORAGE_TEST_KEY);
    return { available: true, error: "" };
  } catch (error) {
    return { available: false, error: error?.message || "localStorage is blocked" };
  }
}

function setStorageWarning(message) {
  console.warn(message);
}

function safeGetStorageItem(key) {
  if (!storageStatus.available) return null;

  try {
    return localStorage.getItem(key);
  } catch {
    setStorageWarning("このブラウザでは記録を読み込めない可能性があります。通常モードのSafariまたはChromeで開いてください。");
    return null;
  }
}

function safeSetStorageItem(key, value) {
  if (!storageStatus.available) return false;

  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    setStorageWarning("データ保存に失敗しました。ブラウザの空き容量やプライベートモードを確認してください。");
    return false;
  }
}

function safeRemoveStorageItem(key) {
  if (!storageStatus.available) return;

  try {
    localStorage.removeItem(key);
  } catch {
    // Removing a temporary key is best-effort only.
  }
}

function archiveCorruptStorage(key, rawValue) {
  if (!rawValue || !storageStatus.available) return;

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const archiveKey = `${STORAGE_CORRUPT_PREFIX}:${timestamp}`;
  const archiveValue = JSON.stringify({
    appName: APP_NAME,
    capturedAt: new Date().toISOString(),
    sourceKey: key,
    rawValue,
  });

  safeSetStorageItem(archiveKey, archiveValue);
}

function parseStoredState(rawValue, key, { archiveCorrupt = false } = {}) {
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue);
    if (!isLikelyFlowlState(parsed)) {
      if (archiveCorrupt) archiveCorruptStorage(key, rawValue);
      return null;
    }
    return normalizeState(parsed);
  } catch {
    if (archiveCorrupt) archiveCorruptStorage(key, rawValue);
    return null;
  }
}

function loadStoredStateFromKey(key, options = {}) {
  return parseStoredState(safeGetStorageItem(key), key, options);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isLikelyFlowlState(value) {
  if (!isPlainObject(value)) return false;
  if (value.meta?.appName === APP_NAME) return true;
  return Array.isArray(value.sessions) && (
    isPlainObject(value.pet)
    || isPlainObject(value.inventory)
    || isPlainObject(value.customization)
    || Array.isArray(value.subjects)
    || Number.isFinite(Number(value.totalMinutes))
    || Number.isFinite(Number(value.coins))
  );
}

function getSafeMode(mode) {
  return ["timer", "stopwatch", "manual"].includes(mode) ? mode : "manual";
}

function normalizeSession(session, index) {
  if (!isPlainObject(session)) return null;

  const minutes = Math.round(Number(session.minutes) || 0);
  if (minutes <= 0) return null;

  const createdDate = parseSessionDate(session.createdAt || session.date);
  const createdAt = Number.isNaN(Date.parse(session.createdAt))
    ? createdDate.toISOString()
    : session.createdAt;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(session.date || "")
    ? session.date
    : toDateKey(createdDate);
  const coinsEarned = Math.max(
    0,
    Math.round(Number(session.coinsEarned ?? session.coins ?? getEarnedCoins(minutes)) || 0)
  );
  const subject = String(session.subject || "集中学習").trim() || "集中学習";

  return {
    ...session,
    id: String(session.id || `session-${Date.parse(createdAt) || Date.now()}-${index}`),
    subject,
    minutes,
    mode: getSafeMode(session.mode),
    date,
    createdAt,
    coinsEarned,
    coins: coinsEarned,
  };
}

function prepareStateForSave(sourceState = state) {
  const normalized = normalizeState(sourceState);
  normalized.meta = {
    ...createStateMeta(normalized.meta),
    version: STORAGE_VERSION,
    updatedAt: new Date().toISOString(),
    appName: APP_NAME,
  };
  return normalized;
}

function backupCurrentStoredState() {
  const currentRaw = safeGetStorageItem(STORAGE_KEY);
  if (!currentRaw || !parseStoredState(currentRaw, STORAGE_KEY)) return;

  safeSetStorageItem(STORAGE_LAST_GOOD_KEY, currentRaw);
  safeSetStorageItem(STORAGE_BACKUP_KEY, currentRaw);
}

function normalizeState(savedState) {
  savedState = savedState || {};
  const { idleReward: _legacyIdleReward, ...persistedState } = savedState;
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

  removedItemIds.forEach((itemId) => {
    if (customization.furniture === itemId) customization.furniture = null;
    if (customization.decor === itemId) customization.decor = null;
  });

  const inventory = {
    ...defaults.inventory,
    ...savedState.inventory,
  };

  removedItemIds.forEach((itemId) => {
    delete inventory[itemId];
  });

  const sessions = Array.isArray(savedState.sessions)
    ? savedState.sessions.map(normalizeSession).filter(Boolean)
    : [];
  const savedTotalMinutes = Number(savedState.totalMinutes);
  const totalMinutes = Number.isFinite(savedTotalMinutes)
    ? Math.max(0, Math.round(savedTotalMinutes))
    : sessions.reduce((sum, session) => sum + session.minutes, 0);
  const coins = Math.max(0, Math.round(Number(savedState.coins ?? defaults.coins) || 0));
  const savedMeta = isPlainObject(savedState.meta) ? savedState.meta : {};

  return {
    ...defaults,
    ...persistedState,
    meta: createStateMeta(savedMeta),
    coins,
    totalMinutes,
    pet: {
      ...defaults.pet,
      ...savedState.pet,
      hunger: clamp(savedState.pet?.hunger ?? defaults.pet.hunger),
      happy: clamp(savedState.pet?.happy ?? defaults.pet.happy),
      energy: clamp(savedState.pet?.energy ?? defaults.pet.energy),
    },
    inventory,
    customization: {
      ...customization,
    },
    subjects: Array.isArray(savedState.subjects) ? savedState.subjects : [],
    sessions,
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
    encouragement: {
      ...defaults.encouragement,
      ...(savedState.encouragement || {}),
      recentMessages: Array.isArray(savedState.encouragement?.recentMessages)
        ? savedState.encouragement.recentMessages.slice(0, 6)
        : [],
    },
  };
}

function loadState() {
  if (!storageStatus.available) return createDefaultState();

  const mainState = loadStoredStateFromKey(STORAGE_KEY, { archiveCorrupt: true });
  if (mainState) return mainState;

  const lastGoodState = loadStoredStateFromKey(STORAGE_LAST_GOOD_KEY);
  if (lastGoodState) {
    return lastGoodState;
  }

  const backupState = loadStoredStateFromKey(STORAGE_BACKUP_KEY);
  if (backupState) {
    return backupState;
  }

  return createDefaultState();
}

function saveState() {
  if (!storageStatus.available) return false;

  backupCurrentStoredState();

  const nextState = prepareStateForSave(state);
  let serialized = "";

  try {
    serialized = JSON.stringify(nextState);
  } catch {
    setStorageWarning("データ保存に失敗しました。記録データの形式を確認してください。");
    return false;
  }

  if (!safeSetStorageItem(STORAGE_TEMP_KEY, serialized)) return false;

  try {
    const verifiedState = JSON.parse(safeGetStorageItem(STORAGE_TEMP_KEY));
    if (!isLikelyFlowlState(verifiedState)) throw new Error("Saved data verification failed");
  } catch {
    safeRemoveStorageItem(STORAGE_TEMP_KEY);
    setStorageWarning("データ保存の検証に失敗しました。もう一度お試しください。");
    return false;
  }

  if (!safeSetStorageItem(STORAGE_KEY, serialized)) {
    safeRemoveStorageItem(STORAGE_TEMP_KEY);
    return false;
  }

  safeSetStorageItem(STORAGE_LAST_GOOD_KEY, serialized);
  safeSetStorageItem(STORAGE_META_KEY, JSON.stringify(nextState.meta));
  safeRemoveStorageItem(STORAGE_TEMP_KEY);
  state = nextState;
  return true;
}

function clamp(value) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) return 0;

  return Math.max(0, Math.min(100, numericValue));
}

function setCareMeterValue(meterElement, value) {
  const normalizedValue = clamp(value);

  meterElement.min = 0;
  meterElement.max = 100;
  meterElement.value = normalizedValue;
  meterElement.setAttribute("aria-valuenow", String(Math.round(normalizedValue)));
  meterElement.title = `${Math.round(normalizedValue)}%`;
}

function formatTime(value) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = value % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getTodayKey() {
  return toDateKey(new Date());
}

function getValidStudyDateKey(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return null;

  const parsedDate = parseSessionDate(value);
  if (toDateKey(parsedDate) !== value || value > getTodayKey()) return null;
  return value;
}

function getRecordedMinutesForDate(dateKey) {
  return state.sessions.reduce((sum, session) => {
    return session.date === dateKey ? sum + session.minutes : sum;
  }, 0);
}

function initializeStudyDateInput() {
  if (!studyDateInput) return;

  const today = getTodayKey();
  studyDateInput.max = today;
  studyDateInput.value = today;
}

function preventAppViewportZoom(event) {
  if (event.type.startsWith("gesture") || event.touches?.length > 1) {
    event.preventDefault();
  }
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

function formatDurationPickerLabel(totalMinutes) {
  const safeMinutes = Math.max(0, Math.min(12 * 60, Math.round(totalMinutes)));
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;

  return `${hours}時間${String(minutes).padStart(2, "0")}分`;
}

function getTimerDisplaySeconds() {
  if (studyMode === "timer") {
    return Math.max(0, timerTargetSeconds - time);
  }

  return time;
}

function getCurrentStudyLimitSeconds() {
  return studyMode === "timer" ? timerTargetSeconds : TIMER_MAX_SECONDS;
}

function getCurrentStudyRecordLabel() {
  return studyMode === "timer" ? "タイマー学習" : "ストップウォッチ学習";
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
  const growthMinutes = Math.max(state.totalMinutes, STARTING_GROWTH_MINUTES);

  return growthStages.reduce((current, stage) => {
    return growthMinutes >= stage.min ? stage : current;
  }, growthStages[0]);
}

function getUnlockedRewards() {
  return unlockRewards.filter((reward) => state.totalMinutes >= reward.threshold);
}

function getOwlMotionState(fullness, play) {
  const safeFullness = clamp(Number(fullness) || 0);
  const safePlay = clamp(Number(play) || 0);

  if (safeFullness >= 90 && safePlay >= 90) return "veryHappy";
  if (safeFullness >= 70 && safePlay >= 70) return "energetic";
  if (safeFullness < 40 && safePlay < 40) return "lowEnergy";
  if (safeFullness < 40) return "hungry";
  if (safePlay < 40) return "bored";
  return "normal";
}

function getOwlExpressionState(fullness, affection) {
  const safeFullness = clamp(Number(fullness) || 0);
  const safeAffection = clamp(Number(affection) || 0);

  if (safeFullness >= 90 && safeAffection >= 90) return "sparkly";
  if (safeFullness >= 70 && safeAffection >= 70) return "happy";
  if (safeFullness < 40 && safeAffection < 40) return "low";
  if (safeFullness < 40 && safeAffection >= 70) return "hungryLoved";
  if (safeAffection < 40 && safeFullness >= 40) return "lonely";
  if (safeFullness >= 70 && safeAffection >= 40) return "content";
  return "normal";
}

function applyOwlMotionState(pet, motionState) {
  if (!pet) return;

  pet.classList.remove(...owlMotionStateClasses);
  pet.classList.add(`owl-motion-${motionState}`);
  pet.dataset.careMotion = motionState;
}

function applyOwlExpressionState(pet, expressionState) {
  if (!pet) return;

  pet.classList.remove(...owlExpressionClasses);
  pet.classList.add(`owl-expression-${expressionState}`);
  pet.dataset.expression = expressionState;
}

function applyStageCustomization(stageElement, customization = state.customization) {
  if (!stageElement) return;

  const furniture = customization.furniture || customization.decor;

  stageElement.classList.remove("has-room-decor", "has-forest-bg");
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

function getRarityRank(item) {
  const index = rarityOrder.indexOf(item?.rarity);
  return index === -1 ? rarityOrder.length : index;
}

function sortItemEntries([idA, itemA], [idB, itemB]) {
  const rarityDiff = getRarityRank(itemA) - getRarityRank(itemB);
  if (rarityDiff !== 0) return rarityDiff;

  const priceDiff = getItemPrice(itemA) - getItemPrice(itemB);
  if (priceDiff !== 0) return priceDiff;

  return (itemA.name || idA).localeCompare(itemB.name || idB, "ja");
}

function getItemLayer(item) {
  return item.layer || item.accessorySlot || getItemCategory(item);
}

function getEquipmentAnchorKey(item) {
  if (item?.anchor && equipmentAnchors[item.anchor]) return item.anchor;

  const category = getItemCategory(item);
  if (category === "clothing") return "body";
  if (category === "accessory") {
    return equipmentAnchors[item.accessorySlot] ? item.accessorySlot : "head";
  }

  return "center";
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

function rememberAppOpen() {
  state.lastOpenedAt = new Date().toISOString();
  saveState();
}

function getPetMessage(todayMinutes, streak) {
  const stage = getGrowthStage();
  const unlocked = getUnlockedRewards();

  if (state.pet.hunger <= 15) return "おなかがすいて、ちょっとしょんぼりしています";
  if (state.pet.happy <= 15) return "少し退屈みたい。ふれあうと好感度が上がります";
  if (todayMinutes >= 60) return "今日は森まで歩けそうなくらい進んだね";
  if (todayMinutes >= 25) return "集中の音、ちゃんと聞こえてたよ";
  if (todayMinutes >= 10) return "ふわベリーのにおいがするかも";
  if (streak >= 3) return `${streak}日連続、すこしずつ巣が育ってるよ`;
  if (unlocked.length >= 3) return "お部屋がだんだんFlowletらしくなってきたね";
  if (stage.id === "egg") return "たまごの中で、今日の一歩を待ってるよ";
  if (stage.id === "baby") return "ひなFlowletが一緒に見守っています";
  return "今日も短くていいから、いっしょに進もう";
}

function fillEncouragementTemplate(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return values[key] ?? "";
  });
}

function chooseEncouragementMessage(candidates, values = {}) {
  const messages = candidates
    .map((template) => fillEncouragementTemplate(template, values).trim())
    .filter(Boolean);

  if (messages.length === 0) return "今日も来てくれたんだね。Flowletもうれしいよ。";

  const recent = new Set(state.encouragement?.recentMessages || []);
  const lastMessage = state.encouragement?.lastMessage || "";
  const freshMessages = messages.filter((message) => message !== lastMessage && !recent.has(message));
  const nonRepeatingMessages = freshMessages.length
    ? freshMessages
    : messages.filter((message) => message !== lastMessage);
  const pool = nonRepeatingMessages.length ? nonRepeatingMessages : messages;

  return pool[Math.floor(Math.random() * pool.length)];
}

function rememberEncouragementMessage(message) {
  if (!message) return;

  const recentMessages = [
    message,
    ...(state.encouragement?.recentMessages || []).filter((item) => item !== message),
  ].slice(0, 6);

  state.encouragement = {
    ...(state.encouragement || {}),
    lastMessage: message,
    recentMessages,
    lastShownAt: new Date().toISOString(),
  };
  saveState();
}

function getTodayStudyMinutes() {
  const today = getTodayKey();

  return state.sessions
    .filter((session) => toDateKey(parseSessionDate(session.date)) === today)
    .reduce((sum, session) => sum + session.minutes, 0);
}

function getPreviousStudySession(currentSession) {
  if (!currentSession) return null;

  return state.sessions.find((session) => session.id !== currentSession.id) || null;
}

function getRecentSubjectCount(subject, currentSession) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  return state.sessions.filter((session) => {
    if (session.id === currentSession?.id) return true;
    if (session.subject !== subject) return false;
    return getSessionTime(session) >= weekAgo;
  }).length;
}

function getTodayGoalMilestone(todayMinutes, sessionMinutes) {
  const beforeSessionMinutes = Math.max(0, todayMinutes - sessionMinutes);

  if (beforeSessionMinutes < 60 && todayMinutes >= 60) return 60;
  if (beforeSessionMinutes < 25 && todayMinutes >= 25) return 25;
  return null;
}

function getStudyTimeMessageGroup(minutes) {
  if (minutes >= 90) return encouragementMessages.huge;
  if (minutes >= 50) return encouragementMessages.long;
  if (minutes >= 25) return encouragementMessages.steady;
  if (minutes >= 10) return encouragementMessages.light;
  return encouragementMessages.short;
}

function buildStudySessionContext(session) {
  const previousSession = getPreviousStudySession(session);
  const todayMinutes = getTodayStudyMinutes();
  const streakDays = getStudyStreak();
  const previousMinutes = previousSession?.minutes || 0;
  const diffMinutes = previousSession ? session.minutes - previousMinutes : 0;
  const subjectWeekCount = getRecentSubjectCount(session.subject, session);
  const fullness = clamp(state.pet.hunger);
  const affection = clamp(state.pet.happy);

  return {
    previousSession,
    previousMinutes,
    diffMinutes,
    todayMinutes,
    todayGoal: getTodayGoalMilestone(todayMinutes, session.minutes),
    streakDays,
    subjectWeekCount,
    fullness,
    affection,
    careHigh: fullness >= 75 && affection >= 75,
    careLow: fullness < 35 || affection < 35,
  };
}

function buildStudyMessageCandidates(session, context) {
  const candidates = [];

  if (context.diffMinutes > 0) candidates.push(...encouragementMessages.improvement);
  if (context.streakDays >= 7 || (context.streakDays > 0 && context.streakDays % 7 === 0)) {
    candidates.push(...encouragementMessages.streakMilestone);
  } else if (context.streakDays >= 3) {
    candidates.push(...encouragementMessages.streak);
  }
  if (context.todayGoal) candidates.push(...encouragementMessages.todayGoal);
  if (context.subjectWeekCount >= 3) candidates.push(...encouragementMessages.subjectHabit);
  if (context.careHigh) candidates.push(...encouragementMessages.careHigh);
  if (context.careLow) candidates.push(...encouragementMessages.careLow);

  candidates.push(...getStudyTimeMessageGroup(session.minutes));
  return candidates;
}

function buildStudyCompleteMessage(session, context) {
  return chooseEncouragementMessage(buildStudyMessageCandidates(session, context), {
    subject: session.subject,
    minutes: session.minutes,
    duration: formatStudyDuration(session.minutes),
    diff: Math.max(1, context.diffMinutes),
    streak: context.streakDays,
    goal: context.todayGoal || 25,
  });
}

function buildStudyBonus(session, context) {
  if (context.todayGoal) return `今日の合計が${formatStudyDuration(context.todayGoal)}に届きました`;
  if (context.diffMinutes > 0) return `前回より${formatStudyDuration(context.diffMinutes)}長くできました`;
  if (context.streakDays >= 7) return `連続${context.streakDays}日、しっかり続いています`;
  if (context.streakDays >= 3) return `連続${context.streakDays}日、習慣になってきています`;
  if (context.subjectWeekCount >= 3) return `${session.subject}は今週${context.subjectWeekCount}回目です`;
  if (context.careHigh) return "満腹度と好感度が高く、Flowletはごきげんです";
  if (context.careLow) return "Flowletは少し眠そうだけど、そばで見守っています";
  return "今日の積み重ねが力になります";
}

function getStudyReactionMood(minutes, context = {}) {
  if (minutes >= 90 || (minutes >= 50 && context.careHigh)) return "excited";
  if (minutes >= 25 || context.diffMinutes > 0 || context.streakDays >= 3) return "proud";
  if (minutes >= 10 || context.careHigh) return "happy";
  if (context.careLow) return "sleepy";
  return "normal";
}

function buildStudyReaction(session) {
  const context = buildStudySessionContext(session);
  const title = buildStudyCompleteMessage(session, context);
  const detail = `${session.subject}を${formatStudyDuration(session.minutes)}記録しました`;

  return {
    title,
    detail,
    bonus: buildStudyBonus(session, context),
    reward: `+${session.coinsEarned ?? session.coins ?? getEarnedCoins(session.minutes)} coin`,
    mood: getStudyReactionMood(session.minutes, context),
  };
}

function buildLaunchReaction() {
  const now = Date.now();
  const lastOpenedTime = state.lastOpenedAt ? Date.parse(state.lastOpenedAt) : NaN;
  const lastShownTime = state.encouragement?.lastShownAt ? Date.parse(state.encouragement.lastShownAt) : NaN;
  const latestStudyTime = getSessionTime(state.sessions[0]);
  const lastOpenedDate = Number.isNaN(lastOpenedTime) ? null : toDateKey(new Date(lastOpenedTime));
  const openedToday = lastOpenedDate === getTodayKey();
  const elapsedHours = Number.isNaN(lastOpenedTime) ? Infinity : (now - lastOpenedTime) / (60 * 60 * 1000);
  const shownRecently = !Number.isNaN(lastShownTime) && now - lastShownTime < 30 * 60 * 1000;

  if (shownRecently || (openedToday && elapsedHours < 6)) return null;

  const daysSinceStudy = latestStudyTime
    ? Math.floor((now - latestStudyTime) / (24 * 60 * 60 * 1000))
    : null;
  const careHigh = state.pet.hunger >= 75 && state.pet.happy >= 75;
  const careLow = state.pet.hunger < 35 || state.pet.happy < 35;
  const candidates = daysSinceStudy !== null && daysSinceStudy >= 3
    ? encouragementMessages.welcomeBack
    : encouragementMessages.welcomeToday;
  const title = chooseEncouragementMessage(candidates);
  let bonus = "今日も少しずつで大丈夫。";

  if (careHigh) {
    bonus = chooseEncouragementMessage(encouragementMessages.careHigh);
  } else if (careLow) {
    bonus = chooseEncouragementMessage(encouragementMessages.careLow);
  } else if (daysSinceStudy !== null && daysSinceStudy > 0) {
    bonus = `前回の記録から${daysSinceStudy}日。戻ってきたことが大事です。`;
  }

  return {
    title,
    detail: "Flowletがそっと待っていました",
    bonus,
    reward: "",
    mood: careLow ? "sleepy" : careHigh ? "happy" : "normal",
  };
}

function triggerStudyReactionMood(mood) {
  const moodClasses = [
    "study-reaction-happy",
    "study-reaction-proud",
    "study-reaction-excited",
    "study-reaction-sleepy",
    "study-reaction-normal",
  ];
  const safeMood = ["happy", "proud", "excited", "sleepy", "normal"].includes(mood) ? mood : "happy";

  clearTimeout(studyReactionMoodTimer);
  petViews.forEach((view) => {
    view.pet.classList.remove(...moodClasses);
    view.pet.classList.add(`study-reaction-${safeMood}`);
  });

  studyReactionMoodTimer = setTimeout(() => {
    petViews.forEach((view) => {
      view.pet.classList.remove(...moodClasses);
    });
  }, 2800);
}

function showStudyReaction(reaction) {
  if (!studyReaction || !reaction) return;

  clearTimeout(studyReactionTimer);

  const body = document.createElement("span");
  const title = document.createElement("strong");
  const detail = document.createElement("small");

  body.className = "study-reaction-body";
  title.textContent = reaction.title;
  detail.textContent = `${reaction.detail} / ${reaction.bonus}`;

  body.append(title, detail);
  studyReaction.replaceChildren(body);

  if (reaction.reward) {
    const reward = document.createElement("span");
    reward.className = "study-reaction-reward";
    reward.textContent = reaction.reward;
    studyReaction.appendChild(reward);
  }

  studyReaction.className = `study-reaction mood-${reaction.mood}`;
  studyReaction.classList.toggle("no-reward", !reaction.reward);
  studyReaction.hidden = false;
  window.requestAnimationFrame(() => {
    studyReaction.classList.add("show");
  });

  triggerStudyReactionMood(reaction.mood);
  rememberEncouragementMessage(reaction.title);

  if (petMessage) {
    petMessage.textContent = reaction.title;
  }

  studyReactionTimer = setTimeout(() => {
    studyReaction.classList.remove("show");
    window.setTimeout(() => {
      studyReaction.hidden = true;
    }, 220);
  }, 3600);
}

function getElapsedTimerMinutes() {
  return Math.floor(Math.min(time, getCurrentStudyLimitSeconds()) / 60);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  time = 0;
  updateDisplay();
  updateTimerButton("スタート");
}

function renderStudyModeControls() {
  studyModeButtons.forEach((button) => {
    const isActive = button.dataset.studyMode === studyMode;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (timerDurationSetting) {
    timerDurationSetting.hidden = studyMode !== "timer";
  }
}

function updateDurationButtons() {
  if (timerDurationBtn) {
    timerDurationBtn.textContent = formatDurationPickerLabel(timerTargetSeconds / 60);
  }

  if (manualDurationBtn) {
    manualDurationBtn.textContent = formatDurationPickerLabel(manualStudyMinutes);
  }

  if (minutesInput) {
    minutesInput.value = String(manualStudyMinutes);
  }
}

function resetCurrentStudyForModeChange() {
  resetTimer();
  timerStatus.textContent = "";
  setFocusMode(false);
}

function setStudyMode(nextMode) {
  if (!["timer", "stopwatch"].includes(nextMode) || nextMode === studyMode) {
    renderStudyModeControls();
    return;
  }

  if ((timer !== null || time > 0) && !confirm("現在の計測をリセットして切り替えますか？")) {
    renderStudyModeControls();
    return;
  }

  resetCurrentStudyForModeChange();
  studyMode = nextMode;
  updateDisplay();
  renderStudyModeControls();
}

function createDurationWheelOptions(wheel, max) {
  if (!wheel) return;

  wheel.innerHTML = "";
  for (let value = 0; value <= max; value += 1) {
    const option = document.createElement("button");

    option.type = "button";
    option.className = "duration-option";
    option.dataset.value = String(value);
    option.textContent = String(value).padStart(2, "0");
    wheel.appendChild(option);
  }
}

function getWheelValue(wheel, max) {
  if (!wheel) return 0;

  const optionHeight = Number(durationPickerState?.optionHeight) || 40;
  return Math.max(0, Math.min(max, Math.round(wheel.scrollTop / optionHeight)));
}

function setWheelValue(wheel, value) {
  if (!wheel) return;

  const optionHeight = Number(durationPickerState?.optionHeight) || 40;
  wheel.scrollTo({ top: value * optionHeight, behavior: "auto" });
}

function updateDurationPickerSelection() {
  if (!durationPickerState) return;

  const hours = getWheelValue(durationHourWheel, durationPickerState.maxHours);
  let minutes = getWheelValue(durationMinuteWheel, 59);

  if (hours * 60 + minutes > durationPickerState.maxMinutes) {
    minutes = Math.max(0, durationPickerState.maxMinutes - hours * 60);
    setWheelValue(durationMinuteWheel, minutes);
  }

  const totalMinutes = hours * 60 + minutes;

  durationPickerValue.textContent = formatDurationPickerLabel(totalMinutes);

  [durationHourWheel, durationMinuteWheel].forEach((wheel, wheelIndex) => {
    const currentValue = wheelIndex === 0 ? hours : minutes;

    wheel.querySelectorAll(".duration-option").forEach((option) => {
      option.classList.toggle("selected", Number(option.dataset.value) === currentValue);
    });
  });
}

function openDurationPicker(options = {}) {
  if (!durationPicker) return;

  const initialMinutes = Math.max(options.minMinutes || 0, Math.min(options.maxMinutes || 12 * 60, options.initialMinutes || 0));
  const initialHours = Math.floor(initialMinutes / 60);
  const initialRemainder = initialMinutes % 60;

  durationPickerState = {
    title: options.title || "時間を選択",
    minMinutes: options.minMinutes ?? 1,
    maxMinutes: options.maxMinutes ?? 12 * 60,
    maxHours: options.maxHours ?? 12,
    onConfirm: options.onConfirm,
    optionHeight: 40,
  };

  durationPickerTitle.textContent = durationPickerState.title;
  durationPicker.hidden = false;

  window.requestAnimationFrame(() => {
    const firstOption = durationHourWheel?.querySelector(".duration-option");
    durationPickerState.optionHeight = firstOption?.getBoundingClientRect().height || 40;
    setWheelValue(durationHourWheel, initialHours);
    setWheelValue(durationMinuteWheel, initialRemainder);
    updateDurationPickerSelection();
    durationPicker.classList.add("show");
  });
}

function closeDurationPicker() {
  if (!durationPicker) return;

  durationPicker.classList.remove("show");
  window.setTimeout(() => {
    durationPicker.hidden = true;
  }, 180);
}

function confirmDurationPicker() {
  if (!durationPickerState) return;

  const hours = getWheelValue(durationHourWheel, durationPickerState.maxHours);
  const minutes = getWheelValue(durationMinuteWheel, 59);
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes < durationPickerState.minMinutes) {
    alert("1分以上を選んでください。");
    return;
  }

  const result = durationPickerState.onConfirm?.(Math.min(totalMinutes, durationPickerState.maxMinutes));
  if (result === false) return;
  closeDurationPicker();
}

function addStudySession(minutes, subject, mode = "manual", requestedDate = getTodayKey()) {
  const safeMinutes = Math.round(Number(minutes));

  if (!Number.isFinite(safeMinutes) || safeMinutes <= 0) {
    alert("1分以上の学習時間を入力してください。");
    return null;
  }

  const sessionDate = getValidStudyDateKey(requestedDate);

  if (!sessionDate) {
    alert("今日以前の正しい日付を選んでください。");
    return null;
  }

  const recordedMinutes = getRecordedMinutesForDate(sessionDate);
  const remainingMinutes = Math.max(0, DAILY_STUDY_LIMIT_MINUTES - recordedMinutes);
  if (safeMinutes > remainingMinutes) {
    const remainingMessage = remainingMinutes > 0
      ? `この日にはあと${formatStudyDuration(remainingMinutes)}記録できます。`
      : "この日はすでに24時間記録されています。";
    alert(`1日に記録できる学習時間は24時間までです。${remainingMessage}`);
    return null;
  }

  const earnedCoins = getEarnedCoins(safeMinutes);
  const previousTotalMinutes = state.totalMinutes;
  const normalizedSubject = subject || "集中学習";
  const createdAt = new Date().toISOString();
  const session = {
    id: `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: sessionDate,
    createdAt,
    subject: normalizedSubject,
    minutes: safeMinutes,
    mode: getSafeMode(mode),
    coinsEarned: earnedCoins,
    coins: earnedCoins,
  };

  if (subject) {
    rememberSubject(normalizedSubject);
  }

  state.sessions.unshift(session);
  state.sessions = state.sessions.slice(0, MAX_STORED_SESSIONS);
  state.totalMinutes += safeMinutes;
  state.coins += earnedCoins;
  grantLevelRewards();

  saveState();
  render();
  trackFlowlEvent("study_complete", {
    study_mode: session.mode,
    duration_bucket: getAnalyticsDurationBucket(safeMinutes),
  });
  animateStudyTank(previousTotalMinutes, safeMinutes);
  showStudyTankReward(previousTotalMinutes, session);

  return session;
}

function getStudyTankLevel(totalMinutes) {
  const safeMinutes = Math.max(0, Math.round(Number(totalMinutes) || 0));
  if (safeMinutes === 0) return 0;

  const remainder = safeMinutes % STUDY_TANK_CAPACITY_MINUTES;
  return remainder === 0 ? STUDY_TANK_CAPACITY_MINUTES : remainder;
}

function getStudyTankAnimationDuration(addedMinutes) {
  const safeMinutes = Math.max(STUDY_TANK_MIN_ANIMATION_MINUTES, Math.min(
    DAILY_STUDY_LIMIT_MINUTES,
    Math.round(Number(addedMinutes) || STUDY_TANK_MIN_ANIMATION_MINUTES)
  ));
  const range = DAILY_STUDY_LIMIT_MINUTES - STUDY_TANK_MIN_ANIMATION_MINUTES;
  const progress = range > 0 ? (safeMinutes - STUDY_TANK_MIN_ANIMATION_MINUTES) / range : 1;
  const visibleProgress = Math.sqrt(progress);
  return Math.round(STUDY_TANK_MIN_ANIMATION_MS
    + (STUDY_TANK_MAX_ANIMATION_MS - STUDY_TANK_MIN_ANIMATION_MS) * visibleProgress);
}

function setStudyTankVisual(minutes) {
  if (!studyTankFill || !studyTankStatus || !studyTankVessel) return;

  const safeMinutes = Math.max(0, Math.min(STUDY_TANK_CAPACITY_MINUTES, Number(minutes) || 0));
  const displayMinutes = safeMinutes <= 0
    ? 0
    : Math.min(STUDY_TANK_CAPACITY_MINUTES, Math.ceil(safeMinutes - 0.001));
  const percentage = (safeMinutes / STUDY_TANK_CAPACITY_MINUTES) * 100;

  studyTankFill.style.width = `${percentage}%`;
  studyTankStatus.textContent = `${displayMinutes} / ${STUDY_TANK_CAPACITY_MINUTES}分`;
  studyTankVessel.setAttribute("aria-valuenow", String(displayMinutes));
  studyTankVessel.setAttribute("aria-valuetext", `${displayMinutes}分充填`);
}

function pulseStudyTank() {
  if (!studyTank) return;

  clearTimeout(studyTankPulseTimer);
  studyTank.classList.remove("is-complete");
  void studyTank.offsetWidth;
  studyTank.classList.add("is-complete");
  studyTankPulseTimer = window.setTimeout(() => {
    studyTank.classList.remove("is-complete");
  }, 520);
}

function renderStudyTank(options = {}) {
  if (!studyTank || !studyTankMessage) return;
  if (studyTankAnimating && !options.force) return;

  const level = getStudyTankLevel(state.totalMinutes);
  setStudyTankVisual(level);

  if (!options.keepMessage) {
    studyTankMessage.textContent = level === STUDY_TANK_CAPACITY_MINUTES
      ? "満タン！次の記録で新しいタンクへ"
      : "記録した時間が1分ずつたまります";
  }
}

function finishStudyTankAnimation(token, previousTotalMinutes, addedMinutes) {
  if (token !== studyTankAnimationToken || !studyTankMessage) return;

  const startRemainder = previousTotalMinutes % STUDY_TANK_CAPACITY_MINUTES;
  const completedTanks = Math.floor((startRemainder + addedMinutes) / STUDY_TANK_CAPACITY_MINUTES);
  const finalLevel = getStudyTankLevel(previousTotalMinutes + addedMinutes);

  studyTankAnimating = false;
  setStudyTankVisual(finalLevel);
  studyTank.classList.remove("is-filling");

  if (completedTanks > 0 && finalLevel < STUDY_TANK_CAPACITY_MINUTES) {
    studyTankMessage.textContent = `満タン×${completedTanks}・次のタンクに${finalLevel}分`;
  } else if (completedTanks > 0) {
    studyTankMessage.textContent = `満タン×${completedTanks}！`;
    pulseStudyTank();
  } else {
    studyTankMessage.textContent = `+${addedMinutes}分たまりました`;
  }
}

function animateStudyTank(previousTotalMinutes, addedMinutes) {
  if (!studyTank || !studyTankMessage || !studyTankFill) return;

  cancelAnimationFrame(studyTankAnimationFrame);
  clearTimeout(studyTankResetTimer);
  studyTankAnimationToken += 1;
  const token = studyTankAnimationToken;
  const safePreviousTotal = Math.max(0, Math.round(Number(previousTotalMinutes) || 0));
  const safeAddedMinutes = Math.max(1, Math.round(Number(addedMinutes) || 1));
  const startRemainder = safePreviousTotal % STUDY_TANK_CAPACITY_MINUTES;
  const visualAddedMinutes = Math.min(safeAddedMinutes, DAILY_STUDY_LIMIT_MINUTES);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  studyTankAnimating = true;
  studyTank.classList.add("is-filling");
  studyTankMessage.textContent = `+${safeAddedMinutes}分をタンクへ充填中`;

  if (reduceMotion) {
    finishStudyTankAnimation(token, safePreviousTotal, safeAddedMinutes);
    return;
  }

  const runAnimation = () => {
    const duration = getStudyTankAnimationDuration(visualAddedMinutes);
    const startedAt = performance.now();
    let previousCycle = 0;

    const step = (now) => {
      if (token !== studyTankAnimationToken) return;

      const progress = Math.min(1, (now - startedAt) / duration);
      const visualMinutes = startRemainder + visualAddedMinutes * progress;
      const currentCycle = Math.floor(visualMinutes / STUDY_TANK_CAPACITY_MINUTES);

      if (currentCycle > previousCycle && progress < 1) {
        previousCycle = currentCycle;
        setStudyTankVisual(STUDY_TANK_CAPACITY_MINUTES);
        pulseStudyTank();
        studyTankAnimationFrame = requestAnimationFrame(step);
        return;
      }

      const currentLevel = visualMinutes % STUDY_TANK_CAPACITY_MINUTES;
      setStudyTankVisual(currentLevel);

      if (progress < 1) {
        studyTankAnimationFrame = requestAnimationFrame(step);
        return;
      }

      finishStudyTankAnimation(token, safePreviousTotal, safeAddedMinutes);
    };

    studyTankAnimationFrame = requestAnimationFrame(step);
  };

  if (safePreviousTotal > 0 && startRemainder === 0) {
    setStudyTankVisual(STUDY_TANK_CAPACITY_MINUTES);
    pulseStudyTank();
    studyTankResetTimer = window.setTimeout(() => {
      if (token !== studyTankAnimationToken) return;
      setStudyTankVisual(0);
      runAnimation();
    }, 420);
    return;
  }

  setStudyTankVisual(startRemainder);
  studyTankAnimationFrame = requestAnimationFrame(runAnimation);
}

function setStudyTankRewardVisual(minutes) {
  if (!studyTankRewardFill || !studyTankRewardLevel || !studyTankRewardVessel) return;

  const safeMinutes = Math.max(0, Math.min(STUDY_TANK_CAPACITY_MINUTES, Number(minutes) || 0));
  const displayMinutes = safeMinutes <= 0
    ? 0
    : Math.min(STUDY_TANK_CAPACITY_MINUTES, Math.ceil(safeMinutes - 0.001));
  const percentage = (safeMinutes / STUDY_TANK_CAPACITY_MINUTES) * 100;

  const vesselScale = 0.98 + (safeMinutes / STUDY_TANK_CAPACITY_MINUTES) * 0.06;
  studyTankRewardFill.style.width = `${percentage}%`;
  studyTankRewardVessel.style.setProperty("--tank-vessel-scale", vesselScale.toFixed(4));
  studyTankRewardLevel.textContent = `${displayMinutes} / ${STUDY_TANK_CAPACITY_MINUTES}分`;
  studyTankRewardVessel.setAttribute("aria-valuenow", String(displayMinutes));
  studyTankRewardVessel.setAttribute("aria-valuetext", `${displayMinutes}分充填`);
}

function renderStudyTankRewardCount(completedTanks) {
  const safeCompletedTanks = Math.max(1, Math.floor(Number(completedTanks) || 1));
  const label = document.createElement("span");
  const multiplier = document.createElement("strong");

  label.className = "tank-reward-combo-label";
  label.textContent = "TANK";
  multiplier.className = "tank-reward-combo-count";
  multiplier.textContent = `×${safeCompletedTanks}`;

  studyTankRewardCombo.replaceChildren(label, multiplier);
  studyTankRewardCombo.dataset.digits = String(Math.min(3, String(safeCompletedTanks).length));
  studyTankRewardCombo.setAttribute("aria-label", `${safeCompletedTanks}タンク`);
  return safeCompletedTanks;
}

function pulseStudyTankReward(completedTanks, options = {}) {
  const card = studyTankReward?.querySelector(".tank-reward-card");
  if (!card || !studyTankRewardCombo) return;

  renderStudyTankRewardCount(completedTanks);
  studyTankRewardCombo.classList.add("has-value");

  const force = Boolean(options.force);
  const now = performance.now();
  if (!force && now - lastTankRewardPulseAt < 120) return;
  lastTankRewardPulseAt = now;

  card.classList.remove("tank-pulse");
  void card.offsetWidth;
  card.classList.add("tank-pulse");

  if (!force && studyTankReward.classList.contains("is-charging")) return;
  studyTankRewardCombo.classList.remove("show");
  void studyTankRewardCombo.offsetWidth;
  studyTankRewardCombo.classList.add("show");
}

function closeStudyTankReward() {
  if (!studyTankReward || studyTankReward.hidden) return;

  studyTankRewardToken += 1;
  cancelAnimationFrame(studyTankRewardAnimationFrame);
  clearTimeout(studyTankRewardCloseTimer);
  clearTimeout(studyTankRewardHideTimer);
  studyTankReward.classList.remove("show", "is-charging", "is-result");
  studyTankRewardHideTimer = window.setTimeout(() => {
    studyTankReward.hidden = true;
  }, 180);
}

function finishStudyTankReward(token, previousTotalMinutes, addedMinutes, earnedCoins) {
  if (token !== studyTankRewardToken || !studyTankReward) return;

  const startRemainder = previousTotalMinutes % STUDY_TANK_CAPACITY_MINUTES;
  const completedTanks = Math.floor((startRemainder + addedMinutes) / STUDY_TANK_CAPACITY_MINUTES);
  const finalLevel = getStudyTankLevel(previousTotalMinutes + addedMinutes);

  setStudyTankRewardVisual(finalLevel);
  studyTankReward.classList.remove("is-charging");
  studyTankReward.classList.add("is-result");
  studyTankRewardCoins.textContent = `+${earnedCoins} coin`;

  if (completedTanks > 0) {
    studyTankRewardTitle.textContent = completedTanks > 1
      ? `タンク ×${completedTanks} 達成！`
      : "タンク ×1 満タン！";
    studyTankRewardMessage.textContent = finalLevel < STUDY_TANK_CAPACITY_MINUTES
      ? `次のタンクに${finalLevel}分チャージ済み`
      : "10分の学習エネルギーが満タンです";
    pulseStudyTankReward(completedTanks, { force: true });
    playTankFullSound();
  } else {
    studyTankRewardTitle.textContent = "学習エネルギー獲得！";
    studyTankRewardMessage.textContent = `${finalLevel} / ${STUDY_TANK_CAPACITY_MINUTES}分までチャージしました`;
    playTankRewardCompleteSound();
  }

  clearTimeout(studyTankRewardCloseTimer);
  studyTankRewardCloseTimer = window.setTimeout(closeStudyTankReward, 1700);
}

function showStudyTankReward(previousTotalMinutes, session) {
  if (!studyTankReward || !session) return;

  cancelAnimationFrame(studyTankRewardAnimationFrame);
  clearTimeout(studyTankRewardCloseTimer);
  clearTimeout(studyTankRewardHideTimer);
  studyTankRewardToken += 1;
  const token = studyTankRewardToken;
  const safePreviousTotal = Math.max(0, Math.round(Number(previousTotalMinutes) || 0));
  const safeAddedMinutes = Math.max(1, Math.round(Number(session.minutes) || 1));
  const startRemainder = safePreviousTotal % STUDY_TANK_CAPACITY_MINUTES;
  const visualAddedMinutes = Math.min(safeAddedMinutes, DAILY_STUDY_LIMIT_MINUTES);
  const earnedCoins = Math.max(0, Math.round(Number(session.coinsEarned) || 0));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  studyTankReward.hidden = false;
  studyTankReward.classList.remove("show", "is-result");
  studyTankReward.classList.add("is-charging");
  studyTankRewardMinutes.textContent = `+${safeAddedMinutes}分`;
  studyTankRewardTitle.textContent = "学習エネルギーを充填中";
  studyTankRewardMessage.textContent = "記録した時間が1分ずつたまります";
  studyTankRewardCoins.textContent = `+${earnedCoins} coin`;
  studyTankRewardCombo.textContent = "";
  studyTankRewardCombo.classList.remove("show", "has-value");
  delete studyTankRewardCombo.dataset.digits;

  requestAnimationFrame(() => studyTankReward.classList.add("show"));
  playTankChargeStartSound();

  if (reduceMotion) {
    finishStudyTankReward(token, safePreviousTotal, safeAddedMinutes, earnedCoins);
    return;
  }

  const runAnimation = () => {
    const duration = getStudyTankAnimationDuration(visualAddedMinutes);
    const startedAt = performance.now();
    let previousCycle = 0;
    let previousSoundMinute = Math.floor(startRemainder);

    const step = (now) => {
      if (token !== studyTankRewardToken) return;

      const progress = Math.min(1, (now - startedAt) / duration);
      const visualMinutes = startRemainder + visualAddedMinutes * progress;
      const currentCycle = Math.floor(visualMinutes / STUDY_TANK_CAPACITY_MINUTES);

      if (currentCycle > previousCycle && progress < 1) {
        previousCycle = currentCycle;
        setStudyTankRewardVisual(STUDY_TANK_CAPACITY_MINUTES);
        pulseStudyTankReward(currentCycle);
        playTankFullSound();
        previousSoundMinute = Math.max(previousSoundMinute, currentCycle * STUDY_TANK_CAPACITY_MINUTES);
        studyTankRewardAnimationFrame = requestAnimationFrame(step);
        return;
      }

      setStudyTankRewardVisual(visualMinutes % STUDY_TANK_CAPACITY_MINUTES);
      const soundMinute = Math.floor(visualMinutes + 0.001);
      if (soundMinute > previousSoundMinute) {
        previousSoundMinute = soundMinute;
        playTankChargeTickSound(soundMinute % STUDY_TANK_CAPACITY_MINUTES);
      }

      if (progress < 1) {
        studyTankRewardAnimationFrame = requestAnimationFrame(step);
        return;
      }

      finishStudyTankReward(token, safePreviousTotal, safeAddedMinutes, earnedCoins);
    };

    studyTankRewardAnimationFrame = requestAnimationFrame(step);
  };

  if (safePreviousTotal > 0 && startRemainder === 0) {
    setStudyTankRewardVisual(STUDY_TANK_CAPACITY_MINUTES);
    pulseStudyTankReward(1);
    window.setTimeout(() => {
      if (token !== studyTankRewardToken) return;
      setStudyTankRewardVisual(0);
      runAnimation();
    }, 280);
    return;
  }

  setStudyTankRewardVisual(startRemainder);
  studyTankRewardAnimationFrame = requestAnimationFrame(runAnimation);
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(getTimerDisplaySeconds());
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
    coins.textContent = `+${session.coinsEarned ?? session.coins ?? getEarnedCoins(session.minutes)} coin`;

    detail.append(title, meta);
    item.append(detail, coins);
    historyList.appendChild(item);
  });
}

function renderWeeklyDurationLabel(element, minutes) {
  const totalMinutes = Math.max(0, Math.round(Number(minutes) || 0));
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const fullLabel = formatStudyDuration(totalMinutes);
  const parts = hours > 0
    ? [`${hours}時間`, ...(remainingMinutes > 0 ? [`${remainingMinutes}分`] : [])]
    : [`${remainingMinutes}分`];

  element.className = `week-bar-value${parts.length > 1 ? " is-split" : ""}`;
  element.textContent = "";
  element.setAttribute("aria-label", fullLabel);
  element.title = fullLabel;

  parts.forEach((part) => {
    const line = document.createElement("span");
    line.className = "week-time-part";
    line.textContent = part;
    element.appendChild(line);
  });
}

function getSessionSubject(session) {
  return String(session?.subject || "").trim() || "集中学習";
}

function getDaySubjectTotals(day) {
  const key = toDateKey(day);
  const totals = new Map();

  state.sessions.forEach((session) => {
    if (toDateKey(parseSessionDate(session.date)) !== key) return;

    const subject = getSessionSubject(session);
    totals.set(subject, (totals.get(subject) || 0) + session.minutes);
  });

  return totals;
}

function getKnownSubjectOrder() {
  const ordered = [];
  const seen = new Set();
  const addSubject = (subject) => {
    const name = String(subject || "").trim();
    if (!name || seen.has(name)) return;
    seen.add(name);
    ordered.push(name);
  };

  [...state.sessions].reverse().forEach((session) => addSubject(getSessionSubject(session)));
  [...state.subjects].reverse().forEach(addSubject);
  return ordered;
}

function getWeeklySubjectVisual(subject, knownSubjectOrder) {
  const knownIndex = knownSubjectOrder.indexOf(subject);
  const index = knownIndex >= 0 ? knownIndex : knownSubjectOrder.length;

  return {
    color: WEEKLY_SUBJECT_COLORS[index % WEEKLY_SUBJECT_COLORS.length],
    pattern: Math.floor(index / WEEKLY_SUBJECT_COLORS.length) % 3,
  };
}

function renderWeeklyLegend(subjectNames, subjectTotals, subjectVisuals) {
  if (!weekLegend) return;

  weekLegend.innerHTML = "";
  weekLegend.hidden = subjectNames.length === 0;

  subjectNames.forEach((subject) => {
    const visual = subjectVisuals.get(subject);
    const item = document.createElement("div");
    const swatch = document.createElement("span");
    const name = document.createElement("strong");
    const duration = document.createElement("small");
    const subjectMinutes = subjectTotals.get(subject) || 0;

    item.className = "week-legend-item";
    item.title = `${subject} ${formatStudyDuration(subjectMinutes)}`;
    swatch.className = `week-legend-swatch week-pattern-${visual.pattern}`;
    swatch.style.setProperty("--subject-color", visual.color);
    swatch.setAttribute("aria-hidden", "true");
    name.textContent = subject;
    duration.textContent = formatStudyDuration(subjectMinutes);

    item.append(swatch, name, duration);
    weekLegend.appendChild(item);
  });
}

function renderWeeklyChart() {
  const days = getWeekDays(weekOffset);
  const previousDays = getWeekDays(weekOffset - 1);
  const daySubjectTotals = days.map((day) => getDaySubjectTotals(day));
  const totals = daySubjectTotals.map((subjectTotals) => (
    [...subjectTotals.values()].reduce((sum, minutes) => sum + minutes, 0)
  ));
  const previousTotal = previousDays.reduce((sum, day) => sum + getDayTotal(day), 0);
  const weeklyTotal = totals.reduce((sum, minutes) => sum + minutes, 0);
  const weekDifference = weeklyTotal - previousTotal;
  const maxMinutes = Math.max(60, ...totals);
  const labels = ["月", "火", "水", "木", "金", "土", "日"];
  const weeklySubjectTotals = new Map();

  daySubjectTotals.forEach((subjectTotals) => {
    subjectTotals.forEach((minutes, subject) => {
      weeklySubjectTotals.set(subject, (weeklySubjectTotals.get(subject) || 0) + minutes);
    });
  });

  const knownSubjectOrder = getKnownSubjectOrder();
  const subjectNames = [...weeklySubjectTotals.keys()].sort((subjectA, subjectB) => {
    const indexA = knownSubjectOrder.indexOf(subjectA);
    const indexB = knownSubjectOrder.indexOf(subjectB);
    if (indexA !== indexB) return indexA - indexB;
    return subjectA.localeCompare(subjectB, "ja");
  });
  const subjectVisuals = new Map(subjectNames.map((subject) => [
    subject,
    getWeeklySubjectVisual(subject, knownSubjectOrder),
  ]));

  weekChart.innerHTML = "";
  renderWeeklyLegend(subjectNames, weeklySubjectTotals, subjectVisuals);
  weekTotal.textContent = `週合計 ${formatStudyDuration(weeklyTotal)}`;
  weekLabel.textContent = `${formatDateLabel(days[0])} - ${formatDateLabel(days[6])}`;
  weekCompare.textContent = `前週との差 ${weekDifference >= 0 ? "+" : "-"}${formatStudyDuration(Math.abs(weekDifference))}`;
  nextWeekBtn.disabled = weekOffset >= 0;

  totals.forEach((minutes, index) => {
    const bar = document.createElement("div");
    const stack = document.createElement("div");
    const value = document.createElement("strong");
    const label = document.createElement("small");
    const subjectTotals = daySubjectTotals[index];

    bar.className = "week-bar";
    stack.className = "week-bar-stack";
    stack.hidden = minutes <= 0;
    stack.style.height = minutes > 0 ? `${Math.max(8, (minutes / maxMinutes) * 100)}%` : "0%";

    subjectNames.forEach((subject) => {
      const subjectMinutes = subjectTotals.get(subject) || 0;
      if (subjectMinutes <= 0 || minutes <= 0) return;

      const visual = subjectVisuals.get(subject);
      const segment = document.createElement("span");
      segment.className = `week-subject-segment week-pattern-${visual.pattern}`;
      segment.style.setProperty("--subject-color", visual.color);
      segment.style.flexBasis = `${(subjectMinutes / minutes) * 100}%`;
      segment.title = `${subject} ${formatStudyDuration(subjectMinutes)}`;
      segment.setAttribute("aria-hidden", "true");
      stack.appendChild(segment);
    });

    renderWeeklyDurationLabel(value, minutes);
    label.textContent = labels[index];
    const breakdown = subjectNames
      .filter((subject) => (subjectTotals.get(subject) || 0) > 0)
      .map((subject) => `${subject} ${formatStudyDuration(subjectTotals.get(subject))}`)
      .join("、");
    bar.setAttribute("aria-label", `${labels[index]}曜日 合計${formatStudyDuration(minutes)}${breakdown ? `、${breakdown}` : ""}`);
    bar.title = `${labels[index]}曜日 ${formatStudyDuration(minutes)}`;

    bar.append(value, stack, label);
    weekChart.appendChild(bar);
  });
}

function getDayTotal(day) {
  const key = toDateKey(day);

  return state.sessions
    .filter((session) => toDateKey(parseSessionDate(session.date)) === key)
    .reduce((sum, session) => sum + session.minutes, 0);
}

function shortenShareLabel(value, maxLength = 24) {
  const label = String(value || "").trim();
  return label.length > maxLength ? `${label.slice(0, maxLength - 1)}…` : label;
}

function getShareSummary() {
  const todayMinutes = getDayTotal(new Date());
  const weekDays = getWeekDays(0);
  const previousWeekDays = getWeekDays(-1);
  const weeklyMinutes = weekDays.reduce((sum, day) => sum + getDayTotal(day), 0);
  const previousWeeklyMinutes = previousWeekDays.reduce((sum, day) => sum + getDayTotal(day), 0);
  const weekDifference = weeklyMinutes - previousWeeklyMinutes;
  const streak = getStudyStreak();
  const clothingId = state.customization.clothing || null;
  const accessoryIds = getEquippedAccessoryIds().filter((id) => shopItems[id]);
  const equippedNames = [clothingId, ...accessoryIds]
    .filter((id) => id && shopItems[id])
    .map((id) => shopItems[id].name);
  const furnitureId = state.customization.furniture || null;
  const backgroundId = state.customization.background || null;
  const furnitureName = shopItems[furnitureId]?.name || "";
  const backgroundName = shopItems[backgroundId]?.name || "いつもの勉強部屋";
  const outfitLabel = equippedNames.length > 0
    ? equippedNames.length > 2
      ? `${equippedNames.slice(0, 2).join("・")}ほか`
      : equippedNames.join("・")
    : "いつものスタイル";
  const placeLabel = [backgroundName, furnitureName].filter(Boolean).join("・");
  let headline = "ここから最初の一歩";
  let praise = "これからの積み重ねが、Flowletの成長につながります。";

  if (weeklyMinutes >= 1200) {
    headline = `今週${formatStudyDuration(weeklyMinutes)}を達成！`;
    praise = "大きな積み重ねになりました。Flowletも誇らしそうです。";
  } else if (streak >= 7) {
    headline = `${streak}日連続で積み上げ中！`;
    praise = "続けてきた日々が、しっかり記録に残っています。";
  } else if (todayMinutes >= 180) {
    headline = `今日${formatStudyDuration(todayMinutes)}、やり切りました！`;
    praise = "集中した時間が、今日の大きな成果になりました。";
  } else if (weekDifference > 0 && previousWeeklyMinutes > 0) {
    headline = `前週より${formatStudyDuration(weekDifference)}アップ！`;
    praise = "先週の自分を少し越えた記録です。";
  } else if (todayMinutes >= 25) {
    headline = "今日も集中を積み上げました";
    praise = "取り組んだ時間が、Flowletの成長につながっています。";
  } else if (todayMinutes > 0) {
    headline = "今日も一歩、進みました";
    praise = "短い時間も、続けた記録として残っています。";
  } else if (weeklyMinutes > 0) {
    headline = "今週の頑張りを記録しました";
    praise = "今週ここまで進めた時間を、1枚にまとめました。";
  }

  return {
    todayMinutes,
    weeklyMinutes,
    previousWeeklyMinutes,
    weekDifference,
    streak,
    level: getLevel(),
    headline,
    praise,
    clothingId,
    accessoryIds,
    furnitureId,
    backgroundId,
    outfitLabel: shortenShareLabel(outfitLabel),
    placeLabel: shortenShareLabel(placeLabel),
  };
}

function renderSharePanel() {
  if (!shareCardPreview) return;

  const summary = getShareSummary();
  shareHeadline.textContent = summary.headline;
  sharePraise.textContent = summary.praise;
  shareToday.textContent = formatStudyDuration(summary.todayMinutes);
  shareWeek.textContent = formatStudyDuration(summary.weeklyMinutes);
  shareLevel.textContent = summary.level;
  shareOutfit.textContent = summary.outfitLabel;
  shareBackground.textContent = summary.placeLabel;
  shareCardPreview.dataset.hasProgress = summary.weeklyMinutes > 0 ? "true" : "false";
  renderPetPreview(sharePetStage, sharePet, null);
}

function createRoundedPath(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function fillRoundedRect(context, x, y, width, height, radius, fillStyle) {
  createRoundedPath(context, x, y, width, height, radius);
  context.fillStyle = fillStyle;
  context.fill();
}

function setShareCanvasFont(context, size, weight = 700) {
  context.font = `${weight} ${size}px system-ui, -apple-system, "Yu Gothic", "Meiryo", sans-serif`;
}

function drawWrappedCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines = 2) {
  const characters = Array.from(String(text));
  const lines = [];
  let line = "";

  characters.forEach((character) => {
    const nextLine = line + character;
    if (line && context.measureText(nextLine).width > maxWidth) {
      lines.push(line);
      line = character;
    } else {
      line = nextLine;
    }
  });

  if (line) lines.push(line);
  const visibleLines = lines.slice(0, maxLines);

  if (lines.length > maxLines && visibleLines.length > 0) {
    visibleLines[maxLines - 1] = `${visibleLines[maxLines - 1].slice(0, -1)}…`;
  }

  visibleLines.forEach((visibleLine, index) => {
    context.fillText(visibleLine, x, y + index * lineHeight);
  });
}

function drawShareStar(context, x, y, radius, color = "#f3b63f") {
  context.save();
  context.translate(x, y);
  context.beginPath();
  for (let index = 0; index < 10; index += 1) {
    const angle = -Math.PI / 2 + (Math.PI * index) / 5;
    const pointRadius = index % 2 === 0 ? radius : radius * 0.42;
    const pointX = Math.cos(angle) * pointRadius;
    const pointY = Math.sin(angle) * pointRadius;
    if (index === 0) context.moveTo(pointX, pointY);
    else context.lineTo(pointX, pointY);
  }
  context.closePath();
  context.fillStyle = color;
  context.fill();
  context.restore();
}

function getShareBackgroundTheme(backgroundId) {
  const fallbackByTime = {
    morning: { sky: "#f5dfae", ground: "#d9edc9", accent: "#f4b65a", motif: "room" },
    day: { sky: "#d9eef5", ground: "#dff0d5", accent: "#7fbf87", motif: "room" },
    night: { sky: "#d8d5ef", ground: "#eee2bd", accent: "#8b78b7", motif: "night" },
  };
  const themes = {
    simpleRoom: { sky: "#dceef3", ground: "#dfeeda", accent: "#7fbf87", motif: "room" },
    focusRoom: { sky: "#eadfcf", ground: "#e4cda8", accent: "#bf8b55", motif: "room" },
    morningForest: { sky: "#d8eef0", ground: "#b9d7a5", accent: "#5f9a68", motif: "forest" },
    libraryStudy: { sky: "#d9c8a7", ground: "#ba8e5d", accent: "#805737", motif: "library" },
    moonLibrary: { sky: "#2e3456", ground: "#6f6380", accent: "#f1d889", motif: "library" },
    starMagicLibrary: { sky: "#282347", ground: "#574777", accent: "#f4df83", motif: "magic" },
    rainyWindowRoom: { sky: "#a9c6d5", ground: "#c7d9d5", accent: "#6e94aa", motif: "rain" },
    celestialArchive: { sky: "#171d42", ground: "#3d4174", accent: "#f1d77b", motif: "magic" },
    springPark: { sky: "#f4dce5", ground: "#cde4bd", accent: "#e79eae", motif: "spring" },
    summerSeaside: { sky: "#a9dcf1", ground: "#f1dea4", accent: "#3e9fc8", motif: "sea" },
    autumnTown: { sky: "#eed3a2", ground: "#b8906d", accent: "#c4693f", motif: "town" },
    winterSnowCountry: { sky: "#cbdce8", ground: "#f5f8fa", accent: "#7ba3bd", motif: "snow" },
    desertOasis: { sky: "#f3d38d", ground: "#d8a45d", accent: "#4ca9a1", motif: "desert" },
    japaneseTown: { sky: "#e4c8b5", ground: "#9d8c83", accent: "#a9473f", motif: "japanese" },
    thunderSky: { sky: "#34374f", ground: "#6d7280", accent: "#f1cf58", motif: "thunder" },
    floatingIsland: { sky: "#9dd5e9", ground: "#dbe9e8", accent: "#7fbd82", motif: "floating" },
    underwaterTemple: { sky: "#63b5c8", ground: "#287e98", accent: "#c4eddf", motif: "underwater" },
  };

  return themes[backgroundId] || fallbackByTime[getTimePeriod()] || fallbackByTime.day;
}

function drawShareStageBackground(context, summary, box) {
  const theme = getShareBackgroundTheme(summary.backgroundId);
  const { x, y, width, height } = box;
  context.save();
  createRoundedPath(context, x, y, width, height, 36);
  context.clip();
  const gradient = context.createLinearGradient(0, y, 0, y + height);
  gradient.addColorStop(0, theme.sky);
  gradient.addColorStop(0.6, theme.sky);
  gradient.addColorStop(0.605, theme.ground);
  gradient.addColorStop(1, theme.ground);
  context.fillStyle = gradient;
  context.fillRect(x, y, width, height);

  if (["library", "magic"].includes(theme.motif)) {
    context.fillStyle = "rgba(73, 49, 46, 0.58)";
    for (let shelf = 0; shelf < 3; shelf += 1) {
      const shelfY = y + 78 + shelf * 88;
      context.fillRect(x + 40, shelfY, 268, 12);
      for (let book = 0; book < 7; book += 1) {
        context.fillStyle = ["#8eb7a0", "#d39a67", "#8b80aa"][book % 3];
        context.fillRect(x + 48 + book * 36, shelfY - 52 - (book % 2) * 8, 25, 52 + (book % 2) * 8);
      }
      context.fillStyle = "rgba(73, 49, 46, 0.58)";
    }
  } else if (theme.motif === "forest" || theme.motif === "spring") {
    for (let tree = 0; tree < 4; tree += 1) {
      const treeX = x + 60 + tree * 150;
      context.fillStyle = "#765c42";
      context.fillRect(treeX, y + 145, 18, 190);
      context.fillStyle = theme.motif === "spring" ? "#e8a8b7" : "#71ad76";
      context.beginPath();
      context.arc(treeX + 9, y + 125, 58, 0, Math.PI * 2);
      context.fill();
    }
  } else if (theme.motif === "sea") {
    context.strokeStyle = "rgba(255, 255, 255, 0.8)";
    context.lineWidth = 8;
    for (let wave = 0; wave < 3; wave += 1) {
      context.beginPath();
      context.moveTo(x, y + 260 + wave * 34);
      context.bezierCurveTo(x + 220, y + 220 + wave * 34, x + 420, y + 300 + wave * 34, x + width, y + 255 + wave * 34);
      context.stroke();
    }
  } else if (theme.motif === "snow") {
    context.fillStyle = "rgba(255, 255, 255, 0.92)";
    for (let index = 0; index < 18; index += 1) {
      context.beginPath();
      context.arc(x + 40 + (index * 71) % width, y + 36 + (index * 53) % 230, 4 + (index % 3), 0, Math.PI * 2);
      context.fill();
    }
  } else if (theme.motif === "rain") {
    context.strokeStyle = "rgba(255, 255, 255, 0.58)";
    context.lineWidth = 4;
    for (let index = 0; index < 18; index += 1) {
      const rainX = x + 24 + index * 62;
      context.beginPath();
      context.moveTo(rainX, y + 28 + (index % 4) * 24);
      context.lineTo(rainX - 14, y + 78 + (index % 4) * 24);
      context.stroke();
    }
  } else if (theme.motif === "desert") {
    context.fillStyle = "rgba(255, 238, 182, 0.65)";
    context.beginPath();
    context.ellipse(x + 260, y + 345, 310, 98, -0.08, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = theme.accent;
    context.beginPath();
    context.ellipse(x + 190, y + 372, 88, 25, 0, 0, Math.PI * 2);
    context.fill();
  } else if (theme.motif === "thunder") {
    context.fillStyle = theme.accent;
    context.beginPath();
    context.moveTo(x + 230, y + 38);
    context.lineTo(x + 185, y + 168);
    context.lineTo(x + 245, y + 152);
    context.lineTo(x + 202, y + 284);
    context.lineTo(x + 326, y + 118);
    context.lineTo(x + 257, y + 131);
    context.closePath();
    context.fill();
  } else if (theme.motif === "underwater") {
    context.strokeStyle = "rgba(215, 244, 238, 0.72)";
    context.lineWidth = 10;
    for (let column = 0; column < 3; column += 1) {
      context.strokeRect(x + 72 + column * 190, y + 140, 62, 245);
    }
    context.strokeStyle = "rgba(255, 255, 255, 0.7)";
    context.lineWidth = 4;
    for (let bubble = 0; bubble < 12; bubble += 1) {
      context.beginPath();
      context.arc(x + 35 + (bubble * 91) % width, y + 45 + (bubble * 47) % 265, 7 + bubble % 5, 0, Math.PI * 2);
      context.stroke();
    }
  } else if (theme.motif === "floating") {
    context.fillStyle = "rgba(255, 255, 255, 0.78)";
    for (let cloud = 0; cloud < 4; cloud += 1) {
      context.beginPath();
      context.ellipse(x + 130 + cloud * 245, y + 290 - (cloud % 2) * 78, 120, 38, 0, 0, Math.PI * 2);
      context.fill();
    }
    context.fillStyle = theme.accent;
    context.beginPath();
    context.ellipse(x + 250, y + 170, 130, 48, -0.1, 0, Math.PI * 2);
    context.fill();
  } else if (theme.motif === "japanese" || theme.motif === "town") {
    context.fillStyle = "rgba(91, 61, 49, 0.68)";
    for (let house = 0; house < 3; house += 1) {
      const houseX = x + 42 + house * 172;
      context.fillRect(houseX, y + 185, 132, 165);
      context.beginPath();
      context.moveTo(houseX - 18, y + 188);
      context.lineTo(houseX + 66, y + 122);
      context.lineTo(houseX + 150, y + 188);
      context.closePath();
      context.fill();
    }
  } else {
    context.fillStyle = "rgba(255, 255, 255, 0.55)";
    context.fillRect(x + 64, y + 58, 210, 150);
    context.strokeStyle = "rgba(88, 112, 91, 0.25)";
    context.lineWidth = 6;
    context.strokeRect(x + 64, y + 58, 210, 150);
    context.beginPath();
    context.moveTo(x + 169, y + 58);
    context.lineTo(x + 169, y + 208);
    context.moveTo(x + 64, y + 133);
    context.lineTo(x + 274, y + 133);
    context.stroke();
  }

  if (["night", "magic"].includes(theme.motif)) {
    for (let index = 0; index < 13; index += 1) {
      drawShareStar(context, x + 40 + (index * 79) % width, y + 32 + (index * 57) % 225, 5 + index % 4, theme.accent);
    }
  }

  context.restore();
  createRoundedPath(context, x, y, width, height, 36);
  context.strokeStyle = "rgba(255, 255, 255, 0.72)";
  context.lineWidth = 4;
  context.stroke();
}

function drawShareFurniture(context, furnitureId, x, floorY) {
  if (!furnitureId) return;

  context.save();
  context.fillStyle = "rgba(53, 58, 48, 0.18)";
  context.beginPath();
  context.ellipse(x, floorY + 8, 92, 18, 0, 0, Math.PI * 2);
  context.fill();

  if (furnitureId === "studyPlant") {
    context.fillStyle = "#b67f4b";
    fillRoundedRect(context, x - 42, floorY - 92, 84, 88, 18, "#b67f4b");
    context.fillStyle = "#6aaa72";
    [-48, -20, 18, 48].forEach((offset, index) => {
      context.beginPath();
      context.ellipse(x + offset / 2, floorY - 125 - (index % 2) * 25, 30, 58, offset / 95, 0, Math.PI * 2);
      context.fill();
    });
  } else if (furnitureId === "bookShelf") {
    fillRoundedRect(context, x - 82, floorY - 210, 164, 206, 10, "#805737");
    for (let shelf = 0; shelf < 3; shelf += 1) {
      context.fillStyle = "#f4e5bd";
      context.fillRect(x - 66, floorY - 188 + shelf * 61, 132, 43);
      for (let book = 0; book < 4; book += 1) {
        context.fillStyle = ["#79aa82", "#d68e62", "#8c81ad"][book % 3];
        context.fillRect(x - 57 + book * 30, floorY - 181 + shelf * 61, 20, 36);
      }
    }
  } else if (furnitureId === "studyLamp") {
    context.fillStyle = "rgba(255, 228, 137, 0.28)";
    context.beginPath();
    context.arc(x, floorY - 145, 92, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "#795f43";
    context.lineWidth = 12;
    context.beginPath();
    context.moveTo(x, floorY - 120);
    context.lineTo(x, floorY - 12);
    context.stroke();
    fillRoundedRect(context, x - 54, floorY - 176, 108, 62, 28, "#f3c65e");
  } else if (furnitureId === "floatingBooks") {
    for (let book = 0; book < 4; book += 1) {
      context.save();
      context.translate(x - 65 + book * 42, floorY - 85 - (book % 2) * 60);
      context.rotate((book - 1.5) * 0.13);
      fillRoundedRect(context, -38, -14, 76, 28, 6, ["#78a881", "#cf8d64", "#8478aa"][book % 3]);
      context.restore();
    }
  } else if (furnitureId === "starlightStudySet") {
    context.strokeStyle = "#6d5a43";
    context.lineWidth = 9;
    context.beginPath();
    context.arc(x, floorY - 116, 68, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = "#7fb7cf";
    context.beginPath();
    context.arc(x, floorY - 116, 45, 0, Math.PI * 2);
    context.fill();
    drawShareStar(context, x + 4, floorY - 120, 17, "#f4dc80");
  } else {
    context.fillStyle = "#8c623f";
    context.fillRect(x - 105, floorY - 92, 210, 24);
    context.fillRect(x - 82, floorY - 70, 18, 70);
    context.fillRect(x + 64, floorY - 70, 18, 70);
  }
  context.restore();
}

function drawShareOwlSvgPath(context, pathData, fill, stroke = "#6c5436", lineWidth = 4.5) {
  const path = new Path2D(pathData);

  context.fillStyle = fill;
  context.fill(path);
  if (!stroke) return;

  context.strokeStyle = stroke;
  context.lineWidth = lineWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke(path);
}

function inShareOwlSvgSpace(context, drawLayer) {
  context.save();
  context.scale(2.3, 2.3);
  context.translate(-90, -95);
  drawLayer();
  context.restore();
}

function drawShareOwlBack(context) {
  inShareOwlSvgSpace(context, () => {
    drawShareOwlSvgPath(context, "M57 43 C51 26 62 18 77 33 C68 36 62 41 58 51 Z", "#edc77e");
    drawShareOwlSvgPath(context, "M123 43 C129 26 118 18 103 33 C112 36 118 41 122 51 Z", "#edc77e");
    drawShareOwlSvgPath(context, "M90 18 C126 18 151 46 151 90 C151 139 126 166 90 166 C54 166 29 139 29 90 C29 46 54 18 90 18 Z", "#edc77e");
    drawShareOwlSvgPath(context, "M47 88 C30 97 28 125 41 142 C55 132 58 108 56 92 Z", "#cfe7bd");
    drawShareOwlSvgPath(context, "M133 88 C150 97 152 125 139 142 C125 132 122 108 124 92 Z", "#cfe7bd");
  });
}

function drawShareOwlFront(context) {
  inShareOwlSvgSpace(context, () => {
    drawShareOwlSvgPath(context, "M90 37 C115 37 132 55 132 78 C132 101 114 116 90 116 C66 116 48 101 48 78 C48 55 65 37 90 37 Z", "#f8e2b5");
    drawShareOwlSvgPath(context, "M89 76 C80 55 58 52 51 68 C43 87 58 108 82 108 C90 101 94 88 89 76 Z", "#fffdf7");
    drawShareOwlSvgPath(context, "M91 76 C100 55 122 52 129 68 C137 87 122 108 98 108 C90 101 86 88 91 76 Z", "#fffdf7");
    drawShareOwlSvgPath(context, "M90 92 C112 92 127 111 127 133 C127 154 112 165 90 165 C68 165 53 154 53 133 C53 111 68 92 90 92 Z", "#fffdf7");

    context.fillStyle = "#dceecf";
    context.globalAlpha = 0.9;
    context.beginPath();
    context.arc(64, 94, 7, 0, Math.PI * 2);
    context.arc(116, 94, 7, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;

    context.fillStyle = "#263126";
    context.beginPath();
    context.arc(68, 77, 6.5, 0, Math.PI * 2);
    context.arc(112, 77, 6.5, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#fffdf7";
    context.beginPath();
    context.arc(70.5, 74.5, 1.7, 0, Math.PI * 2);
    context.arc(114.5, 74.5, 1.7, 0, Math.PI * 2);
    context.fill();

    drawShareOwlSvgPath(context, "M90 93 L78 80 L102 80 Z", "#f3b63f", "#6c5436", 3.5);
    drawShareOwlSvgPath(context, "M63 160 C55 160 51 164 51 171 C58 168 65 168 72 171 C73 164 70 160 63 160 Z", "#f3b63f");
    drawShareOwlSvgPath(context, "M117 160 C125 160 129 164 129 171 C122 168 115 168 108 171 C107 164 110 160 117 160 Z", "#f3b63f");
  });
}

function drawShareOwl(context, summary, centerX, centerY) {
  const clothing = shopItems[summary.clothingId];
  const accessoryIds = summary.accessoryIds;
  const rarityColors = {
    common: "#9bcd9d",
    uncommon: "#73b797",
    rare: "#6f92c8",
    epic: "#8c73bd",
    legendary: "#f1c95f",
  };
  context.save();
  context.translate(centerX, centerY);

  context.fillStyle = "rgba(54, 68, 49, 0.18)";
  context.beginPath();
  context.ellipse(0, 168, 138, 24, 0, 0, Math.PI * 2);
  context.fill();

  drawShareOwlBack(context);

  if (clothing) {
    const clothingColor = rarityColors[clothing.rarity] || rarityColors.common;
    if (summary.clothingId === "simpleScarf") {
      fillRoundedRect(context, -128, 26, 256, 48, 24, clothingColor);
      fillRoundedRect(context, 72, 56, 48, 102, 20, clothingColor);
    } else {
      context.fillStyle = clothingColor;
      context.beginPath();
      context.moveTo(-116, 46);
      context.quadraticCurveTo(-132, 154, -76, 178);
      context.quadraticCurveTo(0, 204, 76, 178);
      context.quadraticCurveTo(132, 154, 116, 46);
      context.quadraticCurveTo(0, 88, -116, 46);
      context.fill();
      context.strokeStyle = "rgba(77, 67, 52, 0.62)";
      context.lineWidth = 6;
      context.stroke();
      context.fillStyle = "rgba(255, 255, 255, 0.55)";
      context.beginPath();
      context.moveTo(-52, 54);
      context.lineTo(0, 92);
      context.lineTo(52, 54);
      context.lineTo(35, 116);
      context.lineTo(-35, 116);
      context.closePath();
      context.fill();
      if (["starMantle", "sageRobe", "auroraCloak"].includes(summary.clothingId)) {
        [[-62, 132], [2, 154], [66, 126], [-6, 112]].forEach(([starX, starY]) => {
          drawShareStar(context, starX, starY, 10, summary.clothingId === "auroraCloak" ? "#d6f4ec" : "#fff0a8");
        });
      }
    }
  }

  drawShareOwlFront(context);

  accessoryIds.forEach((itemId) => {
    if (itemId === "acornBeret" || itemId === "quillHat") {
      fillRoundedRect(context, -98, -180, 196, 48, 24, itemId === "acornBeret" ? "#9a6844" : "#5d7c60");
      context.fillStyle = itemId === "acornBeret" ? "#7b5034" : "#415c47";
      context.beginPath();
      context.ellipse(0, -156, 110, 28, 0, 0, Math.PI * 2);
      context.fill();
      if (itemId === "quillHat") {
        context.strokeStyle = "#f2d590";
        context.lineWidth = 9;
        context.beginPath();
        context.moveTo(62, -174);
        context.quadraticCurveTo(118, -244, 138, -196);
        context.stroke();
      }
    } else if (itemId === "smallRibbon") {
      context.fillStyle = "#f1c75f";
      context.beginPath();
      context.ellipse(-70, -142, 34, 22, -0.35, 0, Math.PI * 2);
      context.ellipse(-18, -142, 34, 22, 0.35, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.arc(-44, -140, 13, 0, Math.PI * 2);
      context.fill();
    } else if (["starScarf", "moonPin"].includes(itemId)) {
      if (itemId === "starScarf") drawShareStar(context, 88, -125, 26, "#f5d45f");
      else {
        context.fillStyle = "#f5d879";
        context.beginPath();
        context.arc(88, -125, 27, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = "#e8b86f";
        context.beginPath();
        context.arc(100, -136, 24, 0, Math.PI * 2);
        context.fill();
      }
    } else if (itemId === "glowingCrown") {
      context.fillStyle = "rgba(255, 224, 108, 0.24)";
      context.beginPath();
      context.arc(0, -154, 108, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#f3cb55";
      context.beginPath();
      context.moveTo(-82, -132);
      context.lineTo(-72, -204);
      context.lineTo(-28, -166);
      context.lineTo(0, -220);
      context.lineTo(34, -166);
      context.lineTo(76, -204);
      context.lineTo(84, -132);
      context.closePath();
      context.fill();
    } else if (itemId === "studyPencil") {
      context.save();
      context.translate(-114, 82);
      context.rotate(-0.55);
      fillRoundedRect(context, -8, -58, 16, 116, 7, "#f1b84b");
      context.restore();
    } else if (itemId === "cloverCape") {
      context.fillStyle = "#66a96e";
      context.beginPath();
      context.arc(72, 50, 15, 0, Math.PI * 2);
      context.arc(94, 50, 15, 0, Math.PI * 2);
      context.arc(82, 32, 15, 0, Math.PI * 2);
      context.fill();
    } else if (itemId === "bookCharm") {
      fillRoundedRect(context, -34, 58, 68, 54, 8, "#6e9d78");
      context.strokeStyle = "#f1d58c";
      context.lineWidth = 4;
      context.strokeRect(-27, 65, 54, 40);
    } else if (itemId === "starOrbit") {
      [[-142, -36], [142, -10], [-112, 86], [126, 104]].forEach(([starX, starY], index) => {
        drawShareStar(context, starX, starY, 13 + index % 2 * 4, "#f5d45f");
      });
    }
  });

  context.restore();
}

function getShareDocumentCssText() {
  return Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules, (rule) => rule.cssText).join("\n");
      } catch {
        return "";
      }
    })
    .filter(Boolean)
    .join("\n");
}

function escapeShareXmlText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function createShareStageMarkup(width, height) {
  const sourceStage = document.querySelector("#timerScreen .pet-stage");
  if (!sourceStage) throw new Error("Share stage source is missing");

  const stage = sourceStage.cloneNode(true);
  stage.className = "pet-stage share-export-stage";
  stage.removeAttribute("aria-label");
  stage.querySelector(".study-reaction")?.remove();
  stage.querySelector(".pet-action-prop")?.remove();

  const pet = stage.querySelector('.pet[data-asset="flowl-owl"]');
  if (!pet) throw new Error("Share owl source is missing");

  pet.className = "pet idle";
  pet.dataset.asset = "flowl-owl";
  pet.querySelectorAll(".pet-equipment").forEach((layer) => layer.remove());
  renderPetPreview(stage, pet, null);

  stage.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
  stage.style.width = `${width}px`;
  stage.style.height = `${height}px`;
  stage.style.minHeight = `${height}px`;
  stage.style.maxHeight = `${height}px`;

  return new XMLSerializer().serializeToString(stage);
}

function createShareStageSvg(summary, width, height) {
  const stageMarkup = createShareStageMarkup(width, height);
  const documentCss = escapeShareXmlText(getShareDocumentCssText());
  const exportCss = escapeShareXmlText(`
    * { box-sizing: border-box; }
    html, body, .share-stage-export-host {
      width: ${width}px;
      height: ${height}px;
      margin: 0;
      overflow: hidden;
    }
    .share-export-stage {
      position: relative !important;
      display: grid !important;
      place-items: center !important;
      width: ${width}px !important;
      height: ${height}px !important;
      min-height: ${height}px !important;
      max-height: ${height}px !important;
      padding: 8px !important;
      overflow: hidden !important;
      border: 0 !important;
      border-radius: 18px !important;
      box-shadow: none !important;
    }
    .share-export-stage .pet[data-asset="flowl-owl"] {
      position: relative !important;
      width: 170px !important;
      height: 180px !important;
      margin: 0 !important;
      animation: none !important;
      transform: none !important;
    }
    .share-export-stage .owl-svg,
    .share-export-stage .owl-root,
    .share-export-stage .owl-head,
    .share-export-stage .pet-wing,
    .share-export-stage .eye,
    .share-export-stage .owl-beak {
      animation: none !important;
    }
    .share-export-stage .pet-shadow {
      bottom: 17px !important;
      width: 124px !important;
      height: 14px !important;
    }
  `);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject x="0" y="0" width="${width}" height="${height}">
        <div xmlns="http://www.w3.org/1999/xhtml" class="share-stage-export-host">
          <style>${documentCss}\n${exportCss}</style>
          ${stageMarkup}
        </div>
      </foreignObject>
    </svg>
  `;
}

function drawShareStageFromApp(context, summary, box) {
  const sourceWidth = Math.round(box.width / 2);
  const sourceHeight = Math.round(box.height / 2);
  const svg = createShareStageSvg(summary, sourceWidth, sourceHeight);
  const imageUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      context.save();
      createRoundedPath(context, box.x, box.y, box.width, box.height, 36);
      context.clip();
      context.drawImage(image, box.x, box.y, box.width, box.height);
      context.restore();
      resolve();
    };
    image.onerror = () => {
      reject(new Error("Share stage rendering failed"));
    };
    image.src = imageUrl;
  });
}

function drawShareMetric(context, label, value, x, y, width, accent) {
  fillRoundedRect(context, x, y, width, 130, 24, "rgba(255, 255, 255, 0.84)");
  context.fillStyle = accent;
  fillRoundedRect(context, x, y, 9, 130, 5, accent);
  context.fillStyle = "#6b7c70";
  setShareCanvasFont(context, 24, 800);
  context.fillText(label, x + 34, y + 42);
  context.fillStyle = "#203f2a";
  setShareCanvasFont(context, 42, 900);
  context.fillText(value, x + 34, y + 96);
}

async function createShareCanvas(summary = getShareSummary()) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1200;
  const context = canvas.getContext("2d");
  const background = context.createLinearGradient(0, 0, 1200, 1200);
  background.addColorStop(0, "#f7fcf8");
  background.addColorStop(0.58, "#edf7ef");
  background.addColorStop(1, "#eeeafa");
  context.fillStyle = background;
  context.fillRect(0, 0, 1200, 1200);
  context.fillStyle = "#f3b63f";
  context.fillRect(0, 0, 310, 14);
  context.fillStyle = "#70b17e";
  context.fillRect(310, 0, 790, 14);
  context.fillStyle = "#8cc7e8";
  context.fillRect(790, 0, 410, 14);

  context.fillStyle = "#3f8f5b";
  setShareCanvasFont(context, 42, 900);
  context.fillText("Flowl", 64, 78);
  context.fillStyle = "#688073";
  setShareCanvasFont(context, 22, 800);
  context.textAlign = "right";
  context.fillText("MY STUDY WEEK", 1136, 72);
  context.textAlign = "left";
  context.fillStyle = "#1f3d29";
  setShareCanvasFont(context, 52, 900);
  drawWrappedCanvasText(context, summary.headline, 64, 154, 1072, 64, 2);

  drawShareMetric(context, "今日", formatStudyDuration(summary.todayMinutes), 64, 252, 330, "#78b984");
  drawShareMetric(context, "今週", formatStudyDuration(summary.weeklyMinutes), 435, 252, 330, "#8cc7e8");
  drawShareMetric(context, "LEVEL", String(summary.level), 806, 252, 330, "#f3b63f");

  const stageBox = { x: 64, y: 414, width: 1072, height: 470 };
  try {
    await drawShareStageFromApp(context, summary, stageBox);
  } catch {
    drawShareStageBackground(context, summary, stageBox);
    drawShareFurniture(context, summary.furnitureId, 270, 824);
    drawShareOwl(context, summary, 820, 642);
  }

  context.fillStyle = "#718078";
  setShareCanvasFont(context, 19, 900);
  context.fillText("STYLE", 76, 950);
  context.fillText("PLACE", 612, 950);
  context.fillStyle = "#294b33";
  setShareCanvasFont(context, 27, 800);
  drawWrappedCanvasText(context, summary.outfitLabel, 76, 990, 470, 34, 2);
  drawWrappedCanvasText(context, summary.placeLabel, 612, 990, 512, 34, 2);

  context.strokeStyle = "rgba(92, 126, 99, 0.2)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(64, 1082);
  context.lineTo(1136, 1082);
  context.stroke();
  context.fillStyle = "#3f8f5b";
  setShareCanvasFont(context, 34, 900);
  context.fillText("勉強すると、フクロウが育つ。", 64, 1136);
  context.fillStyle = "#687970";
  setShareCanvasFont(context, 20, 800);
  context.textAlign = "right";
  context.fillText("flowldeveloper.github.io/flowl/  #Flowl", 1136, 1134);
  context.textAlign = "left";
  return canvas;
}

async function createShareImageBlob(summary = getShareSummary()) {
  const canvas = await createShareCanvas(summary);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Share image creation failed"));
    }, "image/png");
  });
}

function getShareImageFileName() {
  return `flowl-study-${getTodayKey()}.png`;
}

function downloadShareImage(blob) {
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = getShareImageFileName();
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
}

function buildSharePostText(summary = getShareSummary()) {
  return [
    summary.headline,
    `今日 ${formatStudyDuration(summary.todayMinutes)}｜今週 ${formatStudyDuration(summary.weeklyMinutes)}｜Lv.${summary.level}`,
    `Flowlet：${summary.outfitLabel}`,
    `背景：${summary.placeLabel}`,
    "",
    "勉強するとフクロウが育つ学習記録アプリ「Flowl」",
    FLOWL_PUBLIC_URL,
    "#Flowl #勉強記録",
  ].join("\n");
}

function openXComposer(summary, targetWindow = null) {
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(buildSharePostText(summary))}`;

  if (targetWindow && !targetWindow.closed) {
    targetWindow.location.href = intentUrl;
    targetWindow.opener = null;
    return;
  }

  window.open(intentUrl, "_blank", "noopener,noreferrer");
}

function supportsShareFiles() {
  if (typeof File !== "function" || typeof navigator.share !== "function" || typeof navigator.canShare !== "function") {
    return false;
  }

  try {
    const testFile = new File([new Blob(["flowl"], { type: "image/png" })], "flowl.png", { type: "image/png" });
    return navigator.canShare({ files: [testFile] });
  } catch {
    return false;
  }
}

function setShareButtonsBusy(isBusy) {
  [shareToXBtn].forEach((button) => {
    if (button) button.disabled = isBusy;
  });
}

async function shareProgressToX() {
  const summary = getShareSummary();
  const canShareFiles = supportsShareFiles();
  const targetWindow = canShareFiles ? null : window.open("about:blank", "_blank");
  setShareButtonsBusy(true);
  shareStatus.textContent = "共有画像を作っています…";

  try {
    const blob = await createShareImageBlob(summary);

    if (canShareFiles) {
      const file = new File([blob], getShareImageFileName(), { type: "image/png" });
      shareStatus.textContent = "共有先でXを選んでください。";
      await navigator.share({
        title: "Flowl 学習記録",
        text: buildSharePostText(summary),
        files: [file],
      });
      shareStatus.textContent = "共有画面を開きました。今日の積み重ねを見せよう。";
      trackFlowlEvent("share_progress", { share_method: "native" });
      return;
    }

    downloadShareImage(blob);
    openXComposer(summary, targetWindow);
    shareStatus.textContent = "画像を保存しました。開いたXの投稿に画像を添付してください。";
    trackFlowlEvent("share_progress", { share_method: "x_composer" });
  } catch (error) {
    if (error?.name === "AbortError") {
      if (targetWindow && !targetWindow.closed) targetWindow.close();
      shareStatus.textContent = "共有をキャンセルしました。記録はそのまま残っています。";
    } else {
      if (targetWindow && !targetWindow.closed) targetWindow.close();
      shareStatus.textContent = "共有画像を作れませんでした。もう一度お試しください。";
    }
  } finally {
    setShareButtonsBusy(false);
  }
}

function renderPet() {
  applyCareDecay();
  state.pet.hunger = clamp(state.pet.hunger);
  state.pet.happy = clamp(state.pet.happy);

  const currentLevel = getLevel();
  petLevel.textContent = currentLevel;
  petCareLevel.textContent = `Lv. ${currentLevel}`;
  const stage = getGrowthStage();
  const stageClasses = growthStages.map((item) => `stage-${item.id}`);
  const owlMotionState = getOwlMotionState(state.pet.hunger, state.pet.happy);
  const owlExpressionState = getOwlExpressionState(state.pet.hunger, state.pet.happy);

  petViews.forEach((view) => {
    setCareMeterValue(view.hunger, state.pet.hunger);
    setCareMeterValue(view.happy, state.pet.happy);
    view.pet.classList.toggle("mood-happy", state.pet.happy >= 70);
    view.pet.classList.toggle("mood-tired", state.pet.hunger <= 20 || state.pet.happy <= 20);
    view.pet.classList.toggle("mood-sick", state.pet.hunger <= 20);
    view.pet.classList.toggle("mood-grumpy", state.pet.happy <= 20);
    view.pet.classList.remove(...stageClasses);
    view.pet.classList.add(`stage-${stage.id}`);
    applyOwlMotionState(view.pet, owlMotionState);
    applyOwlExpressionState(view.pet, owlExpressionState);
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

function createItemIcon(itemOrClass) {
  const item = typeof itemOrClass === "string" ? null : itemOrClass;
  const category = item ? getItemCategory(item) : null;
  const rarity = item?.rarity || "common";
  const iconClass = item
    ? [
      "item-art",
      `item-art-${category}`,
      `item-art-${rarity}`,
      item.assetClass || item.iconClass || "item-art-placeholder",
    ].filter(Boolean).join(" ")
    : itemOrClass;
  const icon = document.createElement("span");
  icon.className = `item-illustration ${iconClass}`;
  icon.setAttribute("aria-hidden", "true");

  if (item) {
    icon.dataset.category = category;
    icon.dataset.rarity = rarity;
  }

  icon.append(
    document.createElement("span"),
    document.createElement("span"),
    document.createElement("span"),
    document.createElement("span"),
  );
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
  const anchorKey = getEquipmentAnchorKey(item);
  const anchor = equipmentAnchors[anchorKey] || equipmentAnchors.center;
  const offsetX = Number.isFinite(item.offsetX) ? item.offsetX : 0;
  const offsetY = Number.isFinite(item.offsetY) ? item.offsetY : 0;
  const scale = Number.isFinite(item.scale) ? item.scale : 1;
  const rotation = Number.isFinite(item.rotation) ? item.rotation : 0;

  element.className = `equipment-item ${item.assetClass || item.iconClass || ""} rarity-${item.rarity}`;
  element.dataset.item = itemId;
  element.dataset.anchor = anchorKey;
  element.style.setProperty("--anchor-x", `${anchor.x}%`);
  element.style.setProperty("--anchor-y", `${anchor.y}%`);
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
  const owlMotionState = getOwlMotionState(state.pet.hunger, state.pet.happy);
  const owlExpressionState = getOwlExpressionState(state.pet.hunger, state.pet.happy);

  petElement.classList.toggle("mood-happy", state.pet.happy >= 70);
  petElement.classList.toggle("mood-tired", state.pet.hunger <= 20 || state.pet.happy <= 20);
  petElement.classList.toggle("mood-sick", state.pet.hunger <= 20);
  petElement.classList.toggle("mood-grumpy", state.pet.happy <= 20);
  petElement.classList.remove(...stageClasses);
  petElement.classList.add(`stage-${stage.id}`);
  applyOwlMotionState(petElement, owlMotionState);
  applyOwlExpressionState(petElement, owlExpressionState);
  delete petElement.dataset.outfit;
  renderEquipment(petElement, customization);
  applyStageCustomization(stageElement, customization);
}

function getPreviewActionText(itemId) {
  const item = shopItems[itemId];

  if (!item) return "選択";
  if (isItemEquipped(itemId)) return "外す";
  if (state.inventory[itemId]) return "装備";
  if (state.coins < getItemPrice(item)) return "コイン不足";
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

  selectedShopItemId = validShopItem;

  renderPetPreview(shopPreviewStage, shopPreviewPet, selectedShopItemId);
  renderPreviewInfo(shopPreviewName, shopPreviewMeta, shopPreviewAction, selectedShopItemId);
}

function scrollShopPreviewIntoView() {
  if (!shopPreviewStage) return;

  requestAnimationFrame(() => {
    shopPreviewStage.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function scrollShopCategoryIntoView(category) {
  const section = shopList.querySelector(`.shop-category-${category}`);

  if (!section) return;

  requestAnimationFrame(() => {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function getSubjectMatches(input) {
  const query = (input?.value || "").trim().toLowerCase();

  if (!query) return state.subjects;

  return state.subjects.filter((subject) => subject.toLowerCase().includes(query));
}

function renderSubjectMenu(input, menu) {
  menu.innerHTML = "";

  const subjects = getSubjectMatches(input);

  if (subjects.length === 0) {
    const empty = document.createElement("span");
    empty.className = "subject-menu-empty";
    empty.textContent = state.subjects.length === 0
      ? "記録すると候補が増えます"
      : "一致する科目がありません";
    menu.appendChild(empty);
    return;
  }

  subjects.forEach((subject) => {
    const row = document.createElement("span");
    const optionButton = document.createElement("button");
    const removeButton = document.createElement("button");

    row.className = "subject-menu-row";
    optionButton.type = "button";
    optionButton.className = "subject-option";
    optionButton.dataset.subject = subject;
    optionButton.textContent = subject;
    removeButton.type = "button";
    removeButton.className = "subject-remove";
    removeButton.dataset.subject = subject;
    removeButton.setAttribute("aria-label", `${subject}を削除`);
    removeButton.textContent = "×";

    row.append(optionButton, removeButton);
    menu.appendChild(row);
  });
}

function positionSubjectMenu(input, menu) {
  const field = input.closest(".subject-field");
  if (!field || menu.hidden) return;

  const viewport = window.visualViewport;
  const viewportHeight = viewport?.height || window.innerHeight || document.documentElement.clientHeight;
  const viewportTop = viewport?.offsetTop || 0;
  const inputRect = input.getBoundingClientRect();
  const navRect = bottomNav?.getBoundingClientRect();
  const bottomReserve = navRect
    ? Math.max(12, viewportHeight - navRect.top + 10)
    : 12;
  const spaceBelow = viewportHeight - inputRect.bottom - bottomReserve;
  const spaceAbove = inputRect.top - viewportTop - 10;
  const openAbove = spaceBelow < 150 && spaceAbove > spaceBelow;
  const availableSpace = openAbove ? spaceAbove : spaceBelow;
  const maxHeight = Math.max(112, Math.min(220, availableSpace - 8));

  field.classList.toggle("menu-above", openAbove);
  menu.style.setProperty("--subject-menu-max-height", `${Math.round(maxHeight)}px`);
}

function closeSubjectMenus() {
  activeSubjectInput = null;
  subjectFields.forEach(({ input, menu, toggle }) => {
    menu.hidden = true;
    const field = input.closest(".subject-field");
    field?.classList.remove("menu-open", "menu-above");
    menu.style.removeProperty("--subject-menu-max-height");
    if (toggle) {
      toggle.textContent = "▼";
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function openSubjectMenu(input) {
  activeSubjectInput = input;

  subjectFields.forEach((field) => {
    const isActive = field.input === input;
    const canOpen = isActive && state.subjects.length > 0;

    renderSubjectMenu(field.input, field.menu);
    field.menu.hidden = !canOpen;
    field.input.closest(".subject-field")?.classList.toggle("menu-open", canOpen);
    field.input.closest(".subject-field")?.classList.remove("menu-above");
    if (canOpen) positionSubjectMenu(field.input, field.menu);
    if (field.toggle) {
      field.toggle.textContent = canOpen ? "▲" : "▼";
      field.toggle.setAttribute("aria-expanded", String(canOpen));
    }
  });
}

function toggleSubjectMenu(input) {
  const field = subjectFields.find((item) => item.input === input);

  if (!field || state.subjects.length === 0) {
    closeSubjectMenus();
    return;
  }

  if (!field.menu.hidden) {
    closeSubjectMenus();
    return;
  }

  openSubjectMenu(input);
}

function refreshActiveSubjectMenuPosition() {
  if (!activeSubjectInput) return;

  const field = subjectFields.find((item) => item.input === activeSubjectInput);
  if (!field || field.menu.hidden) return;

  positionSubjectMenu(field.input, field.menu);
}

function removeSubject(subject) {
  state.subjects = state.subjects.filter((item) => item !== subject);

  if (subjectInput.value === subject) subjectInput.value = "";
  if (timerSubjectInput.value === subject) timerSubjectInput.value = "";

  saveState();
  renderSubjectTags();

  if (activeSubjectInput) {
    openSubjectMenu(activeSubjectInput);
  }
}

function renderSubjectTags() {
  subjectOptions.innerHTML = "";
  subjectTags.innerHTML = "";

  state.subjects.forEach((subject) => {
    const option = document.createElement("option");

    option.value = subject;
    subjectOptions.appendChild(option);
  });

  subjectFields.forEach(({ input, menu }) => renderSubjectMenu(input, menu));
}

function renderInventory() {
  inventoryList.innerHTML = "";
  const ownedItems = Object.entries(shopItems)
    .filter(([id]) => state.inventory[id] > 0)
    .sort(sortItemEntries);
  const inventoryGroups = [
    {
      id: "clothing",
      title: "服",
      note: "1つだけ装備",
      match: (item) => getItemCategory(item) === "clothing",
    },
    ...Object.entries(accessorySlotLabels).map(([slot, label]) => ({
      id: `accessory-${slot}`,
      title: `アクセサリー・${label}`,
      note: `${label}は1つだけ`,
      match: (item) => getItemCategory(item) === "accessory" && (item.accessorySlot || "head") === slot,
    })),
    {
      id: "furniture",
      title: "家具",
      note: "1つだけ配置",
      match: (item) => getItemCategory(item) === "furniture",
    },
    {
      id: "background",
      title: "背景",
      note: "1つだけ設定",
      match: (item) => getItemCategory(item) === "background",
    },
  ];

  if (ownedItems.length === 0) {
    const empty = document.createElement("span");
    empty.className = "item-empty";
    empty.textContent = "ショップで服や飾りを買うとここに並びます";
    inventoryList.appendChild(empty);
    return;
  }

  function createInventoryButton(id, item) {
    const card = document.createElement("div");
    const button = document.createElement("button");
    const equipButton = document.createElement("button");
    const icon = createItemIcon(item);
    const label = document.createElement("span");
    const meta = document.createElement("small");
    const category = getItemCategory(item);
    const equipped = isItemEquipped(id);
    const slotLabel = category === "accessory" ? getItemSlotLabel(item) : null;
    const detailLabels = [
      categoryLabels[category],
      slotLabel,
      rarityLabels[item.rarity],
    ].filter(Boolean);

    button.type = "button";
    button.className = `use-item-btn rarity-${item.rarity}`;
    button.dataset.item = id;
    card.className = `inventory-card rarity-${item.rarity}`;
    card.dataset.item = id;
    equipButton.type = "button";
    equipButton.className = "inventory-equip-btn";
    equipButton.dataset.item = id;
    label.className = "item-name";
    meta.className = "item-meta";
    label.textContent = item.name;
    meta.textContent = equipped
      ? "装備中"
      : detailLabels.join(" / ");
    equipButton.textContent = equipped ? "外す" : "装備";
    card.classList.toggle("equipped", equipped);
    button.classList.toggle("equipped", equipped);
    button.append(icon, label, meta);
    card.append(button, equipButton);

    return card;
  }

  inventoryGroups.forEach((group) => {
    const groupItems = ownedItems.filter(([, item]) => group.match(item));

    if (groupItems.length === 0) return;

    const section = document.createElement("section");
    const heading = document.createElement("div");
    const title = document.createElement("h4");
    const note = document.createElement("span");
    const list = document.createElement("div");

    section.className = `inventory-section inventory-section-${group.id}`;
    heading.className = "inventory-section-title";
    title.textContent = group.title;
    note.textContent = group.note;
    list.className = "inventory-section-list";

    heading.append(title, note);
    groupItems.forEach(([id, item]) => {
      list.appendChild(createInventoryButton(id, item));
    });
    section.append(heading, list);
    inventoryList.appendChild(section);
  });
}

function renderShop() {
  shopList.innerHTML = "";
  const tabs = document.createElement("div");

  tabs.className = "shop-category-tabs";
  tabs.setAttribute("aria-label", "ショップカテゴリ");

  shopCategoryOrder.forEach((category) => {
    const entries = Object.entries(shopItems)
      .filter(([, item]) => getItemCategory(item) === category)
      .sort(sortItemEntries);
    const tab = document.createElement("button");
    const label = document.createElement("span");
    const count = document.createElement("small");

    if (entries.length === 0) return;

    tab.type = "button";
    tab.className = "shop-category-tab";
    tab.dataset.category = category;
    tab.setAttribute("aria-pressed", String(selectedShopCategory === category));
    tab.classList.toggle("active", selectedShopCategory === category);
    label.textContent = categoryLabels[category];
    count.textContent = entries.length;
    tab.append(label, count);
    tabs.appendChild(tab);
  });

  shopList.appendChild(tabs);

  shopCategoryOrder.forEach((category) => {
    const entries = Object.entries(shopItems)
      .filter(([, item]) => getItemCategory(item) === category)
      .sort(sortItemEntries);
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
      const icon = createItemIcon(item);
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
      button.textContent = isOwned
        ? "購入済み"
        : selectedShopItemId === id
          ? "表示中"
          : "確認";
      button.title = isOwned ? "購入済み" : "プレビュー";

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
  totalStudy.textContent = `累計 ${formatStudyDuration(state.totalMinutes)}`;
  allTimeStudyTotal.textContent = formatStudyDuration(state.totalMinutes);

  renderDailySummary(todayMinutes);
  renderStudyTank();
  renderPet();
  renderGrowth();
  renderLevelReward();
  renderUnlocks();
  renderSubjectTags();
  renderInventory();
  renderShop();
  renderCustomizationPreviews();
  renderSharePanel();
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
}

function playTimerBeat() {
  timerBeatId += 1;
  const beatId = timerBeatId;

  petViews.forEach((view) => {
    view.pet.classList.remove("timer-beat");
    // classを付け直して、タイマーが1秒進むたびに同じ跳ねモーションを再生します。
    void view.pet.offsetWidth;
    view.pet.classList.add("timer-beat");
    window.setTimeout(() => {
      if (beatId !== timerBeatId) return;
      view.pet.classList.remove("timer-beat");
    }, 860);
  });
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
  } else {
    timerBeatId += 1;
    petViews.forEach((view) => {
      view.pet.classList.remove("timer-beat");
    });
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
  trackAnalyticsScreen(screenId);
}

function stopTimerAtLimit() {
  clearInterval(timer);
  timer = null;
  time = getCurrentStudyLimitSeconds();
  updateDisplay();
  updateTimerButton("記録待ち");
  setFocusMode(false);
  if (studyMode === "timer") {
    playTimerCompleteSound();
  }
  timerStatus.textContent = studyMode === "timer"
    ? "タイマー終了。記録できます。"
    : "12時間に到達しました";
}

studyModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setStudyMode(button.dataset.studyMode);
  });
});

timerDurationBtn?.addEventListener("click", () => {
  openDurationPicker({
    title: "タイマー時間",
    initialMinutes: Math.round(timerTargetSeconds / 60),
    minMinutes: 1,
    maxMinutes: 12 * 60,
    maxHours: 12,
    onConfirm: (totalMinutes) => {
      if ((timer !== null || time > 0) && !confirm("現在の計測をリセットして時間を変更しますか？")) {
        return false;
      }

      resetCurrentStudyForModeChange();
      timerTargetSeconds = totalMinutes * 60;
      updateDurationButtons();
      updateDisplay();
    },
  });
});

manualDurationBtn?.addEventListener("click", () => {
  openDurationPicker({
    title: "記録時間",
    initialMinutes: manualStudyMinutes,
    minMinutes: 1,
    maxMinutes: 12 * 60,
    maxHours: 12,
    onConfirm: (totalMinutes) => {
      manualStudyMinutes = totalMinutes;
      updateDurationButtons();
    },
  });
});

[durationHourWheel, durationMinuteWheel].forEach((wheel) => {
  wheel?.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateDurationPickerSelection);
  });

  wheel?.addEventListener("click", (event) => {
    const option = event.target.closest(".duration-option");
    if (!option) return;

    setWheelValue(wheel, Number(option.dataset.value));
    updateDurationPickerSelection();
  });
});

durationCancelBtn?.addEventListener("click", closeDurationPicker);
durationConfirmBtn?.addEventListener("click", confirmDurationPicker);
durationPicker?.addEventListener("click", (event) => {
  if (event.target === durationPicker) closeDurationPicker();
});

startBtn.addEventListener("click", () => {
  unlockFlowlSound();
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
    timerStatus.textContent = "";
    updateTimerButton("再開");
    setFocusMode(false);
    return;
  }

  if (time >= getCurrentStudyLimitSeconds()) {
    timerStatus.textContent = studyMode === "timer"
      ? "タイマー終了。記録して終了してください。"
      : "12時間まで記録できます。記録して終了してください。";
    updateTimerButton("記録待ち");
    return;
  }

  timerStatus.textContent = "";
  const timerEventName = time > 0 ? "study_resume" : "study_start";
  trackFlowlEvent(timerEventName, { study_mode: studyMode });
  updateTimerButton("一時停止");
  setFocusMode(true);
  timer = setInterval(() => {
    time++;
    updateDisplay();
    playTimerBeat();

    if (time >= getCurrentStudyLimitSeconds()) {
      stopTimerAtLimit();
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
  unlockFlowlSound();
  const minutes = getElapsedTimerMinutes();

  if (minutes <= 0) {
    alert("1分以上たってから記録できます。");
    return;
  }

  const session = addStudySession(minutes, timerSubjectInput.value.trim() || getCurrentStudyRecordLabel(), studyMode);
  if (!session) return;
  resetTimer();
  setFocusMode(false);
  timerSubjectInput.value = "";
  timerStatus.textContent = `記録済み +${getEarnedCoins(minutes)} coin`;
  showStudyReaction(buildStudyReaction(session));
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
  unlockFlowlSound();
  const minutes = Number(minutesInput.value);
  const subject = subjectInput.value.trim();
  const selectedDate = studyDateInput?.value || getTodayKey();

  if (!Number.isFinite(minutes) || minutes <= 0) return;

  const session = addStudySession(Math.round(minutes), subject, "manual", selectedDate);
  if (!session) return;
  subjectInput.value = "";
  manualStudyMinutes = 25;
  minutesInput.value = 25;
  updateDurationButtons();
});

studyTankRewardClose?.addEventListener("click", (event) => {
  event.stopPropagation();
  closeStudyTankReward();
});

subjectFields.forEach(({ input, menu, toggle }) => {
  input.addEventListener("focus", () => openSubjectMenu(input));
  input.addEventListener("click", () => openSubjectMenu(input));
  input.addEventListener("input", () => openSubjectMenu(input));

  if (toggle) {
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSubjectMenu(input);
    });
  }

  menu.addEventListener("click", (event) => {
    event.stopPropagation();

    const removeButton = event.target.closest(".subject-remove");

    if (removeButton) {
      removeSubject(removeButton.dataset.subject);
      return;
    }

    const optionButton = event.target.closest(".subject-option");
    if (!optionButton) return;

    input.value = optionButton.dataset.subject;
    closeSubjectMenus();
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".subject-field")) return;

  closeSubjectMenus();
});

window.addEventListener("resize", refreshActiveSubjectMenuPosition);
window.visualViewport?.addEventListener("resize", refreshActiveSubjectMenuPosition);
window.visualViewport?.addEventListener("scroll", refreshActiveSubjectMenuPosition);

subjectTags.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".tag-remove");

  if (removeButton) {
    removeSubject(removeButton.dataset.subject);
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
    trackFlowlEvent("care_action", { care_action: action });
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
    trackFlowlEvent("customization_change", {
      item_category: category,
      item_rarity: item.rarity,
      change_type: isItemEquipped(itemId) ? "equip" : "remove",
    });
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
  trackFlowlEvent("shop_purchase", {
    item_category: category,
    item_rarity: item.rarity,
    coin_price: cost,
  });
  trackFlowlEvent("customization_change", {
    item_category: category,
    item_rarity: item.rarity,
    change_type: "equip",
  });
  return true;
}

shopList.addEventListener("click", (event) => {
  const tab = event.target.closest(".shop-category-tab");

  if (tab) {
    selectedShopCategory = tab.dataset.category;
    renderShop();
    scrollShopCategoryIntoView(selectedShopCategory);
    return;
  }

  const card = event.target.closest(".shop-item");
  if (!card) return;

  const itemId = card.dataset.item;
  if (!shopItems[itemId]) return;

  selectedShopItemId = itemId;
  render();
  scrollShopPreviewIntoView();
});

shopPreviewAction.addEventListener("click", () => {
  if (!selectedShopItemId) return;
  applySelectedItem(selectedShopItemId);
});

inventoryList.addEventListener("click", (event) => {
  const equipButton = event.target.closest(".inventory-equip-btn");

  if (equipButton) {
    const itemId = equipButton.dataset.item;
    if (!shopItems[itemId] || !state.inventory[itemId]) return;

    applySelectedItem(itemId);
    return;
  }
});

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => {
    switchScreen(button.dataset.screen);
  });
});

shareToXBtn?.addEventListener("click", shareProgressToX);
analyticsAcceptBtn?.addEventListener("click", () => updateAnalyticsConsent("granted"));
analyticsDeclineBtn?.addEventListener("click", () => updateAnalyticsConsent("denied"));
analyticsSettingsBtn?.addEventListener("click", openAnalyticsConsent);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .then(() => {
        // Service Worker updates stay silent because the data management UI was removed.
      })
      .catch(() => {
        // PWA registration can fail on non-HTTPS local network URLs.
      });
  });
}

document.addEventListener("pointerdown", unlockFlowlSound, { capture: true, passive: true });
document.addEventListener("touchend", unlockFlowlSound, { capture: true, passive: true });
document.addEventListener("touchmove", preventAppViewportZoom, { passive: false });
document.addEventListener("gesturestart", preventAppViewportZoom, { passive: false });
document.addEventListener("gesturechange", preventAppViewportZoom, { passive: false });
document.addEventListener("gestureend", preventAppViewportZoom, { passive: false });
document.addEventListener("dblclick", (event) => event.preventDefault(), { passive: false });

studyDateInput?.addEventListener("change", () => {
  if (getValidStudyDateKey(studyDateInput.value)) return;

  alert("記録日は今日以前の日付を選んでください。");
  studyDateInput.value = getTodayKey();
});

const launchReaction = buildLaunchReaction();
initializeAnalytics();

grantLoginBonus();
rememberAppOpen();
grantLevelRewards();
saveState();
createDurationWheelOptions(durationHourWheel, 12);
createDurationWheelOptions(durationMinuteWheel, 59);
initializeStudyDateInput();
updateDurationButtons();
renderStudyModeControls();
updateDisplay();
render();
applyMascotMotion(activeMascotMotion);

if (launchReaction) {
  window.setTimeout(() => {
    showStudyReaction(launchReaction);
  }, 520);
}
