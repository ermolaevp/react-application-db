FROM postgres:9.6
# install pgjwt extension
RUN apt-get update \
	&& apt-get install ssh-client git make postgresql-server-dev-9.6 -y \
	&& git clone https://github.com/michelp/pgjwt.git \
	&& cd pgjwt \
	&& make install
	