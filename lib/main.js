"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
const upgradeScript_1 = __importDefault(require("./upgradeScript"));
// TODO: Support mutiple operating systems
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Inputs
            const upgrade = core.getInput('upgrade');
            const service_account = core.getInput('service_account');
            // Start Installing
            yield upgradeScript_1.default(upgrade);
            // Initialize Gcloud
            const SABuffer = Buffer.from(service_account, 'base64');
            fs_1.default.writeFileSync('gcloud.json', SABuffer);
            yield exec.exec('gcloud auth activate-service-account --key-file=gcloud.json');
            // Cleanup
            fs_1.default.unlinkSync('gcloud.json');
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
