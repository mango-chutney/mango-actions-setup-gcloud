# Setup and Activate GCloud | Github Action

Very simple javascript github action for setting up google cloud CLI `gcloud` command with an service-account for authentication and permissions.

## Options

#### Service Account

The service account to activate in order to call authenticated gcloud requests. The value given to it must be a base64 encoded github secret of a google service account json file.

```
service_account: ${{ secrets.GCLOUD_AUTH }}
```

If service_account is not provided no service account will be activated for authenticated requets using the cli. However you are still able to upgrade gcloud and use public non authenticated requests.

#### Upgrade

Either to upgrade to latest version of gcloud or not.

Default Value: `no`

Possible Values:

```
'no' | 'yes' | 'snap'
```

_Snap_: Will install the latest gcloud version using a snap package instead of apt-get which is slightly slower than snap.

**Note** Upgrading at all is considerably slower, Only upgrade if the runners gcloud is broken on the current version it uses.

## Example

Activate with service account and upgrade using snap package.

```
  - uses: mango-chutney/mango-actions-setup-gcloud@releases/v1
    with:
      service_account: ${{ secrets.GCLOUD_AUTH }}
      upgrade: 'snap'
```

Most common usage will not include upgrading because it is considerably faster to run.

```
  - uses: mango-chutney/mango-actions-setup-gcloud@releases/v1
    with:
      service_account: ${{ secrets.GCLOUD_AUTH }}
```

### TODO

#### Upgrade / Downgrade Using gcloud components
