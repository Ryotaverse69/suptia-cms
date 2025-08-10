# AGENTS — Sanity スキーマ

## 必須スキーマ
Ingredient / Product / Evidence / Rule / Persona

## 必須フィールド例
- Ingredient: name, synonyms[], category, evidenceLevel(A|B|C), dosageRange, contraindications[], interactions[]
- Product: brand, name, slug, ingredients[], form, servingsPerContainer, priceJPY, urlRakuten, urlAmazon, lastCheckedAt
- Evidence: ingredientRef, studyType, n, outcome, citation, qualityScore
- Rule: weights, contraindicationRules[], interactionRules[], rankingTieBreak
- Persona: goals[], budgetJPY, sensitivityTags[], medicationTags[], pregnancyOrLactation

## ルール
- slugは自動生成（小文字英数）
- priceJPYは0以上
- lastCheckedAtはdatetime
- バリデーションとdescription必須
