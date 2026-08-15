# nxeon fixqr

API + เว็บสร้าง **PromptPay Fix Amount QR** ฟรี

**License:** [MIT](./LICENSE)

- **โดเมน:** https://qr.9zahub.com
- **ไลบรารี:** [promptparse](https://github.com/maythiwat/promptparse)

## API เร็ว

```
GET https://qr.9zahub.com/api/v1/qr?type=phone&target=0812345678&amount=100.00
```

คืน `image/png` · ไม่ต้องมี API key · จำกัด **20 ครั้ง/นาที/IP** · วงเงิน **1.00–10,000.00 บาท**

## พัฒนาท้องถิ่น

```bash
cp .env.example .env.local
npm install
npm run dev
```

เปิด http://localhost:3000

## Deploy บน Vercel

1. ไปที่ [vercel.com/new](https://vercel.com/new) แล้ว Import repo นี้
2. Framework Preset: **Next.js** (ตรวจจับอัตโนมัติ)
3. ตั้ง Environment Variables:

| Name | Value | Environments | จำเป็น? |
|------|--------|--------------|---------|
| `NEXT_PUBLIC_APP_URL` | `https://qr.9zahub.com` | Production, Preview | ใช่ (ตอน build) |
| `TRUST_PROXY` | `true` | Production, Preview | ไม่บังคับ (ค่าเริ่มต้น trust อยู่แล้ว) |

4. Deploy
5. ตั้ง Custom Domain: Project → Settings → Domains → เพิ่ม `qr.9zahub.com` (ชี้ DNS ตามที่ Vercel บอก)

หลังเชื่อม Git แล้ว push ไป `main`/`master` จะ deploy อัตโนมัติ

**หมายเหตุ:** rate limit เป็นแบบ in-memory ต่อ instance — บน serverless ของ Vercel อาจไม่เข้มเท่าโฮสต์เดียว

## หน้าเว็บ

| เส้นทาง | คำอธิบาย |
|---------|----------|
| `/` | หน้าแรก |
| `/playground` | ทดลองสร้าง QR |
| `/docs` | เอกสาร API |
| `/terms` | ข้อกำหนด |
| `/privacy` | ความเป็นส่วนตัว |

## License

MIT
