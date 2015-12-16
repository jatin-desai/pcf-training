## Install CF CLI

* Download

```
curl -L https://cli.run.pivotal.io/stable?release=debian64&source=github -o cf-cli-installer_6.14.0_x86-64.deb
```

> If curl command fails in you environment download using a browser

* Install

```
sudo dpkg -i cf-cli-installer_6.14.0_x86-64.deb
```

* Verify

```
cf help
```

## Install Ruby

### Using a Ruby Version Manager

* Install [Ruby Version Manager](http://rvm.io/).

```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
```

If the above commands fail then follow the instructions on the RVM web site for alternate installation methods.

* Install Ruby

```
rvm install ruby-2.2
rvm --default use 2.2
source ~/.bashrc
```

* Verify 

```
ruby -v
```

### Install to your system ruby

Alternatively install ruby via apt-get. Not that if you install the system ruby you will have to provision as sudo. 

```
sudo apt-get install ruby
```

> Installing a system Ruby is not recommended as undoing issues that may arise from mismatched gems are difficult and the need to run ruby commands as sudo.

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

$ Install bosh-cli

```
gem install bosh_cli --no-document
```

* Verify Bosh

```
bosh target 192.168.50.4 lite
bosh login admin admin
bosh deployments
```

* If you installed a system ruby then ensure bundler is installed

```
sudo gem install bundler --no-document
```

* Download [spiff](https://github.com/cloudfoundry-incubator/spiff)

```
curl -OL https://github.com/cloudfoundry-incubator/spiff/releases/download/v1.0.7/spiff_linux_amd64.zip
```

Once downloaded unzip it and copy the ```spiff``` binary to the ```/usr/bin``` folder.

* Provision Cloud Foundry

```
./bin/add-route
./bin/provision_cf
```

> Run the provision script as sudo if you are using the system Ruby.

* Verify Cloud Foundry by loging in and creating your first org and space

```
cf login --skip-ssl-validation -a https://api.bosh-lite.com -u admin -p admin
cf create-org pcf-training
cf create-space development -o pcf-training
```

### Restoring bosh-lite

Before you shutdown your system make sure you suspend the bosh-lite VM.

```
vagrant suspend
```

Once you have restarted you workstation then resume the bosh-lite VM.

```
vagrant up
```

Sometimes your bosh agents may become unresponsive and although your VM comes up you will not be able to access your Cloud Foundry deployment. To recover.

```
bosh cck
```

Instruct bosh to re-create the managed VMs when it gives you the recovery options. Once recovery is complete ensure the route to the warden containers within the bosh-lite VMs is re-established.

```
./bin/add-route
```

### Cloud lab files

```
cd ~
git clone https://github.com/S2EDU/CloudFoundryStudentFiles
```
