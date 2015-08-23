FROM node:0.10.40
MAINTAINER Justin Lathrop <jelathrop@gmail.com>

RUN apt-get update
RUN apt-get install -y default-jre

RUN mkdir -p /opt/cast-central-web
WORKDIR /opt/cast-central-web
ADD /package.json package.json
ADD /bower.json bower.json
ADD /bin bin
ADD /config config
ADD /modules modules
ADD /resources resources
RUN npm install --unsafe-perm

WORKDIR /
ADD /startup.sh /startup.sh
RUN chmod +x /startup.sh

EXPOSE 8001:8001
ENV DEBUG=*
ENTRYPOINT ["/startup.sh"]
CMD ["--clean", "--build", "--run"]
