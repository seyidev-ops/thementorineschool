# Remote-job stickman videos (Nov 2026)

Built with the same stickman kit as the AI Made Simple videos (`engine.py`, `video.py`),
re-coloured to Mentorine green, with Nigerian neural voices from `edge-tts`
(`en-NG-EzinneNeural`, `en-NG-AbeoNeural`).

    pip install edge-tts cairosvg numpy pillow   # plus ffmpeg
    python3 chidi.py      # -> out/Mentorine-Video1-Chidi-Traffic-to-Laptop.mp4
    python3 mama.py       # -> out/Mentorine-Video2-Mama-Is-It-Real.mp4
    python3 mama.py 0.2 0.5   # stills at 20% and 50% for checking

`ms.py` holds the Mentorine branding (footer, call-to-action card, certificate, danfo, etc.).
