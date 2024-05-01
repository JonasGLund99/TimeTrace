import { MonaaZone } from "./MonaaZone";
import { TREBuilder } from "./TREBuilder";
import axios, { AxiosRequestConfig } from "axios";
import { LogHandler } from "./LogHandler";
import { CustomMap } from "./Types/EventMapping";

export abstract class QueryHandler {
    constructor() {
        throw new Error(`${typeof this} is a static class`);
    }

    private static config: AxiosRequestConfig<any> = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/monaa/",
    };

    public static async search(TRE: string, formattedFile: string[], file: string[], mappings: CustomMap): Promise<MonaaZone[]> {
        const httpClient = axios.create();
        this.config.data = {
            lines: formattedFile,
            regex: TREBuilder.buildTRE(TRE, mappings),
        };

        console.time("Monaa");
        let response: MonaaServerResponse | undefined;
        try {
            response = await httpClient.request(this.config);
        } catch (error) {
            throw new Error("Error in communication with Monaa: " + error);
        }
        console.timeEnd("Monaa");

        if (!response) {
            throw new Error("Response from Monaa was undefined.");
        }

        const monaaOutput = response.data.monaa_result.lines;
        const monaaZones: MonaaZone[] = LogHandler.mapMonaaOutputToEvent(monaaOutput);
        return monaaZones;
    }
}

interface MonaaServerResponse {
    message: string;
    data: {
        monaa_result: {
            lines: string[];
        };
    };
    regex: string;
    status: string;
}
