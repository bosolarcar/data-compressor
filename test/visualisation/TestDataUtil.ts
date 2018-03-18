import fs = require("fs");
import { DateValuePoint } from "../../src/model/DateValuePoint";

export class TestDataLoader {

    public load(file: string): DateValuePoint[] {
        const input = fs.readFileSync("test/data/" + file, "utf8");
        const json = JSON.parse(input);
        return json;
    }

    public write(file: string, data: DateValuePoint[]) {
        fs.writeFileSync("./" + file, JSON.stringify(data), "utf8");
    }

}
