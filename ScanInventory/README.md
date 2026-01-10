# ScanInventory: System Zarządzania Magazynem

Aplikacja mobilna stworzona w **ReactNative**, pozwalająca na dodawanie wpisów dziennika z wykorzystaniem **natywnej funkcji lokalizacji GPS** oraz komunikacji z **REST API**. Projekt spełnia wszystkie formalne wymagania zadania.
Aplikacja mobilna stworzona w frameworku **NativeScript + Angular**, służąca do ewidencji towarów z wykorzystaniem **natywnych funkcji skanowania kodów oraz aparatu** oraz komunikacji z zewnętrznym **REST API**. Projekt spełnia wszystkie wymagania techniczne i funkcjonalne zadania.

---

## Funkcje aplikacji

### Natywne funkcje

Aplikacja korzysta z dwóch kluczowych natywnych funkcji urządzenia:

- **Skaner kodów kreskowych** (nativescript-barcodescanner) – Umożliwia błyskawiczne odczytywanie kodów EAN-13/QR, co automatyzuje wprowadzanie danych i eliminuje błędy ręcznego wpisywania.

- **Aparat fotograficzny** (@nativescript/camera) – Pozwala na wykonanie zdjęcia produktu w celu dokumentacji wizualnej towaru w bazie danych.

### Komunikacja z API (MockAPI)

Aplikacja integruje się z REST API (MockAPI) w celu trwałego przechowywania danych:

- **GET** - Pobieranie pełnej listy produktów do widoku głównego.
- **POST** - Dodawanie nowego produktu do magazynu.
- **PUT** - Aktualizacja danych istniejącego produktu podczas edycji.

---

## Widoki aplikacji

### 1. Lista produktów (ProductListComponent)

Główny ekran wyświetlający asortyment:

- **Widoczność**: Nazwa produktu, unikalny kod oraz status (np. "Nowy", "W magazynie").
- **Nawigacja**: Kliknięcie w produkt przenosi do szczegółów.

### 2. Szczegóły produktu (ProductDetailComponent)

Pełny podgląd wybranego elementu:

- **Dane**: Pełny opis, duże zdjęcie produktu pobrane z API lub pamięci urządzenia.
- **Akcje**: Przyciski pozwalające na przejście do edycji produktu.

### 3. Dodaj/Edytuj produkt (ProductAddComponent)

Uniwersalny formularz zarządzania danymi:

- **Walidacja**: Przycisk zapisu jest nieaktywny, dopóki wszystkie pola (Nazwa, Kod, Status, Opis, Zdjęcie) nie zostaną poprawnie wypełnione.
- **Akcje Natywne**: Przyciski "SKANUJ" (uruchamia skaner) oraz "ZRÓB ZDJĘCIE" (uruchamia aparat).

---

## Wykorzystane technologie

- Framework: NativeScript 8.x + Angular 17+ (Zoneless mode)
- Język: TypeScript
- Stylizacja: NativeScript Core Theme
- Backend: MockAPI (REST)
- Zarządzanie Formularzami: NativeScriptFormsModule + FormsModule

---

## Uruchamianie i Scenariusz Testowy

## Wymagania

- Node.js & npm
- NativeScript CLI (npm install -g nativescript)
- Emulator Androida lub podłączone urządzenie fizyczne

## Scenariusz Testowy

1. Pokaż listę/API: Po uruchomieniu aplikacji upewnij się, że lista produktów pobrała dane z MockAPI (widoczne logi SUKCES! Pobrano danych).
2. Pokaż natywne funkcje:

- Przejdź do dodawania produktu.
- Kliknij "SKANUJ" – sprawdź, czy aparat rozpoznaje kod kreskowy i wpisuje go w pole.
- Kliknij "ZRÓB ZDJĘCIE" – wykonaj zdjęcie i zweryfikuj, czy miniatura pojawiła się w formularzu.

3. Pokaż walidację: Spróbuj zapisać produkt bez zdjęcia lub opisu – przycisk powinien być zablokowany (szary).
4. Pokaż zapis/API: Po wypełnieniu wszystkich pól kliknij "ZAPISZ". Aplikacja powinna wyświetlić alert "Dodano/Zaktualizowano" i wrócić do listy z nowymi danymi.

---

## Definition of Done (DoD) - Status

Potwierdzenie spełnienia formalnych wymagań zadania:

[x] 3–4 kompletne widoki (Lista, Szczegóły, Dodaj/Edytuj).
[x] Użyte 2 natywne funkcje (Skaner i Aparat).
[x] Pełna integracja z API (GET, POST, PUT).
[x] Walidacja formularza (wymagane wszystkie pola, w tym zdjęcie).
[x] Czyste repozytorium (poprawny .gitignore, brak folderów platforms i hooks).
[x] Dokumentacja: Plik README.md i logiczne commity.
