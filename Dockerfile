FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

ENV REACT_APP_API_URL=https://k9f03505f0e8ba.user-app.krampoline.com/api/

RUN npm ci
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
<<<<<<< HEAD
CMD ["serve", "build"]
=======
CMD ["serve", "build"]

>>>>>>> 2499baafdb2e7d28a2ab04ec83bc8bb38a34b2c6
