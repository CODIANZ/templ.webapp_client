# syncsocketio を使ったwebサーバへの接続を行うクライアント実装テンプレート

[![Build Status](https://travis-ci.org/codianz/templ.webapp_client.png?branch=master)](https://travis-ci.org/codianz/templ.webapp_client)
[![Dependency Status](https://img.shields.io/david/codianz/templ.webapp_client.svg?style=flat-square)](https://david-dm.org/codianz/templ.webapp_client)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## 概要

このプロジェクトは syncsocketio を使ったwebサーバへの接続を行うクライアント側の実装テンプレートです。

syncsocketio については、下記のリポジトリを参照してください。

https://github.com/codianz/syncsocketio

このwebサーバの実装テンプレートは下記のリポジトリを参照してください。

https://github.com/codianz/templ.webapp_socket_server


## ビルド方法

下記のコマンドでビルドを行ってください。

```sh
npm i && npm run build-debug
```

## Visual Studio Code

このプロジェクトは Visual Studio Code 用の設定が含まれています。

### 機能拡張

Visual Studio Code に下記の２つの機能拡張をインストールすると幸せになります。

* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)


* [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)


### ビルド

shift + ctrl + B でビルドを選択します。


### デバッグ実行

F5 キーで実行します。

