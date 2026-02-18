# Napojení Vercel domény na Wedos (krok za krokem)

Doména je u **Wedos**, hosting běží na **Vercel**. Návod předpokládá, že u Wedos máte doménu a DNS správu (DNS servery Wedos: ns.wedos.cz, ns.wedos.com, ns.wedos.net, ns.wedos.eu).

---

## 1. Přidat doménu ve Vercel

1. Přihlaste se na [vercel.com](https://vercel.com) a otevřete váš **projekt** (např. tomasmensik).
2. Jděte do **Settings** → **Domains** (nebo **Project Settings** → **Domains**).
3. Klikněte na **Add** / **Přidat doménu**.
4. Zadejte vaši doménu, např.:
   - `mensik-reality.cz` (hlavní doména)
   - `www.mensik-reality.cz` (www subdoména)
5. Pro každou přidanou doménu Vercel zobrazí **doporučené DNS záznamy**. Nechte si tuto stránku otevřenou – budete je potřebovat v dalším kroku.

---

## 2. Zjistit přesné hodnoty z Vercel

Po přidání domény Vercel ukáže něco jako:

| Typ   | Název (Name) | Hodnota (Value) / Cíl        |
|-------|----------------|-----------------------------|
| **A** | `@` nebo prázdné | `76.76.21.21`              |
| **CNAME** | `www` | `cname.vercel-dns.com`      |

- **Apex doména** (např. `mensik-reality.cz`): potřebujete **A** záznam na `76.76.21.21`.
- **www** (např. `www.mensik-reality.cz`): potřebujete **CNAME** záznam na `cname.vercel-dns.com`.

Přesné hodnoty vždy berte z Vercel (mohou se u projektu lišit).

---

## 3. Upravit DNS u Wedos

1. Přihlaste se do **zákaznické administrace Wedos**: [https://client.wedos.cz](https://client.wedos.cz) (nebo wedos.cz → Přihlásit).
2. V horním menu zvolte **DNS**.
3. V seznamu domén vyberte vaši doménu (např. `mensik-reality.cz`).
4. Otevřete **Záznamy** / **Editovat záznamy** pro tuto zónu.

### Pro hlavní doménu (např. mensik-reality.cz)

- Najděte nebo **přidejte** záznam:
  - **Typ:** A  
  - **Název/host:** `@` nebo prázdné (podle rozhraní Wedos)  
  - **Hodnota/cíl:** `76.76.21.21`  
  - **TTL:** 3600 (nebo výchozí)
- Uložte.

### Pro www (např. www.mensik-reality.cz)

- Najděte nebo **přidejte** záznam:
  - **Typ:** CNAME  
  - **Název/host:** `www`  
  - **Hodnota/cíl:** `cname.vercel-dns.com`  
  - **TTL:** 3600 (nebo výchozí)
- Uložte.

### Poznámky u Wedos

- Pokud už máte u apexu jiný **A** záznam (starý hosting), **smažte ho** nebo změňte na `76.76.21.21`.
- Pokud máte u `www` jiný **CNAME** nebo **A**, upravte ho na CNAME → `cname.vercel-dns.com`.
- Některé panely mají pole „Název“: pro apex nechte prázdné nebo `@`, pro www zadejte `www`.

---

## 4. Ověření a propagace

1. Po uložení záznamů u Wedos vraťte do Vercel na stránku **Domains**.
2. U domény klikněte na **Verify** / **Ověřit**. Vercel zkontroluje DNS.
3. Propagace DNS může trvat **několik minut až 48 hodin**. Pokud ověření hned neprojde, zkuste znovu za chvíli.
4. Po úspěšném ověření bude u domény u Vercel stav **Valid Configuration** a stránka bude na doméně dostupná (HTTPS Vercel doplní sám).

---

## 5. Přesměrování www ↔ apex (doporučení)

Ve Vercel v **Settings** → **Domains** můžete nastavit:

- **Redirect** z `www.mensik-reality.cz` na `mensik-reality.cz`, nebo naopak,

tak aby všichni uživatelé skončili na jedné preferované doméně.

---

## Shrnutí hodnot (orientační)

| Účel        | Typ   | Host/Název | Hodnota / Cíl           |
|------------|-------|------------|-------------------------|
| hlavní doména | A     | `@`        | `76.76.21.21`           |
| www        | CNAME | `www`      | `cname.vercel-dns.com`  |

Přesné hodnoty vždy ověřte v **Vercel** u vašeho projektu (Domains → daná doména).

---

## Řešení problémů

- **„Domain not verified“** – Počkejte na propagaci DNS (až 48 h), zkontrolujte u Wedos, že A/CNAME jsou opravdu uložené a bez překlepů.
- **„Too many A records“** – U apexu smažte staré A záznamy, nechte jen jeden: `76.76.21.21`.
- Kontrola z vašeho počítače:
  - `nslookup mensik-reality.cz` → měla by být `76.76.21.21`
  - `nslookup www.mensik-reality.cz` → měl by být CNAME na `cname.vercel-dns.com`

Pokud něco z toho neodpovídá, zkontrolujte znovu záznamy u Wedos a TTL (nižší TTL 3600 urychlí další změny).
