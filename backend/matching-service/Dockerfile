FROM node:16 AS build-stage

WORKDIR /matching-service

COPY ./package.json ./
COPY ./package-lock.json ./  # Use package-lock.json for npm

RUN npm ci  # Use `npm ci` for deterministic installs

COPY . .

RUN npm run build  # Use `npm run build` instead of `yarn build`

FROM node:16 AS prod-stage

ARG QUESTION_DIFFICULTY_URL

WORKDIR /matching-service

COPY ./package.json ./

RUN npm ci --production

COPY --from=build-stage /matching-service/dist .

ENV ENV=production
ENV PORT=8004
ENV QUESTION_DIFFICULTY_URL=${QUESTION_DIFFICULTY_URL}

EXPOSE 8002

CMD ["npm", "run", "dev"]
