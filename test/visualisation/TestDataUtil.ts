import fs = require("fs");
import { DateValuePoint } from "../../src/model/DateValuePoint";

export class TestDataLoader {

    public load(file: string): DateValuePoint[] {
        const input = fs.readFileSync("test/data/" + file, "utf8");
        const json = JSON.parse(input, this.dateReviver);
        return json;
    }

    public write(file: string, data: DateValuePoint[]) {
        fs.writeFileSync("./" + file, JSON.stringify(data), "utf8");
    }

    private dateReviver(key: any, value: any) {
        let a;
        if (typeof value === "string") {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                                +a[5], +a[6]));
            }
        }
        return value;
    }

}
