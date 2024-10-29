################################
# BASE
################################
FROM node:20.14.0 as node-base

ENV NODE_NO_WARNINGS=0 \
    NODE_DISABLE_COLORS=1

WORKDIR /app
################################
# BUILDER-BASE
################################
FROM node-base as builder-base

COPY *.json ./
COPY *.config.mjs ./
RUN npm i

################################
# DEVELOPMENT
################################
FROM builder-base as development

COPY . /app/

CMD ["npm", "run", "dev", "--", "--host"]

################################
# PRODUCTION
################################
FROM builder-base as prod

COPY . /app/

CMD ["npm", "run", "dev", "--", "--host"]