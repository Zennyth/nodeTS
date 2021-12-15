
interface AckAttributes {
  ack: number;
}

/**
 * @typedef AckAttributes
 * @property {number} id.required - - eg: 1
 */
class Ack implements AckAttributes {
  ack: number;
}

enum ACKs {
  VALID,
  INVALID_CHECKSUM,
}

export default Ack;

export {
  ACKs
}