# Historia zmian

Wszystkie istotne zmiany w projekcie będą dokumentowane w tym pliku.

Format oparty na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
projekt stosuje [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.2] - 2025-12-01

### Dodano
- **Informacje prawne w ustawieniach** - Sekcja praw autorskich w oknie ustawień aplikacji
- **Nowy poziom logowania "legal"** - Dedykowany poziom logowania dla informacji prawnych w konsoli debugowania (różowy kolor)
- **Log praw autorskich** - Automatyczne wyświetlanie informacji o prawach autorskich w konsoli debugowania

### Zmieniono
- **Licencja** - Zaktualizowano licencję na "All Rights Reserved" z pełnymi warunkami prawnymi
- **README** - Dodano informacje o prawach autorskich i właścicielu kodu (Shironex / AnimeGATE)
- **package.json** - Zmieniono licencję na "UNLICENSED" i autora na "Shironex"

---

## [1.0.1] - 2025-12-01

### Poprawiono
- **Ikona aplikacji** - Naprawiono wyświetlanie własnej ikony zamiast domyślnej ikony Electron
- **Tytuł aplikacji** - Poprawiono tytuł aplikacji z "Electron Starter Template" na "AG-Tabelki"

### Usunięto
- **Wskaźnik offline** - Usunięto nieużywany komponent OfflineIndicator i powiązany hook useOnlineStatus

---

## [1.0.0] - 2025-12-01

### Dodano
- **Generator tabelek ASS** - Tworzenie profesjonalnych nakładek tabelkowych dla fansubów
- **9 gotowych szablonów** - AnimeGATE, AnimeSubs.info, Biblioteka Nyaa, Demo Subs, Desu-Online, FrixySubs, LycorisCafe, Shisha oraz szablon własny
- **Presety rozdzielczości** - 1080p, 1080p Cinema (2.35:1), 4K, 4K Cinema, własna rozdzielczość
- **Podgląd na żywo** - Podgląd SVG z możliwością dodania tła
- **Generator logo** - Tworzenie nakładek logo w rogu ekranu
- **Pozycjonowanie** - Wybór pozycji tabelki (lewa/prawa strona)
- **Edytowalny rozmiar czcionki** - Suwak do regulacji rozmiaru czcionki zawartości
- **Zapisywanie szablonów** - Automatyczny zapis zmian w localStorage
- **Kopiowanie do schowka** - Szybkie kopiowanie wygenerowanego kodu ASS
- **Wsparcie dla wielu języków** - Polski i angielski interfejs
- **Motywy** - Jasny, ciemny i systemowy motyw
- **Automatyczne aktualizacje** - System aktualizacji przez GitHub Releases
- **Tryb debugowania** - Osobne okno konsoli z kolorowymi logami

---

## Szablon notatek wydania

Podczas tworzenia wydań na GitHub, użyj poniższego formatu dla notatek. Będą one wyświetlane w oknie dialogowym aktualizacji.

### Przykład (do skopiowania)

```markdown
## Co nowego w v1.1.0

### Nowe funkcje
- **Nowa funkcja** - Opis nowej funkcjonalności
- **Skróty klawiszowe** - Naciśnij `Ctrl+K` aby otworzyć paletę komend

### Ulepszenia
- Szybszy czas uruchamiania
- Lepsze zarządzanie pamięcią

### Poprawki błędów
- Naprawiono awarię przy otwieraniu plików ze znakami specjalnymi
- Rozwiązano problem z zapisywaniem ustawień

### Uwagi
Ta aktualizacja wymaga ponownego uruchomienia.
```

---

## Publikowanie wydania na GitHub

1. Przejdź do strony **Releases** repozytorium
2. Kliknij **Draft a new release**
3. Utwórz nowy tag (np. `v1.0.0`)
4. Ustaw tytuł wydania (np. `v1.0.0 - Pierwsza wersja`)
5. Wklej notatki wydania w opisie
6. Dołącz zbudowane instalatory (z folderu `release/`)
7. Kliknij **Publish release**

Auto-updater automatycznie wykryje nowe wydanie i wyświetli okno aktualizacji użytkownikom.
