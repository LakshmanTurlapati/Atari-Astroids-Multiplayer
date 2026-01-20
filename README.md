# Umaru Bongo Cat - Input Overlay

A web-based input overlay featuring Umaru Doma from **Himouto! Umaru-chan** in the style of the popular "Bongo Cat" meme. Watch Umaru react to your keyboard and mouse inputs in real-time!

## Features

- **Keyboard Tracking**: Left-hand keys trigger Umaru's left paw, right-hand keys trigger the right paw
- **Mouse Tracking**: The mouse hand follows your cursor movement
- **Click Detection**: Mouse clicks are visually indicated
- **Visual Keyboard**: On-screen keyboard shows which keys are being pressed
- **Responsive Design**: Works on various screen sizes
- **Smooth Animations**: Fluid transitions between states

## How It Works

| Input | Umaru's Reaction |
|-------|------------------|
| Left keys (Q, W, E, A, S, D, etc.) | Left paw taps |
| Right keys (Y, U, I, J, K, L, etc.) | Right paw taps |
| Space bar | Both paws tap |
| Mouse movement | Mouse hand follows cursor |
| Mouse click | Click animation |

## Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start typing and moving your mouse to see Umaru react!

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/umaru-bongo-cat.git

# Open in browser
open index.html
# or
python -m http.server 8000  # Then visit localhost:8000
```

## Project Structure

```
umaru-bongo-cat/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling and animations
├── js/
│   └── script.js       # Keyboard/mouse event handling
├── assets/
│   ├── neutral.svg     # Umaru resting
│   ├── left_tap.svg    # Left hand tapping
│   ├── right_tap.svg   # Right hand tapping
│   ├── both_tap.svg    # Both hands tapping
│   ├── left_hand.svg   # Left paw overlay
│   ├── right_hand.svg  # Right paw overlay
│   └── mouse_hand.svg  # Mouse hand sprite
└── README.md
```

## Customization

### Replacing Sprites

The included SVG sprites are placeholders. To use custom Umaru artwork:

1. Prepare your PNG/SVG files:
   - `neutral.svg` - Both hands resting
   - `left_tap.svg` - Left hand pressing down
   - `right_tap.svg` - Right hand pressing down
   - `both_tap.svg` - Both hands pressing
   - `mouse_hand.svg` - Hand on mouse

2. Replace the files in the `assets/` folder

3. Adjust sizes in `css/style.css` if needed

### Finding Umaru Skins

You can find community-made Umaru skins at:
- DeviantArt (search "Bongo Cat Umaru")
- YouTube video descriptions (search "Umaru Bongo Cat Overlay")
- BongoCat Mver Discord community

### Changing Key Mappings

Edit the `leftKeys` and `rightKeys` arrays in `js/script.js` to customize which keys trigger which hand.

## Use Cases

- **Streaming Overlay**: Use OBS Browser Source to add this to your stream
- **Typing Visualizer**: Show your typing activity in videos
- **Just for Fun**: Enjoy watching Umaru bongo!

### OBS Setup

1. Add a Browser Source in OBS
2. Set the URL to your local file or hosted version
3. Set dimensions to 800x600 (or adjust as needed)
4. Enable "Shutdown source when not visible" for performance

## Credits

- Character: Umaru Doma from Himouto! Umaru-chan
- Concept: Based on the Bongo Cat meme
- Inspiration: [externalizable/bongo.cat](https://github.com/externalizable/bongo.cat)

## License

This project is for personal and educational use. Umaru Doma is a character from Himouto! Umaru-chan by Sankaku Head.

---

**Enjoy watching Umaru bongo!** 🐹
