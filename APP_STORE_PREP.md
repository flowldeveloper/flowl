# Flowl iOS app preparation

このフォルダは、MacでXcodeを使う直前まで準備した状態です。

## いまWindows側でできていること

- Flowl本体は `index.html` / `style.css` / `app.js` のまま維持
- PWA用の `manifest.webmanifest` / `sw.js` / `icon.svg` を追加
- Capacitor用の `package.json` / `capacitor.config.json` を追加
- `www/` にアプリ本体をコピーする準備スクリプトを追加

## Windows側で確認するコマンド

```powershell
npm run prepare:www
```

成功すると `www/` に以下がコピーされます。

- `index.html`
- `style.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `icon.svg`

## Macに移ったら最初にやること

```bash
npm install
npm run prepare:www
npx cap add ios
npx cap sync ios
npx cap open ios
```

その後はXcodeで開いて、実機確認とApp Store提出準備をします。

## App Store提出前に必要なもの

- Apple Developer Program登録
- Xcode
- App Store Connectのアプリ登録
- アプリアイコン
- スクリーンショット
- プライバシーポリシーURL
- 年齢レーティング設定
- アプリ説明文

## 注意

`ios/`、`www/`、`node_modules/` は生成物なのでGit管理から外しています。
Mac側で生成して問題ありません。
