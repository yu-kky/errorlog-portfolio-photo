<!-- XContact.vue -->
<template>
  <div class="x-contact">
    <a :href="dmUrl" class="btn" rel="noopener" target="_blank">XのDMで依頼する</a>

    <details class="acc">
      <summary>撮影依頼テンプレート（クリックで展開）</summary>
      <div class="acc-body">
        <p class="desc">下のボタンでテンプレをコピーできます。DMに貼り付けてお使いください。</p>

        <pre ref="tplEl" class="template" aria-label="撮影依頼テンプレ">{{ template }}</pre>

        <div class="actions">
          <button class="btn ghost" @click="copyTemplate" :disabled="copied">
            {{ copied ? 'コピーしました' : 'テンプレをコピー' }}
          </button>
        </div>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
const dmUrl = `https://x.com/errorlog_ace`

const template = `【撮影依頼】
・希望日程：
・場所/エリア：
・人数/ジャンル：
・イメージ/参考：
・ご連絡先：
・当サイトへの掲載可否：可/不可`

import { ref } from 'vue'
const tplEl = ref<HTMLElement | null>(null)
const copied = ref(false)

async function copyTemplate() {
  const text = template
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    const el = tplEl.value
    if (!el) return
    const range = document.createRange()
    range.selectNodeContents(el)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    const ok = document.execCommand('copy')
    sel?.removeAllRanges()
    if (ok) {
      copied.value = true
      setTimeout(() => (copied.value = false), 2000)
    } else {
      alert('コピーできませんでした。手動で選択してコピーしてください。')
    }
  }
}
</script>

<style scoped>
.x-contact {
  display: grid;
  gap: 12px;
  margin-top: 30px;
}
.btn {
  display: inline-block;
  padding: 12px 16px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  background: #111;
  color: #fff;
  text-align: center;
}
.btn.ghost {
  background: #f4f4f4;
  color: #111;
}
.acc {
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
  padding: 10px 12px;
}
.acc > summary {
  list-style: none;
  cursor: pointer;
  font-weight: 700;
  outline: none;
}
.acc > summary::-webkit-details-marker {
  display: none;
}
.acc-body {
  padding: 8px 2px 2px;
  display: grid;
  gap: 10px;
}
.desc {
  color: #666;
  font-size: 0.7rem;
  margin: 0 2px;
}
.template {
  margin: 0;
  padding: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  border: 1px dashed #ddd;
  border-radius: 10px;
  background: #fafafa;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.actions {
  display: flex;
  gap: 8px;
}
</style>
