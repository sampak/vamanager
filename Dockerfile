FROM node:17-slim

WORKDIR /app
COPY . .
RUN npm install
WORKDIR /app/backend
RUN npm install
RUN npm run build

# COPY dist .
# COPY migrations migrations
# RUN mkdir logs

EXPOSE 80
# EXPOSE 4000
# EXPOSE 4001

ENV NODE_ENV production
ENV PORT 80

# CMD ["node", "main.js"]
CMD ["npm", "run", "start:prod"]
# CMD ["npm", "run", "start"]