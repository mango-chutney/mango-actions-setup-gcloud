import * as exec from '@actions/exec';

const upgradeScript = async (upgrade: string) => {
  if (upgrade === 'no') {
    return console.log('GCloud Upgrade not requested');
  }

  if (upgrade === 'snap') {
    // Install Gcloud Snap
    await exec.exec(
      'sudo snap install google-cloud-sdk --channel=stable --classic',
    );

    // Ensure root is owned (So that snap can run, Possible security issue)
    await exec.exec('sudo chown root:root /');
    return console.log('GCloud Upgraded using Snap');
  }

  if (upgrade === 'yes') {
    // Add the Cloud SDK distribution URI as a package source
    await exec.exec(
      'echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" >> /etc/apt/sources.list.d/google-cloud-sdk.list',
    );
    // Import the Google Cloud Platform public key (Save file then import it (Piping is not supported with exec))
    await exec.exec(
      'curl -o gcp-apt-key.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg',
    );
    await exec.exec(
      'sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add gcp-apt-key.gpg',
    );
    // Update the package list and install the Cloud SDK
    await exec.exec('sudo apt-get update');
    return await exec.exec(
      'sudo apt-get install --only-upgrade google-cloud-sdk',
    );
  }
  return null;
};

export default upgradeScript;
