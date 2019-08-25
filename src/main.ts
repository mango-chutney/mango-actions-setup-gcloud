import fs from 'fs';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import upgradeScript from './upgradeScript';

// TODO: Support mutiple operating systems

async function run() {
  try {
    // Inputs
    const upgrade = core.getInput('upgrade');
    const service_account = core.getInput('service_account');

    // Start Installing
    await upgradeScript(upgrade);

    // Initialize Gcloud
    const SABuffer = Buffer.from(service_account, 'base64');
    fs.writeFileSync('gcloud.json', SABuffer);

    await exec.exec(
      'gcloud auth activate-service-account --key-file=gcloud.json',
    );

    // Cleanup
    fs.unlinkSync('gcloud.json');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
