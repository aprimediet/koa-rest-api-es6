Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "koa-rest-api"

  config.vm.provision :shell, path: "sh/core.sh"
  config.vm.provision :shell, path: "sh/nvm.sh", privileged: false

  # KOA
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # MONGO
  #config.vm.network "forwarded_port", guest: 27017, host: 27017

  # REDIS
  #config.vm.network "forwarded_port", guest: 6379, host: 6379

  config.vm.box_check_update = false
  config.vm.synced_folder '.', '/vagrant', disabled: true
  config.vm.synced_folder '.', "/home/vagrant/koa-rest-api", create: true, group: "vagrant", owner: "vagrant",
	type: "rsync",
	rsync__exclude:  [".git/", "node_modules/"],
	rsync__args: ["--verbose", "--archive", "--delete", "-z", "--chmod=ugo=rwX"]

  # Configure VM settings for server running in VirtualBox
  config.vm.provider "virtualbox" do |vb|
        vb.gui = false
        # Need This If On Windows
        vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
        vb.name = "koa-rest-api"
        vb.memory = 4096
        vb.cpus = 2
  end

  config.vm.provision :docker
  config.vm.provision :docker_compose

end

# DEBUGGING
# vagrant ssh -- -L 27017:127.0.0.1:27017 -L 5859:127.0.0.1:5858
# telnet 127.0.0.1 5858
