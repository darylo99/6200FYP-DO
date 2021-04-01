# Speakable Auth - A OTP generator that generates words that can be spoken.
## Created as part of a University project for BCU.

This proof of concept is a Django web app which is based on TOTP with a slight
modification to the truncation function to select words from /usr/share/dict/words

### Components used:
- [JS-OTP](https://github.com/jiangts/JS-OTP) -> words/static/js/jsOTP*.min.js
- /usr/share/dict/words -> words/static/words ( and words.json )
- Django backend framework

### Things to note if by any chance you wanted to use this project:
- "db.sqlite3" ( SQLite Database found at root ) may be removed
- "settings.py" (In SpeakableAuth dir) may be removed
- This was django generated - will need to ensure  **INSTALLED_APPS** is modified to `INSTALLED_APPS = [...,'words.apps.WordsConfig',]`
