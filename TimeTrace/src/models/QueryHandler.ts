import { MonaaZone } from './MonaaZone';
import { TREBuilder } from './TREBuilder';
import axios, { AxiosRequestConfig } from 'axios';
import { LogHandler } from './LogHandler';

export class QueryHandler {
    public file: string[] = [];
    public formattedFile: string[] = [];
    public config: AxiosRequestConfig<any> = {
        method: 'post',
        maxBodyLength: Infinity,
        url: "http://localhost:5000/monaa/",
    }
    public TREBuilder: TREBuilder = new TREBuilder();
    public logHandler: LogHandler = new LogHandler();
    public mappings: Map<string, string> = new Map<string, string>();


    public async search(TRE: string): Promise<MonaaZone[]> {
        const httpClient = axios.create();
        this.config.data = {
            'lines': this.formattedFile,
            'regex': this.TREBuilder.buildTRE(TRE)
        };
    
        console.time("Monaa");
        let response: MonaaServerResponse | undefined;
        try {
            response = await httpClient.request(this.config);
        } catch (error) {
            throw new Error("Error in communication with Monaa: " + error)
        }

        console.timeEnd("Monaa");
        
        if(!response){
            throw new Error("Response from Monaa was undefined.");
        }
        
        console.time("MapMonaaOutputToEvent")
        
        const monaaZones: MonaaZone[] = this.logHandler.MapMonaaOutputToEvent(response.data.monaa_result.lines, this.formattedFile, this.file, this.mappings);
        console.timeEnd("MapMonaaOutputToEvent")
        
        return monaaZones;
    }
}

interface MonaaServerResponse {
    message: string;
    data: {
        monaa_result: {
        lines: string[];
    }};
    regex: string;
    status: string;
}
