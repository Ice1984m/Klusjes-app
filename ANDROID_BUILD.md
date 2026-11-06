# Android-build (KlusGarant)

De webapp wordt met Capacitor verpakt als Android-app. De bestaande React/Vite-broncode blijft de basis.

## Vereisten

- Node.js 24 of hoger
- Android Studio met Android SDK
- Java 21 (Android Studio levert doorgaans een geschikte JDK)
- Capacitor 8.6.0

## Eerste lokale Android-project

Voer vanuit de repository-root uit:

```bash
npm install
npm run build
npm run android:add
npx cap sync android
npm run android:open
```

Daarna kun je het Android-project openen in Android Studio.

## APK en AAB bouwen

```bash
npm run android:sync
cd android
./gradlew assembleDebug
./gradlew bundleRelease
```

Op Windows PowerShell gebruik je in de Android-map:

```powershell
.\gradlew.bat assembleDebug
.\gradlew.bat bundleRelease
```

## GitHub Actions

De workflow `.github/workflows/android-build.yml` bouwt bij een push, pull request of handmatige start een debug-APK en een **niet-ondertekende** release-AAB. De bestanden worden 14 dagen als workflow-artifact bewaard.

## Belangrijk vóór Google Play

- De gegenereerde AAB is niet ondertekend en kan dus nog niet naar Google Play worden geüpload.
- Voor een Play-release is een veilige Android-keystore en configuratie van GitHub Actions secrets nodig. Zet nooit een keystore of wachtwoord in de repository.
- Controleer vóór de eerste publicatie de definitieve unieke application ID. De huidige waarde `be.mikis13.klusgarant` is een voorlopige project-ID.
- Controleer de target SDK, appnaam, versiecode, privacyverklaring, machtigingen, betaalstromen en alle functies op een echt Android-toestel.
- Deze workflow publiceert niets naar Google Play en maakt geen Play Console-release aan.
- De Android-map wordt door Capacitor gegenereerd tijdens de build; ze wordt niet automatisch naar deze repository geschreven.

## Bekende aandachtspunten

De app bevat verwijzingen naar Google GenAI, Stripe en een escrow-/betalingsstroom. Controleer vóór productie dat geheime API-sleutels uitsluitend server-side worden gebruikt en dat betaal- en escrowclaims overeenkomen met de daadwerkelijk werkende backend en wettelijke vereisten.
