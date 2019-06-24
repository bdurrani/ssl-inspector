export const HandShakeRecord = [0x16];
export const Protocols = {
  SSLv3: [0x03, 0x00],
  "TLSv1.0": [0x03, 0x01],
  "TLSv1.1": [0x03, 0x02],
  "TLSv1.2": [0x03, 0x03]
};

type ProtocolInteface = "SSLv3" | "TLSv1.0" | "TLSv1.1" | "TLSv1.2";

// 45 bytes of handshake remaining
const RemainingHandshakeBytes = [0x00, 0x2d];

/**
 * Client hello handshake message type
 */
const HandShakeMessageType = [0x1];

//42 bytes remaining
const RemainingHandshakreBytes2 = [0x0, 0x0, 0x29];

const AnotherBuffer = [
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
  0x02
];

const suite = [0x0, 0x35];
const CompressionMethods = [0x01, 0x00];

export const ServerHello = {
  RecordHeader: 0x16,
  HandshakeHeader: 0x2
};

export function createClientHelloBuffer(protocol: ProtocolInteface) {
  return [
    ...HandShakeRecord,
    ...Protocols[protocol],
    ...RemainingHandshakeBytes,
    ...HandShakeMessageType,
    ...RemainingHandshakreBytes2,
    ...Protocols[protocol],
    ...AnotherBuffer,
    ...suite,
    ...CompressionMethods
  ];
}
