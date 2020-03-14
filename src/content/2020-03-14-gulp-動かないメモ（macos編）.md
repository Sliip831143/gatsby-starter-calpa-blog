---
slug: 2020-03-14-gulp 動かないメモ（macOS編）
title: gulp 動かないメモ（macOS編）
date: 2020-03-14T07:02:03.855Z
description: リモートからプルしたプロジェクトの gulp が動かない対処メモ（macOS編）
tags:
  - gulp.js
headerImage: 'https://imgur.com/a/kBDi2j7'
templateKey: blog-post
---
## gulp が動かない
---
　gulp が動かない。バージョンは 3.9.1 。

　入社時与えられた Windows PC が早くも不調を訴え出し、ようやく愛着が湧き始めた所だというのに呆気なく買い替えが決まってしまいました。いつその時が来ても良いよう、別途支給されていた MacBook の開発環境を整えにかかったのですが、リモートからローカルにプルしてパッケージまでインストールしたプロジェクトの gulp コマンドが転ける。

　結局動かすのに半日を費やしてしまったので、戒めに踏んだエラーとその対処を時系列に並べて書き残しておきたいと思います。
<br>

## gulp / gulp-sass のバージョン
---
　package.json の dependencies より。

```
  "gulp": "^3.9.1",
  "gulp-sass": "^2.0.0",
```
<br>

## 事前準備

　予め Homebrew 及び nodebrew、Yarn を導入しておきます。手順については割愛しますが、Yarn を Homebrew 経由で導入しないよう注意。Homebrew で Yarn を導入してしまうと、一緒に node を引き連れてきた挙句 Path を上書きしてしまう為、事実上 nodebrew による node のバージョン切り替えが利かなくなってしまいます（ハマった）。
　Homebrew → nodebrew → npm で Yarn 導入と踏むのが吉。

（参考：
[最近流行りのyarnをインストールしたらハマった話](https://hisa-tech.site/yarn-install-stumble/)）
<br>

---
### 1. gulp: command not found

　gulp コマンドを実行したら下記エラーが出力され失敗。

```
gulp: command not found
```
<br>

#### 対処： Path を通す

　/Users/ [ ユーザー名 ] /.bash_profile（ファイルが存在しなければ新規作成）に下記 Path  を追記。

```
export PATH=$PATH:./node_modules/.bin
```
<br>

### 2. primordials が未定義

　再度 gulp を実行するも下記エラーで失敗。

```
fs.js:27
const { Math, Object, Reflect } = primordials;
                                  ^

ReferenceError: primordials is not defined
```
<br>

#### 対処： Node.js のバージョンを v11 系に切り替え

　内部 API の変更により、node の v12 系 の上で gulp の v3 系は動かないとの事。 ```node -v``` で node のバージョンを確認した所、v12.31.1 と v12 系だった。
これに対応するには gulp を v4 系にバージョンアップする必要があるが、「package-lock.json」で利用パッケージのバージョンを指定されている都合上そうもいかない。

　従って node を v11 系以下にダウングレードする必要がある。nodebrew を導入しているので、これによってバージョンを v11 系最新の v11.15.0 に切り替える。

　node の v11.15.0 をインストール。

```
nodebrew install v11.15.0
```

　node のバージョンを切り替え。

```
nodebrew use v11.15.0
```
<br>

### 3. Error: Cannot find module 'gulp-sass'

　三度 gulp を実行するも下記エラーで失敗。

```
internal/modules/cjs/loader.js:670
    throw err;
    ^

Error: Cannot find module 'gulp-sass'
```

　```npm ls --depth=0``` でインストール済みのパッケージを確認してみると確かに gulp-sass がエラーを出している。

```
npm ERR! missing: gulp-sass@^2.0.0, required by module@1.0.0
```
<br>

#### 対処： gulp-sass の再インストール

　gulp-sass をアンインストール

```
npm uninstall gulp-sass --save
```
※ インストール先が devDependencies の場合、オプションは ```--save-dev``` 。

　念のため npm のキャッシュをクリア

```
sudo npm cache clean --force
```

　再度 gulp-sass をインストール

```
npm i gulp-sass@2.0.0
```
<br>

　結果、gulp-sass のエラーが解消され、gulp コマンドが通るようになりました。良かったー。
<br>
<br>
