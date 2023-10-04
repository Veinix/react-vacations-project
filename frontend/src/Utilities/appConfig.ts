class AppConfig {
    // Base URLs
    public readonly localhost = "http://localhost:3000/";
    public readonly apiURL = "http://localhost:4000/" 

    // Authentication Endpoints
    public readonly registerEndpoint = "http://localhost:4000/api/auth/register/"
    public readonly loginEndpoint = "http://localhost:4000/api/auth/login/"

    // Service Endpoints
    public readonly vacationsEndpoint = "http://localhost:4000/api/vacations/"
    
}

const appConfig = new AppConfig();

export default appConfig;
