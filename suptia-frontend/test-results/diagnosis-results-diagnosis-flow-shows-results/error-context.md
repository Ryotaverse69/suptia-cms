# Page snapshot

```yaml
- alert
- main:
  - heading "かんたん診断" [level=1]
  - heading "目的（複数選択可）" [level=2]
  - checkbox "睡眠" [checked]
  - text: 睡眠
  - checkbox "集中"
  - text: 集中
  - checkbox "疲労対策"
  - text: 疲労対策
  - checkbox "美容"
  - text: 美容
  - checkbox "筋力"
  - text: "筋力 暫定おすすめ: 目的「睡眠」に基づく候補を先出し表示します。"
  - heading "月額予算（円）" [level=2]
  - spinbutton: "3000"
  - heading "感受性" [level=2]
  - checkbox "caffeine-sensitive"
  - text: caffeine-sensitive
  - checkbox "niacin-flush"
  - text: niacin-flush
  - heading "服薬" [level=2]
  - checkbox "anticoagulant"
  - text: anticoagulant
  - checkbox "ssri"
  - text: ssri
  - heading "妊娠/授乳" [level=2]
  - checkbox "妊娠中/授乳中"
  - text: 妊娠中/授乳中
  - button "戻る"
  - button "次へ"
  - button "結果を見る"
- img
- text: 1 error
- button "Hide Errors":
  - img
```