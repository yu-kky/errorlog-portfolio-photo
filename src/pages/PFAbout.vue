<template>
  <div class="column-container">
    <h2>About Me</h2>
    <p>Webエンジニア / フォトグラファー</p>

    <h3>1. Engineering — For Recruiters <span>エンジニア採用ご担当者さまへ</span></h3>
    <p>
      元会社員・元フロントエンド開発チームマネージャー。<br />
      バックエンド（Java / Scala / Oracle）、モバイル（Swift / Xcode / React Native）、
      Webフロント（Vue / React）まで実務経験があります。<br />
      現在はフリーランスとして、フロントエンドを主軸にフルスタックで活動しています。<br />
      デザイナー不在の案件で、デザイン〜実装まで一貫対応した経験も多数あります。
    </p>
    <ul>
      <li>
        <strong>得意領域：</strong>
        レガシーサービスのリプレイス、0→1構築、メンテナブルなcomponent設計
      </li>
      <li>
        <strong>主要スタック：</strong> Vue / React / TypeScript / Java / Scala / Firebase / GCP
      </li>
      <li><strong>役割：</strong> 実装、技術選定、ミニマネジメント、デザイン補助</li>
    </ul>
    <p>
      GitHub：
      <a href="https://github.com/yu-kky" target="_blank" rel="noopener noreferrer">@yu-kky</a
      ><br />
      当ポートフォリオのリポジトリ：
      <a
        href="https://github.com/yu-kky/errorlog-portfolio-photo"
        target="_blank"
        rel="noopener noreferrer"
      >
        yu-kky/errorlog-portfolio-photo
      </a>
    </p>

    <h3>2. Photography — For Clients <span>撮影依頼をご検討の方へ</span></h3>
    <p>
      コスプレ撮影を中心に、人物・作品撮影にも対応しています。<br />
      逆光・反射光・カラーフィルターを活かした「色と光」の表現が得意です。
    </p>
    <ul>
      <li>
        <strong>対応スタイル：</strong> 白ホリ / 黒ホリ / 多灯 / カラーフィルター /
        特殊（水・スモーク） / 屋外
      </li>
      <li>
        <strong>制作フロー：</strong> 事前相談 → ラフ案共有(ご要望があれば) → 当日撮影 →
        現像・お渡し
      </li>
      <li>
        <strong>納品：</strong> 撮影後 <strong>1週間以内</strong> に現像済み
        JPEGデータ（ギガファイル便）
      </li>
      <li><strong>オプション：</strong> RAW データ、モデルレタッチ（数枚まで）対応可</li>
    </ul>

    <p>
      x(連絡用アカウント)：
      <a href="https://x.com/errorlog_ace" target="_blank" rel="noopener noreferrer"
        >えいす/ERRORLOG @errorlog_ace</a
      ><br />
    </p>

    <h4>費用について</h4>
    <ul>
      <li>撮影料金・交通費：<strong>不要</strong></li>
      <li>ご負担をお願いする費用：スタジオ利用料、カメラマン分のイベント参加費</li>
    </ul>

    <h4>撮影写真の取り扱いについて</h4>
    <p>以下の方針で運用しています。ご不安があればいつでもご相談ください。</p>
    <ul>
      <li>
        <strong>当サイトへの掲載について：</strong>
        基本的に、撮影した写真はこちらでレタッチしたうえで本サイトに掲載させていただきます。
        掲載を希望されない場合、<u>事前・事後を問わず</u>お気軽にお申し出ください。速やかに非掲載／削除対応いたします。
      </li>
      <li>
        <strong>被写体の方による利用：</strong>
        納品データは、<u>クレジット表記</u>を添えて
        SNS／ポートフォリオ／印刷物などに自由に掲載いただけます。 クレジット表記例： 「Photo:
        えいす（@errorlog_ace）」
      </li>
      <li>
        <strong>商用利用について：</strong>
        個人・同人の範囲での掲載は上記のクレジット表記でご自由にどうぞ。
        <u>有償頒布物</u>などの商用利用は、
        <u>事前にご連絡</u
        >のうえ、用途に応じて許諾・クレジット表記・ライセンス料等をご相談させてください。
      </li>
      <li>
        <strong>編集について：</strong>
        被写体のレタッチ・文字入れは問題ありません。大幅な色味変更などが必要な場合はご相談ください。
      </li>
      <li>
        <strong>権利表記：</strong>
        写真の著作権は撮影者（えいす）に、肖像権は被写体本人に帰属します。
      </li>
      <li>
        <strong>禁止事項：</strong>
        納品データの無断再配布・素材販売・AI学習用データセットへの提供はご遠慮ください。
      </li>
      <li>
        <strong>会場ルール優先：</strong>
        スタジオ／イベントの規約がある場合は、そちらを最優先で遵守します。
      </li>
    </ul>
    <p>
      掲載NGやクレジット表記の方法、商用利用のご相談など、個別のご希望があればできる限り対応します。<br />
    </p>
    <DmLink />
  </div>
</template>

<script setup lang="ts">
import DmLink from '@/components/atoms/DmLink.vue'
</script>

<style scoped lang="scss">
@use '@/assets/style/global' as vp;

.column-container {
  max-width: 720px;
  margin: 0 auto 2rem;
  font-size: 0.8rem;
  letter-spacing: 0.04rem;

  padding-bottom: 100px;
  padding-top: 110px;
  padding-inline: 9%;
  @include vp.up(md) {
    padding-top: 90px;
    padding-inline: 5%;
  }
  @include vp.up(lg) {
    padding-top: 70px;
    padding-inline: 0;
  }

  h2 {
    font-family: 'Poppins', sans-serif;
    margin-bottom: 1rem;
  }

  h3 {
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0;
    margin: 2rem 0 1rem 0;
    span {
      font-size: 0.8rem;
      opacity: 0.7;
      margin-left: 0.5em;
    }
  }

  h4 {
    margin: 1.5rem 0 1rem 0;
  }

  ul {
    margin: 0.5rem 0 1.25rem;
    padding-left: 1.2rem;

    li {
      padding-bottom: 3px;
    }
  }
  u {
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: 1.2px;
    text-decoration-skip-ink: auto;
    text-decoration-color: rgba(0, 0, 0, 0.55);
  }

  a {
    color: var(--accent, #6166dc);
    text-decoration: underline;
    text-decoration-thickness: 1.5px;
    text-underline-offset: 3px;
    transition:
      color 0.2s ease,
      text-decoration-thickness 0.15s ease;

    &:hover {
      text-decoration-thickness: 2px;
    }
    &:focus-visible {
      outline: 2px solid var(--accent, #6166dc);
      outline-offset: 2px;
      border-radius: 4px;
    }
    &[href^='http']::after {
      content: '↗';
      font-size: 0.85em;
      margin-left: 0.25em;
    }
    &:visited {
      color: #565bb8;
    }
  }
}
</style>
