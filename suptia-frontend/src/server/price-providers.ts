/**
 * 価格取得プロバイダのインターフェイス（将来 楽天/PA-API に差し替え可能）
 */
export interface PriceProvider {
  getPrice(query: string): Promise<number | null>
}

/** 疑似乱数（安定化のための簡易ハッシュ） */
function pseudoRandomInt(seed: string, min: number, max: number): number {
  let h = 0
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) | 0
  const normalized = Math.abs(h % 1000) / 1000
  return Math.round(min + (max - min) * normalized)
}

class MockRakutenProvider implements PriceProvider {
  async getPrice(productName: string): Promise<number | null> {
    // 1,000〜8,000円の擬似価格
    return pseudoRandomInt(productName, 1000, 8000)
  }
}

class MockAmazonProvider implements PriceProvider {
  async getPrice(asinOrQuery: string): Promise<number | null> {
    // 1,000〜9,000円の擬似価格
    return pseudoRandomInt(asinOrQuery, 1000, 9000)
  }
}

const rakutenProvider: PriceProvider = new MockRakutenProvider()
const amazonProvider: PriceProvider = new MockAmazonProvider()

/**
 * 楽天の価格を取得（モック）
 */
export async function getRakutenPrice(productName: string): Promise<number | null> {
  if (!productName) return null
  return rakutenProvider.getPrice(productName)
}

/**
 * Amazonの価格を取得（モック）
 */
export async function getAmazonPrice(asinOrQuery: string): Promise<number | null> {
  if (!asinOrQuery) return null
  return amazonProvider.getPrice(asinOrQuery)
}

export const providers = {
  rakuten: rakutenProvider,
  amazon: amazonProvider,
}


