FROM fusuf/whatsasena:publicbeta

RUN git clone https://github.com/agentnova/WhatsAsena /root/WhatsAsena
RUN mkdir /root/WhatsAsena/bin/
WORKDIR /root/WhatsAsena/

ENV TZ=Europe/Istanbul
RUN apk add --update nodejs npm
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies
RUN npm install supervisor -g
RUN npm install

CMD ["node", "bot.js"]
