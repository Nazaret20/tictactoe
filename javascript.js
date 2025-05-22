document.addEventListener("DOMContentLoaded", () => {
	const boxes = document.querySelectorAll(".box");
	const playerX = "X";
	const playerO = "O";
	let actualPlayer = playerX;

	const winnerCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	let tableState = Array(9).fill(null);

	boxes.forEach((box) => {
		box.addEventListener("click", () => {
			const index = parseInt(box.getAttribute("data-index"));

			if (box.textContent === "") {
				box.textContent = actualPlayer;
				tableState[index] = actualPlayer;

				if (actualPlayer === "X") {
					actualPlayer = "O";
				} else {
					actualPlayer = "X";
				}
			}

			lookingWinner();
		});
	});

	function lookingWinner() {
		for (let comb of winnerCombinations) {
			const [a, b, c] = comb;

			if (tableState[a] === tableState[b] && tableState[a] === tableState[c] && tableState[a] !== null) {
				// Alguien ha ganado
				console.log(`¡Ha ganado ${tableState[a]}!`);
			}
		}
	}
});
