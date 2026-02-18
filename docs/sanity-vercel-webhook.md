# Nastavení webhooku pro automatické nasazení na Vercel

Když publikujete obsah v Sanity CMS (např. v sekci "Služby"), automaticky se spustí rebuild a nasazení na Vercelu.

## Postup nastavení

### 1. Vytvoření Deploy Hook na Vercelu

1. Přihlaste se na [vercel.com](https://vercel.com) a otevřete váš projekt
2. Jděte do **Settings** → **Git** → **Deploy Hooks** (nebo **Settings** → **Deploy Hooks**)
3. Klikněte na **Create Hook**
4. Zadejte název, např. `Sanity CMS Publish`
5. Vyberte **Branch**: `main` (nebo váš hlavní branch)
6. Klikněte na **Create Hook**
7. **Zkopírujte URL** webhooku (bude vypadat jako `https://api.vercel.com/v1/integrations/deploy/...`)

### 2. Nastavení webhooku v Sanity

1. Přihlaste se na [sanity.io/manage](https://sanity.io/manage)
2. Vyberte váš projekt (např. "TomasMensik")
3. Jděte do **API** → **Webhooks** (nebo **Settings** → **Webhooks**)
4. Klikněte na **Create webhook**
5. Vyplňte:
   - **Name**: `Vercel Deploy` (nebo libovolný název)
   - **URL**: Vložte URL z Vercel Deploy Hook (z kroku 1)
   - **Dataset**: `production` (nebo váš dataset)
   - **Trigger on**: Zaškrtněte **Create**, **Update**, **Delete**
   - **Filter**: Můžete nechat prázdné (spustí se při jakékoliv změně) nebo nastavit filtr pro konkrétní typy dokumentů
   - **HTTP method**: `POST`
   - **API version**: `v2021-06-07` nebo novější
   - **Secret**: Můžete nechat prázdné (Vercel Deploy Hook nevyžaduje secret)
6. Klikněte na **Save**

### 3. Ověření

1. Vraťte se do Sanity CMS (`/admin` na vašem webu)
2. Upravte nějaký dokument (např. v sekci "Služby")
3. Klikněte na **Publish**
4. Vraťte se na Vercel → **Deployments**
5. Měl by se automaticky spustit nový deployment

## Řešení problémů

### Webhook se nespouští

- Zkontrolujte, že webhook je aktivní v Sanity (Settings → Webhooks)
- Zkontrolujte, že URL je správně zkopírovaná (bez mezer, celá)
- V Sanity webhooku zkontrolujte, že je zaškrtnuté "Create", "Update", "Delete"
- Zkontrolujte dataset (musí být stejný jako ten, který používáte v CMS)

### Deployment se nespouští na Vercelu

- Zkontrolujte, že Deploy Hook je aktivní na Vercelu
- Zkontrolujte, že branch v Deploy Hook odpovídá vašemu hlavnímu branchi
- V Vercel → Deployments zkontrolujte, jestli nejsou nějaké chyby

### Webhook se spouští, ale deployment selže

- Zkontrolujte build logy na Vercelu
- Zkontrolujte, že všechny environment variables jsou nastavené správně
- Zkontrolujte, že `vercel.json` je správně nakonfigurovaný

### Webhook přestal fungovat (dříve fungoval)

Pokud webhook dříve fungoval, ale teď ne, zkontrolujte následující:

1. **Vercel Deploy Hook expirace**
   - Vercel Deploy Hooks mohou expirovat nebo být deaktivovány
   - Vercel → Settings → Deploy Hooks → zkontrolujte, že hook je stále aktivní
   - Pokud není aktivní, vytvořte nový a aktualizujte URL v Sanity webhooku

2. **Sanity webhook status**
   - Sanity → API → Webhooks → zkontrolujte, že webhook je aktivní (není disabled)
   - Zkontrolujte historii webhooku - možná jsou tam chybové zprávy
   - Zkontrolujte, že URL stále odpovídá aktuálnímu Vercel Deploy Hook URL

3. **Změna branch na Vercelu**
   - Pokud jste změnili hlavní branch v projektu, aktualizujte Deploy Hook, aby používal správný branch
   - Vercel → Settings → Deploy Hooks → upravte branch

4. **Změna projektu nebo organizace**
   - Pokud jste přesunuli projekt nebo změnili organizaci, může být potřeba vytvořit nový Deploy Hook

5. **API změny**
   - Sanity nebo Vercel mohly změnit API - zkontrolujte, že používáte aktuální API verzi
   - V Sanity webhooku zkontrolujte API version (měla by být `v2021-06-07` nebo novější)

6. **Test webhooku**
   - V Sanity → API → Webhooks → klikněte na webhook → "Test webhook" nebo "Send test"
   - Zkontrolujte, jestli se spustí deployment na Vercelu
   - Pokud ne, zkontrolujte chybové zprávy v Sanity webhook logu

7. **Manuální test Vercel Deploy Hook**
   - Zkuste zavolat Deploy Hook URL přímo (např. pomocí curl nebo Postman)
   - `curl -X POST "https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_ID"`
   - Mělo by se spustit deployment na Vercelu

8. **Kontrola logů**
   - Vercel → Deployments → zkontrolujte, jestli nejsou nějaké chyby v posledních deploymentech
   - Sanity → API → Webhooks → zkontrolujte historii webhooku pro chybové zprávy

### Job zůstává ve stavu PENDING (webhook vrací 201, ale deployment se nespustí)

Pokud vidíte v Sanity webhook logu `resultCode: 201` a `"state": "PENDING"`, znamená to, že:
- ✅ Sanity webhook úspěšně volá Vercel Deploy Hook
- ✅ Vercel přijímá požadavek a vytváří job
- ❌ Ale job zůstává ve stavu PENDING a nikdy se nespustí

**Možné příčiny a řešení:**

1. **Problém s `vercel.json` konfigurací**
   - Neplatné rewrite/redirect patterns mohou způsobit, že deployment nemůže začít
   - Zkontrolujte `vercel.json` - všechny `source` patterns musí být platné
   - Zkuste dočasně odstranit `rewrites` a zjistit, jestli to pomůže

2. **GitHub integration problém**
   - Vercel → Settings → Git → zkontrolujte, že GitHub integration je aktivní
   - Pokud je `github.enabled: false` v `vercel.json`, může to bránit deploy hooks

3. **Problém s branch**
   - Zkontrolujte, že branch v Deploy Hook existuje v repozitáři
   - Zkontrolujte, že máte push oprávnění k tomuto branchi

4. **Vytvořte nový Deploy Hook**
   - Někdy pomůže vytvořit nový Deploy Hook místo starého
   - Vercel → Settings → Deploy Hooks → smažte starý → vytvořte nový → aktualizujte URL v Sanity

5. **Zkontrolujte Vercel project settings**
   - Vercel → Settings → General → zkontrolujte "Root Directory" (mělo by být prázdné nebo správně nastavené)
   - Zkontrolujte, že build command a output directory jsou správně nastavené

6. **Kontaktujte Vercel support**
   - Pokud nic z výše uvedeného nepomůže, může jít o problém na straně Vercelu
   - Vercel support může zkontrolovat, proč joby zůstávají ve stavu PENDING

## Alternativní řešení: API Route na Vercelu

Pokud Deploy Hook nefunguje, můžete vytvořit API route na Vercelu, která ověří webhook a spustí deployment. To je ale složitější a většinou není potřeba.

## Poznámky

- Webhook se spustí při každé změně v Sanity (create, update, delete)
- Pokud chcete webhook spouštět jen při publikaci (ne při draft), můžete použít filtr v Sanity webhooku
- Vercel Deploy Hook je bezpečný - vyžaduje správnou URL a může být chráněn secretem (ale není nutný)
