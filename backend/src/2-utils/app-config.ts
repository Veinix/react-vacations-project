import 'dotenv/config'

class AppConfig {
    // Host and port
    public readonly port = process.env.PORT;
    public readonly domainName = process.env.DOMAIN
    public readonly url = this.domainName + this.port

    // MongoDB Database
    public readonly mongoDbUri = process.env.MONGODB_URI

    // Secrets
    public readonly tokenKey = process.env.TOKEN_KEY
    public readonly apiKey = process.env.API_KEY
}

const appConfig = new AppConfig();
export default appConfig;
