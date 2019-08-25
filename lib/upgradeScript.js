"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const exec = __importStar(require("@actions/exec"));
const upgradeScript = (upgrade) => __awaiter(this, void 0, void 0, function* () {
    if (upgrade === 'no') {
        return console.log('GCloud Upgrade not requested');
    }
    if (upgrade === 'snap') {
        // Install Gcloud Snap
        yield exec.exec('sudo snap install google-cloud-sdk --channel=stable --classic');
        // Ensure root is owned (So that snap can run, Possible security issue)
        yield exec.exec('sudo chown root:root /');
        return console.log('GCloud Upgraded using Snap');
    }
    if (upgrade === 'yes') {
        // Add the Cloud SDK distribution URI as a package source
        yield exec.exec('echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" >> /etc/apt/sources.list.d/google-cloud-sdk.list');
        // Import the Google Cloud Platform public key (Save file then import it (Piping is not supported with exec))
        yield exec.exec('curl -o gcp-apt-key.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg');
        yield exec.exec('sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add gcp-apt-key.gpg');
        // Update the package list and install the Cloud SDK
        yield exec.exec('sudo apt-get update');
        return yield exec.exec('sudo apt-get install --only-upgrade google-cloud-sdk');
    }
    return null;
});
exports.default = upgradeScript;
