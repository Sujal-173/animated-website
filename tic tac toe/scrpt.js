// Tic Tac Toe game ka simple aur optimized script, jisme clear comments hain
// English + simple Hindi comments taaki aasani se samajh mein aa jaye

// --- DOM elements ko select karo (UI ke elements) ---
// Ye line sabhi .box class wale elements ko select karti hai, jo game ke 9 cells hain
const boxes = document.querySelectorAll('.box'); // game ke cells (9)

// Ye line .reset class wale button ko select karti hai, jo Restart button hai
const resetBtn = document.querySelector('.reset'); // Restart button

// Ye line .msg class wale element ko select karti hai, jo winner/draw ka message dikhata hai
const msg = document.querySelector('.msg'); // message area jo winner/draw dikhata hai

// Ye line .start class wale button ko select karti hai, jo Start button hai
const startBtn = document.querySelector('.start'); // Start button

let playerOne = document.querySelector("#fir-score")

let playerTwo = document.querySelector("#sec-score")

let player1 = 0;
let player2 = 0;
// --- Game ki state (halat) ---
// Ye variable batata hai ki ab kis player ki turn hai: 'O' ya 'X'
let currentTurn = 'O'; // kis player ki turn hai: 'O' ya 'X'

// Ye variable batata hai ki game khatam ho gaya hai ya nahi (true jab win ya draw ho)
let isGameOver = false; // true jab win ya draw ho jaye

// Ye variable batata hai ki game start ho chuka hai ya nahi, taaki duplicate click handlers na add ho jayein
let started = false; // duplicate click handlers prevent karne ke liye

// Winning patterns (9 cells ke indexes)
const winPatterns = [
  [0, 1, 2], // pehli row
  [3, 4, 5], // dusri row
  [6, 7, 8], // tisri row
  [0, 3, 6], // pehla column
  [1, 4, 7], // dusra column
  [2, 5, 8], // tisra column
  [0, 4, 8], // diagonal 1
  [2, 4, 6], // diagonal 2
];

// --- Helper functions (clear logic, simple comments) ---

// Box click handler function
// Hindi: jab user kisi box pe click karta hai tab ye function chalega — mark place karega, check karega.
function handleBoxClick(e) {
  // Ye line console mein current target (clicked element) ko print karti hai, debugging ke liye
  
  // console.log(e.currentTarget);

  // Ye line event se clicked box ko variable mein store karti hai
  const box = e.currentTarget;

  // Agar game khatam ho gaya hai to function se bahar nikal jao, kuch na karo
  if (isGameOver) return; // game already finished — kuch na karo

  // Agar box pe already koi mark hai to kuch na karo
  if (box.textContent.trim() !== '') return; // agar box peheley bhara hai to kuch na karo

  // Current player ka mark box mein daalo aur box ko disable kar do
  box.textContent = currentTurn; // current player ka mark box mein daala
  box.disabled = true; // box ko disable kar diya taaki dobara click na ho sake

  // Check karo ki ye mark lagane se koi winning combination bani hai
  if (checkWinner()) {
    // Agar winner mila to message dikhana aur further play block karna
    showMessage(`Player ${currentTurn} wins!`); // show and block further play
    return; // function se bahar nikal jao
  }

  // Check karo ki draw ho gaya hai (sab boxes bhar gaye aur koi winner nahi)
  if (isDraw()) {
    // Agar draw hai to draw message dikhana
    showMessage('Game is a draw'); // draw message dikhana
    return; // function se bahar nikal jao
  }

  // Agar win ya draw nahi hai to turn switch karo
  currentTurn = currentTurn === 'O' ? 'X' : 'O'; // turn switch karo: 'O' se 'X' ya 'X' se 'O'
}

// Check winner: returns true if someone wins, and highlights winning cells
// Hindi: check kare agar kisi 3 cells ki line match kar rahi hai to woh winner hai
function checkWinner() {
  for (const [a, b, c] of winPatterns) {
    const one = boxes[a].textContent.trim();
    const two = boxes[b].textContent.trim();
    const three = boxes[c].textContent.trim();
    if (one !== '' && one === two && two === three) {
      // highlight the winning combo for UX
      boxes[a].classList.add('win');
      boxes[b].classList.add('win');
      boxes[c].classList.add('win');
      isGameOver = true;
      if(currentTurn==='O'){
        player1++;
        playerOne.textContent = player1
      }
      else if(currentTurn==='X'){
        player2++;
        playerTwo.textContent = player2
      }      
      return true;
    }
  }
  return false;
}

// Check for draw — if all boxes filled and no winner
function isDraw() {
  return [...boxes].every(b => b.textContent.trim() !== '');
}

// Show message (winner/draw) — Hindi: message dikhana
function showMessage(text) {
  msg.style.display = 'initial';
  msg.textContent = text;
}

// Reset the board to initial state — Hindi: game reset karein
function resetBoard() {
  
  isGameOver = false;
  msg.style.display = 'none';
  msg.textContent = '';
  // Clear markers and class on all boxes
  boxes.forEach(b => {
    b.disabled = false;
    b.classList.remove('win');
    b.textContent = '';
  });
}

// Initialize event listeners once — Hindi: listeners ek baar laga do
function init() {
  if (started) return; // agar already start ho chuka hai to dobara na lagaaye (prevent duplicates)
  started = true;
  boxes.forEach(box => box.addEventListener('click', handleBoxClick));
}

// Button handlers — Hindi: buttons ke liye handlers
// Reset button pe click hone pe board reset karo
resetBtn.addEventListener('click',()=>{
        resetBoard()
      } ); // Restart button clears board

// Start button pe click hone pe init aur reset dono karo
startBtn.addEventListener('click', () => { init(); resetBoard(); }); // Start initializes and resets

// Page load pe UI clean rakhne ke liye — message hide karo aur board clear karo
resetBoard(); // Ensure UI is clean on page load — hide message and clear board

// ===== Short logic summary (simple language) =====
// - Hamare paas 9 boxes hain (0..8). currentTurn batata hai ki agla kaun khelega ('O' ya 'X').
// - startBtn: click handlers ek baar set karta hai; resetBtn: board clear karta hai.
// - Jab koi cell click hoti hai: mark place karo, cell disable karo, winner check karo.
// - Agar winner mila: winning boxes highlight karo aur message dikhana (game over).
// - Warna agar sab boxes bhar gaye: draw message dikhana (game over).
// - Warna: currentTurn switch karo aur continue karo.

// End of script — Happy coding!