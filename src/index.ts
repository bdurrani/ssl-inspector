import net from "net";
import PromiseSocket from "promise-socket";
import { createClientHelloBuffer } from "./constants";

// docs: https://tls.ulfheim.net/
(async () => {
  const client = new net.Socket();
  const socket = new PromiseSocket(client);
  await socket.connect({
    port: 443,
    host: "google.com"
  });

  const buffer = [
    0x16,
    //protocol,
    0x03,
    0x01,
    0x00,
    0x2d,
    0x01,
    0x00,
    0x00,
    0x29,
    //protocol,
    0x03,
    0x01,
    0x53,
    0x4a,
    0x84,
    0xa9,
    0x00,
    0x01,
    0x02,
    0x03,
    0x04,
    0x05,
    0x06,
    0x07,
    0x08,
    0x09,
    0x0a,
    0x0b,
    0x0c,
    0x0d,
    0x0e,
    0x0f,
    0x10,
    0x11,
    0x12,
    0x13,
    0x14,
    0x15,
    0x16,
    0x17,
    0x18,
    0x19,
    0x1a,
    0x1b,
    0x00,
    0x00,
    0x02,
    //suite[:'id'],
    0x00,
    0x35,
    0x01,
    0x00
  ];

  const buffer2 = createClientHelloBuffer("TLSv1.0");
  const data = new Uint8Array(buffer2);
  const byteWritten = await socket.write(Buffer.from(data));
  const input = await socket.readAll();
  console.log("all done");
})();
