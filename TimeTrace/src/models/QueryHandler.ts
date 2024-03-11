import { MonaaMatch } from './MonaaMatch';
import { TREBuilder } from './TREBuilder';
import axios, { AxiosRequestConfig} from 'axios';
import FormData from 'form-data';

export class QueryHandler {
    public config: AxiosRequestConfig<any> = {
        method: 'post',
        maxBodyLength: Infinity,
        url: "http://localhost:5000/monaa/",
    }
    public TREBuilder: TREBuilder = new TREBuilder();
    public mappings: Map<string, string> = new Map<string, string>();

    public async search(TRE: string, mappedFile: File): Promise<MonaaMatch[]> {
        const httpClient = axios.create();
        const requestBody = new FormData();
        const fileData: ArrayBuffer = await mappedFile.arrayBuffer();
        requestBody.append('file', fileData);
        requestBody.append('regex', this.TREBuilder.buildTRE(TRE));
        this.config.headers = requestBody.getHeaders();
        this.config.data = requestBody;


        // Make the POST request
        let response: MonaaServerResponse | undefined;
        try {
            response = await httpClient.request(this.config);            
        } catch (error) {
            console.log(error);
        }
        console.log(response);
        
        this.TREBuilder.buildTRE(TRE);

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

const queryHandler = new QueryHandler();
queryHandler.search("(AB)%(0,20)$", new File(["../../../experiments/logfiles/logMappedAB.txt"], "logMappedAB.txt"));
