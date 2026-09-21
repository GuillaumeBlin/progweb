FROM mcr.microsoft.com/devcontainers/javascript-node:5-24
# Install MongoDB command line tools - though mongo-database-tools not available on arm64
ARG MONGO_TOOLS_VERSION=7.0
RUN . /etc/os-release \
    && curl -fsSL https://pgp.mongodb.com/server-8.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg] https://repo.mongodb.org/apt/debian trixie/mongodb-org/8.0 main" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list 
#    && apt-get update && export DEBIAN_FRONTEND=noninteractive \
#    && apt-get install -y mongodb-org mongodb-mongosh \
#    && apt-get clean -y && rm -rf /var/lib/apt/lists/*
#RUN systemctl start mongod && systemctl enable mongod

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"


