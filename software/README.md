
# Software

## Other needed sofware:

```
sudo apt install python-smbus
sudo apt install rpi.gpio
sudo apt install mariadb-server
sudo apt install git
sudo apt install pip
```

## Install needed libs:

```
pip install -r requirements.txt
```

## Create DB
```SQL
CREATE DATABASE cocktail_mashine;
CREATE USER 'cocktailsForAll' IDENTIFIED BY 'drunken1';
GRANT ALL ON cocktail_mashine.* TO 'cocktailsForAll'@'%';

CREATE TABLE recipe (id BIGINT NOT NULL AUTO_INCREMENT, name VARCHAR(128), PRIMARY KEY (id));
CREATE TABLE ingredient (id BIGINT NOT NULL AUTO_INCREMENT, name VARCHAR(128), alcohol FLOAT(4,4) UNSIGNED, PRIMARY KEY (id));
CREATE TABLE recipeItem (ingredient BIGINT NOT NULL, recipe BIGINT NOT NULL, ml DOUBLE, INDEX (recipe), INDEX (ingredient));
ALTER TABLE recipeItem ADD FOREIGN KEY (recipe) REFERENCES recipe(id) ON DELETE CASCADE;
ALTER TABLE recipeItem ADD FOREIGN KEY (ingredient) REFERENCES ingredient(id) ON DELETE CASCADE;
CREATE TABLE orders (id BIGINT NOT NULL AUTO_INCREMENT, recipe BIGINT NOT NULL, createdAt TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP, processingStatus ENUM('new', 'processing', 'completed', 'canceled'), PRIMARY KEY (id));
ALTER TABLE orders ADD FOREIGN KEY (recipe) REFERENCES recipe(id) ON DELETE RESTRICT;
```
## nginx config

```nginx
	root /home/pi/cocktail-machine/software/web/ui/;
	
	location / {
		index index.html;
		try_files $uri $uri/ =404;
	}
	
	location /api/ {
		proxy_pass http://localhost:5000;
	}
```

start webserver
inside the software folder (/home/pi/cocktail-machine/software/)

```
nohup python ./main.py &
```

## on boot
If you want the server to boot on start copy [cocktail.service](cocktail.service) to /etc/systemd/system and enable the script.
```
sudo cp cocktail.service /etc/systemd/system/
sudo systemctl enable cocktail.service
```

## run as access point
https://raspberrypi.stackexchange.com/questions/89803/access-point-as-wifi-router-repeater-optional-with-bridge

# Development

## structure
- "./"
contains python and configuration files. (the python stuff should move to a subfolder)
	- "cocktail.service"
linux service file
	- "config.conf"
configuration file for the cocktail-mashine
	- "pumps.conf"
configuration file for physical available pumps
- "js"
contains all java-script related stuff for the ui
- "web"
contains the python webserver for the api
	- "ui"
contains all files served public by nginx
- "db"
contains the python database connector


## compile javascript
```
cd ./js
npm install
npm run build
```
