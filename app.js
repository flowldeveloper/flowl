const STORAGE_KEY = "flowl-study-pet";
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
const todayTotal = document.getElementById("todayTotal");
const totalStudy = document.getElementById("totalStudy");
const allTimeStudyTotal = document.getElementById("allTimeStudyTotal");
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
const petLevel = document.getElementById("petLevel");
const petCareLevel = document.getElementById("petCareLevel");
const motionLabel = document.getElementById("motionLabel");
const motionButtons = document.querySelectorAll(".motion-btn");
const streakCount = document.getElementById("streakCount");
const todayReward = document.getElementById("todayReward");
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

let time = 0;
let timer = null;
let state = loadState();
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
    encouragement: {
      lastMessage: "",
      recentMessages: [],
      lastShownAt: null,
    },
  };
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

  return {
    ...defaults,
    ...persistedState,
    pet: {
      ...defaults.pet,
      ...savedState.pet,
    },
    inventory,
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
    reward: `+${session.coins} coin`,
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
  return session;
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
}

function stopTimerAtLimit() {
  clearInterval(timer);
  timer = null;
  time = getCurrentStudyLimitSeconds();
  updateDisplay();
  updateTimerButton("記録待ち");
  setFocusMode(false);
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
  const minutes = getElapsedTimerMinutes();

  if (minutes <= 0) {
    alert("1分以上たってから記録できます。");
    return;
  }

  const session = addStudySession(minutes, timerSubjectInput.value.trim() || getCurrentStudyRecordLabel());
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
  const minutes = Number(minutesInput.value);
  const subject = subjectInput.value.trim();

  if (!Number.isFinite(minutes) || minutes <= 0) return;

  addStudySession(Math.round(minutes), subject);
  subjectInput.value = "";
  manualStudyMinutes = 25;
  minutesInput.value = 25;
  updateDurationButtons();
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // PWA registration can fail on non-HTTPS local network URLs.
    });
  });
}

motionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMascotMotion(button.dataset.motion);
  });
});

const launchReaction = buildLaunchReaction();

grantLoginBonus();
rememberAppOpen();
grantLevelRewards();
saveState();
createDurationWheelOptions(durationHourWheel, 12);
createDurationWheelOptions(durationMinuteWheel, 59);
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
