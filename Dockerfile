FROM nginx:1

MAINTAINER Maksym Kotliar <kotlyar.maksim@gmail.com>

RUN mkdir /payum
RUN rm -rf /usr/share/nginx/html && cd /usr/share/nginx && ln -s /payum html

EXPOSE 80

ADD . /payum
WORKDIR /payum
