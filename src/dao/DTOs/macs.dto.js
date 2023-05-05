export default class MacsDto {
  constructor(mac) {}

  static formatTerminal = (mac) => {
    mac = mac.toUpperCase();
    if (mac.length === 17) {
      return mac.replace(/:/g, "-");
    }
    if (mac.length === 12) {
      return mac.match(/.{1,2}/g).join("-");
    }
  };
}
