# Gemini AI搭載 Trello風タスク管理アプリ (kanban-ai-app)

このプロジェクトは、新卒エンジニア向けのWeb開発およびクラウド（AWS）学習用ポートフォリオです。
React、Go、PostgreSQL、そしてGemini APIを組み合わせたフルスタックのタスク管理（カンバン）アプリケーションです。

## 🚀 主な機能
*   **カンバンボード**: タスクを「未着手」「進行中」「完了」の3つのステータスで管理。
*   **AIタスク自動分解 (AI Subtask Generator)**: 親タスクから、Gemini APIを利用して具体的な5つのサブタスクを自動生成。
*   **セキュア設計**: APIキーやDBパスワードなどの機密情報を環境変数で安全に管理。

## 🛠️ 技術スタック
*   **フロントエンド**: React (Vite), CSS
*   **バックエンド**: Go
*   **データベース**: PostgreSQL
*   **AI統合**: Gemini API (Google AI Studio)
*   **インフラ (AWS)**: Amazon S3, Amazon CloudFront, Amazon EC2, Amazon RDS

## 📂 フォルダ構成
```text
kanban-ai-app/
├── frontend/             # フロントエンド (React)
├── backend/              # バックエンド (Go)
└── README.md             # このファイル
```

## 📝 開発の進め方 (GitHub Flow)
1.  機能ごとに作業ブランチを切り出して開発。
2.  完了後、Pull Requestを作成して `main` ブランチへマージ。

## 👥 開発メンバー
*   **Holly-110** (メイン開発者)
*   **Antigravity** (AIペアプログラマー)
