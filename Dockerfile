FROM nginx:1

MAINTAINER Maksym Kotliar <kotlyar.maksim@gmail.com>

EXPOSE 80

ADD . /usr/share/nginx/html
