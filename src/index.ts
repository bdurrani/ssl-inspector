import net from "net";
import PromiseSocket from "promise-socket";
import {
  createClientHelloBuffer,
  Protocols,
  HandShakeRecord
} from "./constants";
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

// async function readFromServer(socket: PromiseSocket<net.Socket>) {
//   let chunk = null;
//   let size = 0;
//   const result = [];
//   do {
//     if (chunk) {
//       size += chunk.length;
//       result.push(chunk);
//     }
//     chunk = await socket.read();
//   } while (chunk != null && size <= 50);

//   return Buffer.concat(result, size);
// }

// docs: https://tls.ulfheim.net/
(async () => {
  const client = new net.Socket();
  const socket = new PromiseSocket(client);
  try {
    await socket.connect({
      port: 443,
      host: "google.com"
    });

    const sslBuffer = Buffer.from(createClientHelloBuffer("TLSv1.0"));
    const data = new Uint8Array(sslBuffer);
    const byteWritten = await socket.writeAll(sslBuffer, sslBuffer.length);
    const serverData = <Buffer>await socket.read(50);

    if (!serverData) {
      console.log("server returns no data");
      return;
    }

    if (serverData[0] === HandShakeRecord[0]) {
      console.log("got handshake record");
      const protocolVersion = serverData.slice(1, 3);
      if (protocolVersion.compare(Buffer.from(Protocols["TLSv1.0"])) === 0) {
        console.log("found TLS 1.0 supprt");
      }
    }
    console.log("all done");
  } catch (error) {
    console.error("error connecting to host");
  } finally {
    socket.destroy();
  }
})();
