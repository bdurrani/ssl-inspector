import ciphers from "./outfile.json";

type ProtocolInteface = "SSLv3" | "TLSv1.0" | "TLSv1.1" | "TLSv1.2";

export const HandShakeRecord = [0x16];
export const Protocols = {
  SSLv3: [0x03, 0x00],
  "TLSv1.0": [0x03, 0x01],
  "TLSv1.1": [0x03, 0x02],
  "TLSv1.2": [0x03, 0x03]
};

// 45 bytes of handshake remaining
const RemainingHandshakeBytes = [0x00, 0x2d];

/**
 * Client hello handshake message type
 */
const HandShakeMessageType = [0x1];

//42 bytes remaining
const RemainingHandshakeBytes2 = [0x0, 0x0, 0x29];

const Random32Bytes = [
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
  0x1b
  // 0x00, // session id
  // 0x00,
  // 0x02 // 2 bytes of cipher suite data
];

function generateRandomBytes(min: number = 0, max: number = 255) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SessionId = [0x0];
const CipherSuiteSize = [0x0, 0x2];

const suite = [0x0, 0x35];

/**
 * [Number of bytes of compression data,
 * No compression ]
 */
const CompressionMethods = [0x01, 0x00];

export const ServerHello = {
  RecordHeader: 0x16,
  HandshakeHeader: 0x2
};

export function createClientHelloBuffer(protocol: ProtocolInteface) {
  const random32Bytes = new Uint8Array(32);
  for (let index = 0; index < 32; index++) {
    random32Bytes[index] = generateRandomBytes();
  }
  return [
    ...HandShakeRecord,
    ...Protocols[protocol],
    ...RemainingHandshakeBytes,
    ...HandShakeMessageType,
    ...RemainingHandshakeBytes2,
    ...Protocols[protocol],
    ...random32Bytes,
    ...SessionId,
    ...CipherSuiteSize,
    ...suite,
    ...CompressionMethods
  ];
}
