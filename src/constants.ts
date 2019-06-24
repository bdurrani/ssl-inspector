export const HandShakeRecord = [0x16];
export const Protocols = {
  SSLv3: [0x03, 0x00],
  'TLSv1.0': [0x03, 0x01],
  'TLSv1.1': [0x03, 0x02],
  'TLSv1.2': [0x03, 0x03]
};

type ProtocolInteface = 'SSLv3' | 'TLSv1.0' | 'TLSv1.1' | 'TLSv1.2';

// 45 bytes of handshake remaining
const RemainingHandshakeBytes = [0x00, 0x2d];

/**
 * Client hello handshake message type
 */
const HandShakeMessageType = [0x1];

//42 bytes remaining
const RemainingHandshakreBytes2 = [0x0, 0x0, 0x29];

export function createClientHelloBuffer(protocol: ProtocolInteface) {
  return [
    ...HandShakeRecord,
    ...Protocols[protocol],
    ...RemainingHandshakeBytes,
    ...HandShakeMessageType,
    ...RemainingHandshakreBytes2,
    ...Protocols[protocol]
  ];
}
