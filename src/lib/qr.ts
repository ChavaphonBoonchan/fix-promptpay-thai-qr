import { anyId } from "promptparse/generate";
import QRCode from "qrcode";
import type { ProxyTypeParam } from "./constants";
import { withQrSlot } from "./concurrency";

export async function generatePromptPayQrPng(
  type: ProxyTypeParam,
  target: string,
  amount: number,
): Promise<Buffer> {
  return withQrSlot(async () => {
    const proxyType = type === "phone" ? "MSISDN" : "NATID";
    const payload = anyId({
      type: proxyType,
      target,
      amount,
    });

    return QRCode.toBuffer(payload, {
      type: "png",
      width: 512,
      margin: 2,
      errorCorrectionLevel: "M",
      color: {
        dark: "#0a1628",
        light: "#ffffff",
      },
    });
  });
}
