# Naoya Tsuji Portfolio — CLAUDE.md

## プロジェクト概要
映像作家・フォトグラファー 辻直哉のポートフォリオサイト。  
静的HTML/CSS/JSで構築。GitHub Pages でホスティング。カスタムドメイン: **naoyatsuji.com**

---

## デプロイ
- **リポジトリ**: github.com/tnstbm35/portfolio
- **GitHub Pages ソース**: `main` ブランチの `/docs` フォルダ
- **デプロイ方法**: `main` ブランチに push → GitHub Actions が自動デプロイ（1〜3分）
- **HTTPS**: Enforce HTTPS 有効済み

---

## ファイル構成（`docs/` 以下）

```
docs/
├── index.html          # トップページ（ヒーロー動画スライドショー）
├── about.html          # Aboutページ
├── contact.html        # Contactページ
├── CNAME               # カスタムドメイン設定（触らない）
├── css/
│   └── style.css       # 全ページ共通CSS（デザインシステム）
├── js/
│   └── main.js         # 全ページ共通JS
├── images/             # Still写真（134A***.jpg, L100****.jpg など）
├── works/
│   ├── index.html      # Worksページ（動画 + Stillマソンリーグリッド）
│   ├── asef.html       # ASEF個別ページ
│   └── hachiyado.html  # Hachiyado個別ページ
└── showcase/
    └── index.html      # Showcaseページ（パスワードゲート付き）
```

---

## デザインシステム（CSS変数）

```css
--color-bg:      #ffffff
--color-text:    #111111
--color-muted:   #888888
--color-border:  #e4e4e4
--color-hover:   #555555
--font-primary:  'Open Sans', Helvetica, Arial, sans-serif
--nav-height:    64px
--max-width:     1200px
--transition:    0.3s ease
```

---

## 主要コンポーネント

### ナビゲーション
- `.nav`：全ページ固定ヘッダー（`z-index: 100`）
- `.nav--transparent`：ヒーロー上では透明、スクロールで白背景に切り替わる（JS制御）
- `.nav__hamburger`：モバイルのみ表示

### モバイルメニュー
- `#mobile-menu`（`.mobile-menu`）：`position: fixed; inset: 0; z-index: 200`
- `.active` クラスで表示切替
- **注意**: スクロールロックに `body.style.overflow: hidden` だけを使うと、モバイルで `position: fixed` 要素がズレる。現在は `position: fixed + top: -scrollY` 方式を採用済み（main.js参照）

### ヒーロー動画スライドショー（index.html）
- `.hero__slide` に `data-duration="ミリ秒"` で表示時間を指定
- 動画は `/docs/` 直下またはパス指定で配置

### Worksページ（works/index.html）
- **Movie セクション**: クライアントごとに `.works-client` ブロックでYouTube埋め込み（3カラムグリッド）
- **Still セクション**: `.still-masonry`（3カラム CSS columns）+ ライトボックス付き
- **Profonde セクション**: Behold ウィジェット（`feed-id="OXmebmpUCBrdav0rOxk1"`）でInstagram埋め込み

### Showcaseページ（showcase/index.html）
- パスワード: `1340`
- `sessionStorage` で認証状態を保持（タブを閉じるとリセット）

### ライトボックス（works/index.html）
- `<dialog>` 要素 + `showModal()` を使用（CSS stacking context の問題を回避）
- `.still-masonry__item img` をクリックで開く
- 左右矢印ボタン + キーボード ← → で画像切替、ESCで閉じる

---

## ⚠️ 重要な注意事項

### `transform` を `body` に使わない
`body` に `transform` を含むアニメーション（`page-fade`など）を適用すると、`position: fixed` 要素（ナビ・モバイルメニューなど）がviewport基準ではなくbody基準になりズレる。  
→ `page-fade` クラスは各ページの `<main>` 要素に直接付与すること（bodyには付与しない）。

### CNAME ファイルを削除しない
`docs/CNAME` にはカスタムドメイン設定が入っている。削除するとサイトが壊れる。

### Google Analytics
トラッキングID: `G-L8259HFMWW`。全ページの `<head>` に設定済み。

---

## よくある更新作業

### Worksページに動画を追加する
`docs/works/index.html` の該当クライアントの `.works-client__videos` 内に `<div class="video-item"><iframe ...></iframe></div>` を追加。

### Stillに写真を追加する
1. 画像を `docs/images/` に配置
2. `docs/works/index.html` の `.still-masonry` 内に `<div class="still-masonry__item"><img src="../images/ファイル名.jpg" alt="" loading="lazy" /></div>` を追加

### About / Contactを更新する
`docs/about.html` / `docs/contact.html` を直接編集。

---

## 外部サービス
- **Google Fonts**: Open Sans
- **Google Analytics**: G-L8259HFMWW
- **Behold** (Instagram埋め込み): feed-id `OXmebmpUCBrdav0rOxk1`
- **YouTube**: 各動画はYouTube埋め込みiframe
