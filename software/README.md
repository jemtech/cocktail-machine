
# Software

## Other needed sofware:

- sudo apt install python-smbus
- sudo apt install rpi.gpio
- sudo apt install mariadb-server
- sudo apt install git
- sudo apt install pip

## Install needed libs:

- pip install Flask
- pip install connexion[swagger-ui]
- pip install mysql-connector
- pip install adafruit-pca9685
- pip install pcf8574

## Create DB
- CREATE DATABASE cocktail_mashine;
- CREATE USER 'cocktailsForAll' IDENTIFIED BY 'drunken1';
- GRANT ALL ON cocktail_mashine.* TO 'cocktailsForAll'@'%';
- CREATE TABLE recipe (id BIGINT NOT NULL AUTO_INCREMENT, name VARCHAR(128), PRIMARY KEY (id));
- CREATE TABLE ingredient (id BIGINT NOT NULL AUTO_INCREMENT, name VARCHAR(128), PRIMARY KEY (id));
- CREATE TABLE recipeItem (ingredient BIGINT NOT NULL, recipe BIGINT NOT NULL, ml DOUBLE, INDEX (recipe), INDEX (ingredient));
- ALTER TABLE recipeItem ADD FOREIGN KEY (recipe) REFERENCES recipe(id) ON DELETE CASCADE;
- ALTER TABLE recipeItem ADD FOREIGN KEY (ingredient) REFERENCES ingredient(id) ON DELETE CASCADE;

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