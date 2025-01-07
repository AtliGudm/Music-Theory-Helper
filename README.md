# Music-Theory-Helper

This project was made as a practice project to learn React and TypeScript. It's tools to help with music theory and composing, there are a ton of programs that provide very similar features but this is custom made to my specific requirements.

It now contains a Scale Finder where you input notes and it tells you what musical scales contain those notes, you can also fuzzy search for scales by name. You can then see all of the diatonic chords of each scale and also it's relative and parallel mode.
You can also see 7th chords, suspended chords, view chords vertically or horizontally, and tons of more features!!

<img width="800" alt="Screenshot 2025-01-05 at 20 29 46" src="https://github.com/user-attachments/assets/c78b3d59-de9b-4140-bf23-90b358d3727f" />


Next:
- Add button to see the corresponding harmonic and melodic minor chords of a natural minor scale
- Add favorites/pinned functionality
- Add correct flat and sharp sign

Future features:
- Add setting for how notes with double accidentals are displayed
- Create Unit/Integration Tests
- (Use interactive piano to display chosen scale? Chosen chord even?)
- Start work on "The Modulator", a tool to help with modulating between keys/scales
- Save state in browser localstore

- Fix: flat signs are being capitalized in modes like 'Dorian b5'
- Fix: how enharmonics are forced when using Piano Keyboard note input
- Fix: the state gets re-initialized when switching between text and piano note input
- Fix: no results when text input empty and ENTER is pressed
- Find proper icons for text and piano input button