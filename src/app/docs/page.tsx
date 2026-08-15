import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import {
  APP_URL,
  AMOUNT_MAX,
  AMOUNT_MIN,
  RATE_LIMIT_PER_MINUTE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "เอกสาร API",
  description: "เอกสารและตัวอย่างการเรียกใช้ nxeon fixqr API",
};

const endpoint = `${APP_URL}/api/v1/qr`;
const exampleUrl = `${endpoint}?type=phone&target=0812345678&amount=100.00`;

const examples = [
  {
    label: "URL",
    code: exampleUrl,
  },
  {
    label: "curl",
    code: `curl -o qr.png "${exampleUrl}"`,
  },
  {
    label: "JavaScript",
    code: `const url = new URL("${endpoint}");
url.searchParams.set("type", "phone");
url.searchParams.set("target", "0812345678");
url.searchParams.set("amount", "100.00");

const res = await fetch(url);
if (!res.ok) {
  const err = await res.json();
  throw new Error(err.error);
}

const blob = await res.blob();
const imgUrl = URL.createObjectURL(blob);
document.querySelector("#qr").src = imgUrl;`,
  },
  {
    label: "Python",
    code: `import urllib.request

url = (
  "${endpoint}"
  "?type=phone&target=0812345678&amount=100.00"
)

urllib.request.urlretrieve(url, "qr.png")
print("saved qr.png")`,
  },
  {
    label: "PHP",
    code: `<?php
$url = "${exampleUrl}";
$png = file_get_contents($url);

if ($png === false) {
  http_response_code(502);
  echo "Failed to fetch QR";
  exit;
}

header("Content-Type: image/png");
echo $png;`,
  },
  {
    label: "Java",
    code: `import java.io.InputStream;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;

public class FixQrExample {
  public static void main(String[] args) throws Exception {
    String url =
      "${exampleUrl}";

    try (InputStream in = URI.create(url).toURL().openStream()) {
      Files.copy(in, Path.of("qr.png"));
    }
  }
}`,
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="text-xs tracking-[0.3em] text-[var(--accent-bright)]">
        เอกสาร
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-brand)] text-3xl tracking-[0.08em] sm:text-4xl">
        เอกสาร API
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        API สาธารณะฟรี — ไม่ต้องมี API key · คืนค่าเป็นรูป PNG โดยตรง
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="font-[family-name:var(--font-brand)] text-sm tracking-[0.2em] text-[var(--accent-bright)]">
          ปลายทาง
        </h2>
        <div className="border border-[var(--line)] bg-[var(--bg-elevated)] p-4 font-mono text-sm">
          <span className="text-[var(--accent)]">GET</span> {endpoint}
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-[family-name:var(--font-brand)] text-sm tracking-[0.2em] text-[var(--accent-bright)]">
          พารามิเตอร์
        </h2>
        <div className="overflow-x-auto border border-[var(--line)]">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-[var(--bg-elevated)] text-xs tracking-widest text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">ชื่อ</th>
                <th className="px-4 py-3 font-medium">จำเป็น</th>
                <th className="px-4 py-3 font-medium">คำอธิบาย</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              <tr>
                <td className="px-4 py-3 font-mono text-[var(--accent-bright)]">
                  type
                </td>
                <td className="px-4 py-3">ใช่</td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  <code className="text-[var(--fg)]">phone</code> หรือ{" "}
                  <code className="text-[var(--fg)]">national_id</code>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-[var(--accent-bright)]">
                  target
                </td>
                <td className="px-4 py-3">ใช่</td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  เบอร์ <code className="text-[var(--fg)]">0xxxxxxxxx</code> หรือ
                  เลขบัตรประชาชน 13 หลัก (มี checksum)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-[var(--accent-bright)]">
                  amount
                </td>
                <td className="px-4 py-3">ใช่</td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  จำนวนเงิน ทศนิยม 2 ตำแหน่ง · {AMOUNT_MIN.toFixed(2)}–
                  {AMOUNT_MAX.toLocaleString()}.00 บาท
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-[family-name:var(--font-brand)] text-sm tracking-[0.2em] text-[var(--accent-bright)]">
          การตอบกลับ
        </h2>
        <ul className="space-y-2 text-sm text-[var(--muted)]">
          <li>
            · <span className="text-[var(--fg)]">200</span> —{" "}
            <code>image/png</code> รูป QR
          </li>
          <li>
            · <span className="text-[var(--fg)]">400</span> — JSON{" "}
            <code>{`{ "error": "..." }`}</code>
          </li>
          <li>
            · <span className="text-[var(--fg)]">429</span> — เกินโควต้า (
            {RATE_LIMIT_PER_MINUTE} ครั้ง/นาที/IP)
          </li>
        </ul>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="font-[family-name:var(--font-brand)] text-sm tracking-[0.2em] text-[var(--accent-bright)]">
          ตัวอย่างโค้ด
        </h2>
        {examples.map((ex) => (
          <CodeBlock key={ex.label} label={ex.label} code={ex.code} />
        ))}
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-[family-name:var(--font-brand)] text-sm tracking-[0.2em] text-[var(--accent-bright)]">
          ใช้กับ HTML img
        </h2>
        <CodeBlock
          label="HTML"
          code={`<img
  src="${exampleUrl}"
  alt="PromptPay QR"
  width="256"
  height="256"
/>`}
        />
      </section>
    </div>
  );
}
