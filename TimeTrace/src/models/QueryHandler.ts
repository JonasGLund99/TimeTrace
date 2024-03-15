import { MonaaZone } from './MonaaZone';
import { TREBuilder } from './TREBuilder';
import axios, { AxiosRequestConfig } from 'axios';

export class QueryHandler {
    public file: string[] | null = null;
    public formattedFile: string[] | null = null;
    public config: AxiosRequestConfig<any> = {
        method: 'post',
        maxBodyLength: Infinity,
        url: "http://localhost:5000/monaa/",
    }
    public TREBuilder: TREBuilder = new TREBuilder();
    public mappings: Map<string, string> = new Map<string, string>();

    public async search(TRE: string): Promise<MonaaZone[]> {
        const httpClient = axios.create();
    
        this.config.data = {
            'lines': this.formattedFile,
            'regex': this.TREBuilder.buildTRE(TRE)
        };
    
        let response: MonaaServerResponse | undefined;
        try {
            response = await httpClient.request(this.config);
        } catch (error) {
            console.log(error);
        }
        
        // TODO use response
    
        return [];
    }
}

interface MonaaServerResponse {
    message: string;
    monaa_result: {
        lines: string[];
    };
    regex: string;
    status: string;
}
