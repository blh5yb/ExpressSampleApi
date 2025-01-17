#FROM node:22

FROM public.ecr.aws/lambda/nodejs:22
EXPOSE 3000

WORKDIR /
RUN mkdir src
COPY ./src /src
RUN chmod 777 /src
#RUN rm -rf ./src/swagger_output.json ./src/swagger.js

COPY ./package.json .
RUN npm install

# uncomment entrypoint for local testing
ENTRYPOINT ["node", "/src/index.mjs"]
CMD [ "/src/index.handler" ]