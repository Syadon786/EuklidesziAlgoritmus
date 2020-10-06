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
        res.write("<title>Euklideszi algoritmus</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->

        // Input form-al és <input type='number'>-el:
        // URL paraméter(ek) (itt "kor") ellenőrzése,  kiolvasása, alapértelmezett értéke 18:
        const x = url.parse(req.url as string, true).query;
        const y = url.parse(req.url as string, true).query;
        let elso: number = parseInt(x.elso as string);
        let masodik: number = parseInt(y.masodik as string);

        if (isNaN(elso) || elso < 0 || elso > 999999999999999) elso = 0; // egy kis ellenőrzés
        res.write(`Kérem az első számot [0-999999999999999]: <input type='text' name='elso' value=${elso} style='width:3em;' onChange='this.form.submit();'>\n`);
        if (isNaN(masodik) || masodik < 0 || masodik > 999999999999999) masodik = 0; // egy kis ellenőrzés
        res.write(`Kérem a második számot [0-999999999999999]: <input type='text' name='masodik' value=${masodik} style='width:3em;' onChange='this.form.submit();'>\n`);

        let lnko: number = 0;
        let aktMaradek: number = 0;
        let osztas: number = 0;
        let aktElso: number = elso;
        let aktMasodik: number = masodik;
        res.write("a\tb\ta/b\n");
        if (masodik == 0) {
            lnko = elso;
        } else {
            do {
                aktMaradek = elso % masodik;
                osztas = Math.floor(elso / masodik);
                res.write(`${elso}\t${masodik}\t${osztas}\n`);
                elso = masodik;
                masodik = aktMaradek;
            } while (aktMaradek != 0);
            res.write(`${elso}\t${masodik}\n`);
            lnko = elso;
        }
        res.write(`A legnagyobb közös osztó: ${lnko}!\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
