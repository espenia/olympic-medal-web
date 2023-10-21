FROM node:20.1.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY infrastructure/package*.json .

# RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY ./infrastructure ./infrastructure
COPY ./entities ./entities
COPY ./usecases ./usecases

RUN cd infrastructure && npm install

CMD cd infrastructure && npm run test