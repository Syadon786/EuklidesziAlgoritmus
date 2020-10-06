import fs from "fs";
import http from "http";
import { stringify } from "querystring";
import url from "url";

interface InputInterface {
    name: string;
    age: number;
    male: boolean;
}
export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Euklideszi algoritmus</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        const x = url.parse(req.url as string, true).query;
        const y = url.parse(req.url as string, true).query;
        let elso: number = parseInt(x.elso as string);
        let masodik: number = parseInt(y.masodik as string);

        if (isNaN(elso) || elso < 0 || elso > 999999999999999) elso = 0;
        res.write(`Kérem az első számot [0-999999999999999]: <input type='text' maxlength='15' name='elso' value=${elso} style='width:10em;' onChange='this.form.submit();'>\n`);
        if (isNaN(masodik) || masodik < 0 || masodik > 999999999999999) masodik = 0;
        res.write(`Kérem a második számot [0-999999999999999]: <input type='text'  maxlength='15' name='masodik' value=${masodik} style='width:10em;' onChange='this.form.submit();'>\n`);

        let lnko: number = 0;
        let aktMaradek: number = 0;
        let osztas: number = 0;
        let tabulator: string = "\t\t";
        let tabulator2: string = "\t\t";
        if (masodik > 0 || elso > 0) {
            res.write("\ta\t\tb\t\ta/b\n");
            if (masodik == 0) {
                lnko = elso;
                if (elso.toString().length > 7) {
                    tabulator = "\t";
                }
                res.write(`\t${elso}${tabulator}${masodik}\n`);
            } else {
                do {
                    aktMaradek = elso % masodik;
                    osztas = Math.floor(elso / masodik);
                    if (elso.toString().length > 7) {
                        tabulator = "\t";
                    } else {
                        tabulator = "\t\t";
                    }
                    if (masodik.toString().length > 7) {
                        tabulator2 = "\t";
                    } else {
                        tabulator2 = "\t\t";
                    }
                    res.write(`\t${elso}${tabulator}${masodik}${tabulator2}${osztas}\n`);
                    elso = masodik;
                    masodik = aktMaradek;
                } while (aktMaradek != 0);
                res.write(`\t${elso}${tabulator}${masodik}\n`);
                lnko = elso;
            }
            res.write(`\nA legnagyobb közös osztó: ${lnko}!\n`);
        }

        res.write("</pre></form></body></html>");
        res.end();
    }
}
