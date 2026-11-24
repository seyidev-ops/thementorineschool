# Remote-job stickman videos (Nov 2026)

Built with the same stickman kit as the AI Made Simple videos (`engine.py`, `video.py`),
re-coloured to Mentorine green, with Nigerian neural voices from `edge-tts`
(`en-NG-EzinneNeural`, `en-NG-AbeoNeural`).

    pip install edge-tts cairosvg numpy pillow   # plus ffmpeg
    python3 daniel.py     # -> out/Mentorine-Video1-Daniel-Traffic-to-Laptop.mp4
    python3 mama.py       # -> out/Mentorine-Video2-Mama-Is-It-Real.mp4
    python3 mama.py 0.2 0.5   # stills at 20% and 50% for checking

`ms.py` holds the Mentorine branding (footer, call-to-action card, certificate, danfo, etc.).

## Name pronunciation

`SAY_AS` in `ms.py` respells names for the voice only (on-screen text keeps the real spelling):

| Name | Spoken as | Notes |
|------|-----------|-------|
| Adaeze | Ah-dah-eh-zeh | Àdáézè: ah-dah-EH-zeh, crisp "ah" and "eh" vowels |
| Ngozi | N-goh-zee | |
| Chidi | Chee-dee | |
| Emeka | Eh-meh-kah | |
| Seyi | Sheh-yee | |
| Yakubu | Yakubu | plain spelling is correct |

Add new names here before rendering. The voice cannot reproduce Igbo/Yoruba tones exactly; respelling fixes the vowels and syllables.

Nov 2026: the characters now use English names (Daniel, Grace, Joy) because the voices
could not pronounce the Igbo names well. The SAY_AS list stays in ms.py for future use.
