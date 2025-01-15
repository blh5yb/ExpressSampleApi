#FROM node:22

FROM public.ecr.aws/lambda/nodejs:22
EXPOSE 3000

WORKDIR /
RUN mkdir src
COPY ./src /src
RUN chmod 777 /src

COPY ./package.json .
#COPY ./package.json {LAMBDA_TASK_ROOT}/package.json
RUN npm install

#RUN chmod -R 755 /var/lang/bin

#FROM public.ecr.aws/lambda/nodejs:22

# uncomment entrypoint for local testing
#CMD ["npm", "start"]
ENTRYPOINT ["node", "/src/index.mjs"]
#ENTRYPOINT [ "npm", "start"]
CMD [ "/src/index.handler" ]