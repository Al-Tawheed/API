# API
API for Al-Halaqah

> Books
1. Bukhari
2. Muslim
3. Nasa
4. Dawud
5. Tirmidhi
6. Majah
7. Malik

> API HADITH
* /v1/hadith/[language: **eng or ar**]/collection/[Books]/hadith/[specific hadith number]
* /v1/hadith/[language: **eng or ar**]/random
* /v1/hadith/chapter/[book]
* /v1/hadith/[language: **eng or ar**]/collection/[books]/chapter/[chapter number]
* **[POST REQUEST]** /v1/hadith/search {FORM ENCODE IT SHOULD CONTAIN: Language, search and your values}

**English and arabic = eng/ar**

> API QURAN
* /v1/quran/chapter
* /v1/quran/[language: **eng or ar or nl**]/surah/[1-144]
* /v1/quran/[language: **eng or ar or nl**]/random
* /v1/quran/[language: **eng or ar or nl**]/verse_key/[surah]:[ayah]

**eng/ar/nl**




![banner](https://raw.githubusercontent.com/Al-Halaqah/.github/main/halaqah.png)
