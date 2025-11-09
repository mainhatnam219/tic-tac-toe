# Tic-Tac-Toe Game with Enhanced Features

A React-based Tic-Tac-Toe game with advanced features.

## Features Implemented 

### 1. Current Move Display 
- Shows "You are at move #..." instead of a button for the current move
- Current move is highlighted in green with a distinct style
- Provides clear visual feedback about which move you're currently viewing

### 2. Dynamic Board with Two Loops 
- Board component completely rewritten using nested for loops
- No hardcoded squares - all 9 squares are dynamically generated
- Makes the code more maintainable and scalable

### 3. Move History Sorting
- Toggle button to sort move history in ascending or descending order
- Button shows current sort direction with visual indicators (↓/↑)
- Allows players to view game history in their preferred order

### 4. Winner Highlighting & Draw Detection 
- Winning squares are highlighted with a green background and subtle animation
- Displays "Draw - No one wins!" message when the board is full with no winner
- Clear visual feedback for game outcomes

### 5. Move Location Display 
- Each move in the history shows its location in (row, col) format
- Row and column are calculated from the square index (0-8)
- Both current move text and buttons display the location

### 6. Vercel Deployment Ready
- Project configured for seamless Vercel deployment
- Optimized build settings for production
- Can be deployed with one command or via GitHub integration
- Live demo available after deployment

## How to Run

### Local Development
```bash
npm install
npm start
```

Visit `http://localhost:3000` to play the game.

## How to Play

1. Click on any empty square to place your mark (X or O)
2. Players alternate turns automatically
3. First player to get 3 marks in a row (horizontal, vertical, or diagonal) wins
4. Use the move history to jump back to any previous state
5. Toggle the sort button to change the order of move history
6. Winning squares will be highlighted in green

## Project Structure

```
tic-tac-toe/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main game logic with all features
│   ├── index.js        # React entry point
│   └── styles.css      # Complete styling with animations
├── package.json
└── README.md
```

