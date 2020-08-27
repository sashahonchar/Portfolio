import TelegramBot from "node-telegram-bot-api";
import config from "config";

const _token = config.get("token");
const CodingChipmunksBot = new TelegramBot(_token, { polling: true });

export default CodingChipmunksBot;
