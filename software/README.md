
Other needed sofware:

sudo apt install python-smbus
sudo apt install rpi.gpio
sudo apt install mariadb-server
sudo apt install git
sudo apt install pip

Install needed libs:

pip install Flask
pip install connexion[swagger-ui]
pip install mysql-connector
pip install adafruit-pca9685
pip install pcf8574

Create DB
CREATE DATABASE cocktail_mashine;
CREATE TABLE recipe (id BIGINT NOT NULL AUTO_INCREMENT, name VARCHAR(128), PRIMARY KEY (id));
CREATE TABLE ingredient (id BIGINT NOT NULL AUTO_INCREMENT, name VARCHAR(128), PRIMARY KEY (id));
CREATE TABLE recipeItem (ingredient BIGINT NOT NULL, recipe BIGINT NOT NULL, ml DOUBLE, INDEX (recipe), INDEX (ingredient));