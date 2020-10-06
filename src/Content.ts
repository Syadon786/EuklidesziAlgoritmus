import fs from "fs";
import http from "http";
import url from "url";

interface InputInterface {
    name: string;
    age: number;
    male: boolean;
}
export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->

        // Input form-al és <input type='number'>-el:
        // URL paraméter(ek) (itt "kor") ellenőrzése,  kiolvasása, alapértelmezett értéke 18:
        const x = url.parse(req.url as string, true).query;
        const y = url.parse(req.url as string, true).query;
        let elso: number = parseInt(x.elso as string);
        let masodik: number = parseInt(x.elso as string);
        if (isNaN(elso) || elso < 0) elso = 0; // egy kis ellenőrzés
        res.write(`Kérem az első számot: <input type='text' name='elso' value=${elso} style='width:3em;' onChange='this.form.submit();'>\n`);
        if (isNaN(masodik) || masodik < 0) masodik = 0; // egy kis ellenőrzés
        res.write(`Kérem a második számot: <input type='text' name='masodik' value=${masodik} style='width:3em;' onChange='this.form.submit();'>\n`);
        res.write(`Az első szám ${elso}!\n`);
        res.write(`Az első szám ${masodik}!\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
