
# Install PostgreSQL client
#FROM openjdk:17-jdk-slim
#RUN apt-get update && RUN sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && apt-get install -y \
#    RUN sudo apt-get install -y mongodb-org-shell \
#    RUN sudo apt-get install -y mongodb-org-tools
#postgresql-client



FROM node:22

EXPOSE 3000

WORKDIR /
RUN mkdir src
COPY ./src /src
COPY ./package.json .
RUN chmod 777 /src
RUN npm install

CMD ["node", "/src/index.mjs"]
#CMD npm start

#COPY src {LAMBDA_TASK_ROOT}
#COPY docker-package.json {LAMBDA_TASK_ROOT}/package.json

#RUN chmod -R 755 /var/lang/bin

#FROM public.ecr.aws/lambda/nodejs:22

# uncomment entrypoint for local testing
#CMD ["npm", "start"]
#ENTRYPOINT [ "npm", "start"]
#CMD [ "index.handler" ]