## 開発環境

### バージョン

```
node: 14.17.0
npm: 6.14.13
webpack: 5.41.1
```

### ファイル構成

```
web-starter-kit/
├ htdocs/ [公開コード]
├ src/ [開発コード]
├ webpack.config.js/ [webpackファイル]
├ .gitignore
├ package-look.json
├ package.json
└ README.md
```

### コマンドリスト

#### インストール

開発環境インストールコマンド。package-lock.json のモジュールのバージョンを揃えるため`npm ci`を使用。

```
npm ci
```

#### 開発

ローカルサーバー起動、ファイル監視(Watch)。
開発コードのビルドはしません。

```
#dev
npm run dev

#stg
npm run stg

#prd
npm run prd
```

#### ビルド

開発コードのビルドのみ。

```
#dev
npm run build:dev

#stg
npm run build:stg

#prd
npm run build:prd
```
