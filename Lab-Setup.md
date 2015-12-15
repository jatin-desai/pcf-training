## Install CF CLI

* Download

```
curl -L https://cli.run.pivotal.io/stable?release=debian64&source=github -o cf-cli-installer_6.14.0_x86-64.deb
```

* Install

```
sudo dpkg -i cf-cli-installer_6.14.0_x86-64.deb
```

* Verify

```
cf help
```

## Install Ruby

* Install [Ruby Version Manager](http://rvm.io/).

```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
```

* Install Ruby

```
rvm install ruby-2.2
rvm --default use 2.2
source ~/.bashrc
```

$ Verify

```
ruby -v
```

$ Install bosh-cli

```
gem install bosh_cli --no-document
```

### Install [Vagrant](https://docs.vagrantup.com/v2/installation/)

* Download

```
curl -OL https://releases.hashicorp.com/vagrant/1.7.4/vagrant_1.7.4_x86_64.deb
```

* Install

```
sudo dpkg -i vagrant_1.7.4_x86_64.deb
```

* Verify

```
vagrant -v
```

### Install [Bosh Lite](https://github.com/cloudfoundry/bosh-lite)

* Clone repo

```
git clone https://github.com/cloudfoundry/bosh-lite
```

* Verify [Virtual Box](https://www.virtualbox.org/wiki/Downloads) is installed

```
VBoxManage --version
```

* Start Bosh VM

```
cd bosh-lite
vagrant up
```

* Verify Bosh

```
bosh target 192.168.50.4 lite
bosh login admin admin
bosh deployments
```


* Provision Cloud Foundry

```
./bin/add-route
./bin/provision_cf
```

* Verify Cloud Foundry by loging in and creating your first org and space

```
cf login --skip-ssl-validation -a https://api.bosh-lite.com -u admin -p admin
cf create-org pcf-training
cf create-space development -o pcf-training
```

