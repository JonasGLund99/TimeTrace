import { MonaaZone } from './MonaaZone';
import { TREBuilder } from './TREBuilder';
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

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
        const requestBody = new FormData();
        requestBody.append('file', this.formattedFile);
        requestBody.append('regex', this.TREBuilder.buildTRE(TRE));
        this.config.data = requestBody;

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
