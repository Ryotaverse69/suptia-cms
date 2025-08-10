"use client"
import {useState} from 'react'
import {useRouter} from 'next/navigation'

type FormState = {
  goals: string[]
  budgetJPY: number
  sensitivityTags: string[]
  medicationTags: string[]
  pregnancyOrLactation: boolean
}

const GOALS = ['睡眠', '集中', '疲労対策', '美容', '筋力']
const SENS = ['caffeine-sensitive', 'niacin-flush']
const MEDS = ['anticoagulant', 'ssri']

export default function DiagnosisPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    goals: [],
    budgetJPY: 3000,
    sensitivityTags: [],
    medicationTags: [],
    pregnancyOrLactation: false,
  })

  const submit = async () => {
    const res = await fetch('/results', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    if (res.ok) router.push('/results')
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <h1 className="text-2xl font-bold">かんたん診断</h1>

      <section>
        <h2 className="font-semibold mb-2">目的（複数選択可）</h2>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => (
            <label key={g} className="inline-flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.goals.includes(g)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    goals: e.target.checked ? [...f.goals, g] : f.goals.filter((x) => x !== g),
                  }))
                }
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">月額予算（円）</h2>
        <input
          type="number"
          value={form.budgetJPY}
          onChange={(e) => setForm((f) => ({...f, budgetJPY: Number(e.target.value)}))}
          className="w-40 rounded border px-2 py-1"
          min={0}
        />
      </section>

      <section>
        <h2 className="font-semibold mb-2">感受性</h2>
        <div className="flex flex-wrap gap-2">
          {SENS.map((s) => (
            <label key={s} className="inline-flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.sensitivityTags.includes(s)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    sensitivityTags: e.target.checked
                      ? [...f.sensitivityTags, s]
                      : f.sensitivityTags.filter((x) => x !== s),
                  }))
                }
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">服薬</h2>
        <div className="flex flex-wrap gap-2">
          {MEDS.map((m) => (
            <label key={m} className="inline-flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.medicationTags.includes(m)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    medicationTags: e.target.checked
                      ? [...f.medicationTags, m]
                      : f.medicationTags.filter((x) => x !== m),
                  }))
                }
              />
              <span>{m}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold mb-2">妊娠/授乳</h2>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.pregnancyOrLactation}
            onChange={(e) => setForm((f) => ({...f, pregnancyOrLactation: e.target.checked}))}
          />
          <span>妊娠中/授乳中</span>
        </label>
      </section>

      <div className="flex justify-end">
        <button onClick={submit} className="rounded bg-black px-4 py-2 text-white">結果を見る</button>
      </div>
    </main>
  )
}


