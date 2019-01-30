"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const execs_1 = require("../../utils/execs");
const logger_1 = __importDefault(require("../../utils/logger"));
const teardown_1 = require("../../utils/teardown");
const PRIMARY_KAFKA_PORT = '9092';
class KafkaExec {
    constructor() {
        this.start = async (runnerConfig, runnerKey) => {
            logger_1.default.startContainer(runnerKey);
            const { ports, service, topics, autoCreateTopics, zookeepeerConnect } = runnerConfig;
            let containerId = await execs_1.getContainerId(service);
            if (!containerId) {
                const portMapping = Object.keys(ports)
                    .map(port => `--publish ${ports[port]}:${port}`)
                    .join(' ');
                const env = ` -e KAFKA_ADVERTISED_HOST_NAME="localhost" \
                    ${`-e KAFKA_AUTO_CREATE_TOPICS_ENABLE=${autoCreateTopics}`} \
                    ${topics.length ? `-e KAFKA_CREATE_TOPICS="${topics.join(',')}"` : ''} \
                    ${`-e KAFKA_ZOOKEEPER_CONNECT="${zookeepeerConnect}"`}`;
                const cmd = `docker-compose run \
                    ${constants_1.defaultDockerComposeRunOpts} \
                    ${portMapping} \
                    ${env} \
                    ${service}`;
                logger_1.default.command(cmd);
                await execa_1.default.shell(cmd);
            }
            containerId = await execs_1.getContainerId(service);
            logger_1.default.startContainerSuccess(service);
            return containerId;
        };
        this.checkHealth = async (runnerConfig, runnerKey) => {
            logger_1.default.checkHealth(runnerKey);
            await this.checkConnection(runnerConfig, runnerKey);
            logger_1.default.checkHealthSuccess(runnerKey);
        };
        this.teardown = async (containerId, runnerKey) => teardown_1.teardownSingle(containerId, runnerKey);
        this.checkConnection = async (runnerConfig, runnerKey) => {
            const { connectionTimeout = 30, ports } = runnerConfig;
            const primaryKafkaPort = Number(Object.keys(ports).find(port => ports[port] === PRIMARY_KAFKA_PORT));
            const recurse = async (connectionTimeout) => {
                logger_1.default.checkConnection(runnerKey, connectionTimeout);
                if (connectionTimeout <= 0) {
                    throw new errors_1.DockestError('Kafka connection timed out');
                }
                try {
                    await execs_1.acquireConnection(primaryKafkaPort);
                    logger_1.default.checkConnectionSuccess(runnerKey);
                }
                catch (error) {
                    connectionTimeout--;
                    await execs_1.sleep(1000);
                    await recurse(connectionTimeout);
                }
            };
            await recurse(connectionTimeout);
        };
        if (KafkaExec.instance) {
            return KafkaExec.instance;
        }
        KafkaExec.instance = this;
    }
}
exports.default = KafkaExec;
//# sourceMappingURL=execs.js.map