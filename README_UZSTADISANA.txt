Ingars Neija portfolio — v10 (2026-09-07)

Galvenās izmaiņas v9 → v10:
- salabota poga “Uz augšu ↑”: #top mērķis vairs neatrodas uz sticky header; pievienots īsts lapas sākuma enkurs un JS fallback ar window.scrollTo();
- galvenais projektu virsraksts mainīts uz “Mazs ieskats dažos projektos” un izņemts instrukcijas tipa teksts par portfolio lietošanu;
- prasmju virsraksts mainīts uz “Kopsavilkums četrās kompetenču zonās.”;
- “Digitālie produkti un sistēmas” pārbūvēti par pieciem vienāda izmēra blokiem: desktopā visi redzami vienā rindā un hover/focus režīmā izvēlētais bloks viegli paplašinās; mazākos ekrānos tie kļūst par horizontālu scroll-snap virkni ar redzamu nākamās kartītes malu;
- LaserLearn vairs netiek izcelts ar nesamērīgi lielu atsevišķu bloku — visi pieci digitālie projekti ir vienā vizuālajā hierarhijā;
- Staburags intervijas blokā integrēts reāls publikācijas attēls no Staburags.lv raksta, aptumšots un tonēts, lai iekļautos tumšajā portfolio dizainā;
- intervijas sadaļa kļuvusi kompaktāka: attēls + īss konteksts + citāts + 3 darba principi + divas saites;
- NewsArticle JSON-LD papildināts ar publikācijas attēla URL;
- novērsta horizontāla visas lapas pārplūde mobilajā skatā no sociālo tīklu sadaļas; TikTok un pārējie horizontālie elementi tagad ritinās tikai savos konteineros;
- CSS/JS cache-busting paaugstināts uz ?v=20260907-v10.

UZSTĀDĪŠANA
1) Augšupielādē portfolio_v10 saturu uz /public_html/portfolio/.
2) Saglabā visu assets/ direktorijas struktūru.
3) Saknes robots.txt un sitemap.xml atrodas mapē root-files/.
4) Obligāti augšupielādē arī jauno assets/css/portfolio.css un assets/js/portfolio.js; index.html izmanto ?v=20260907-v10.
5) Pēc augšupielādes veic Ctrl+F5, ja pārlūkā vēl redzama vecā versija.

PIEZĪMES
- Staburags intervijas bloks izmanto reālo publikācijas attēlu no publiskā Staburags.lv raksta un ielādē to no Staburags servera.
- CraftIN darbu galerijas priekšskatījumi izmanto reālos craftin.lv galerijas attēlus.
- TikTok kaleidoskopa priekšskatījumi ir lokāli WebP faili mapē assets/images/tiktok/.
- Ārējās HTTP/HTTPS saites tiek atvērtas jaunā cilnē ar noopener/noreferrer; iekšējā navigācija paliek tajā pašā lapā.


V11 DIVVALODU PIEEJA
- Latviešu: /portfolio/
- English: /portfolio/en/
- Headerī pievienots LV/EN karodziņu pārslēdzējs.
- Abām lapām ir savs canonical un hreflang.
- /en/ mape jāaugšupielādē kopā ar pārējo portfolio saturu.


v12: pievienots responsīvs Buy Me a Coffee / craftin atbalsta bloks abās valodās; saite pievienota arī strukturētajiem profila datiem un kājenei.


2026-09-28 / v13
- Open-source sadaļā izcelti Sprīdītis, PrintGuardian un Two-Export Comparator.
- Pievienots publiski pārbaudāms VibeAudio contribution bloks ar PR #10, PR #11 un v0.8.1 release.
- Craftin Rēķini apraksts atjaunināts atbilstoši pašreizējai grāmatvedības/OCR/backup funkcionalitātei.
- Atjaunināti JSON-LD, dateModified, sitemap lastmod un asset cache-busting.
