import { MonaaMatch } from './MonaaMatch';
import { TREBuilder } from './TREBuilder';
export class QueryHandler {

    public search(TRE: string, mappedFile: File): MonaaMatch[] {
        // @Todo add request to monaaserver.

        // Todo comment this in when buildTRE is implemented.
        this.TREBuilder.buildTRE(TRE);
        throw new Error("Not implemented yet");
    }

    public TREBuilder: TREBuilder = new TREBuilder();
    public mappings: Map<string, string> = new Map<string, string>();
}